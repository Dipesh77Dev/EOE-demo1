import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  // Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  };

  const discussionModel = {
    name: 'discussionModel',
    model: require('../models/discussion').default,
  };

  const imageModel = {
    name: 'imageModel',
    // Notice the require syntax and the '.default'
    model: require('../models/image').default,
  };

  const commentModel = {
    name: 'commentModel',
    model: require('../models/comment').default,
  };

  const screenModel = {
    name: 'screenModel',
    model: require('../models/screen').default,
  };

  const sceneModel = {
    name: 'sceneModel',
    model: require('../models/scene').default,
  };

  const loginHistoryModel = {
    name: 'loginHistoryModel',
    model: require('../models/loginhistory').default,
  };

  const videoUrlModel = {
    name: 'videoUrlModel',
    model: require('../models/videourl').default,
  };

  const eventDetailModel = {
    name: 'eventDetailModel',
    model: require('../models/eventDetail').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      discussionModel,
      commentModel,
      screenModel,
      sceneModel,
      imageModel,
      loginHistoryModel,
      videoUrlModel,
      eventDetailModel,
      // salaryModel,
      // whateverModel
    ],
  });
  // Logger.info('✌️ Dependency Injector loaded');

  await jobsLoader({ agenda });
  // Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  // Logger.info('✌️ Express loaded');
};
