import express from 'express';
import cors from 'cors';
import { OpticMiddleware } from '@useoptic/express-middleware';
import routes from '@/api';
import config from '@/config';
import { isCelebrateError } from 'celebrate';

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res
      .status(200)
      .json({ message: 'Getting Status in Get method' })
      // res.send("Getting Status in get method")
      .end();
  });
  app.head('/status', (req, res) => {
    res
      .status(201)
      .json({ message: 'Getting Status in Head method' })
      // res.send("Getting Status in head method")
      .end();
  });

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
  app.use(config.api.prefix + '/uploads', express.static('uploads'));
  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  var corsOptions = {
    origin: ['http://localhost:3000', 'http://backend-demo-test.herokuapp.com/api'],
    credentials: true,
  };
  app.use(cors(corsOptions));

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(require('method-override')());

  // Transforms the raw string of req.body into json
  app.use(express.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  // API Documentation
  app.use(
    OpticMiddleware({
      enabled: process.env.NODE_ENV !== 'production',
    }),
  );

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    console.log('naresh-err', err);
    let msg = err.message;
    if (isCelebrateError(err)) {
      msg = err.details.get('body').details[0].message;
    }
    res.status(err.status || 500);
    res.json({
      errors: {
        message: msg,
      },
    });
  });
};
