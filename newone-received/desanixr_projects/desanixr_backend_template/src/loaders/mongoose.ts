import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';
// import tunnel, { Config } from 'tunnel-ssh';

export default async (): Promise<Db> => {
  // if (config.connectAwsDB) {
  //   const fs = require('fs');
  //   const path = require('path');
  //   const pemFile = path.resolve(__dirname, '../aws/docdbtest.pem');
  //   const mongoTunnelConfig: Config = {
  //     username: 'ec2-user',
  //     privateKey: fs.readFileSync(pemFile),
  //     host: 'ec2-18-208-183-100.compute-1.amazonaws.com',
  //     port: 22,
  //     dstHost: 'dxr-db.cluster-ctgept32pmrm.us-east-1.docdb.amazonaws.com',
  //     dstPort: 27017,
  //     localHost: '127.0.0.1',
  //     localPort: 27001,
  //   };
  //   await tunnel(mongoTunnelConfig, (e: any, s: any) => {
  //     if (e) {
  //       console.error(e);
  //       return;
  //     }

  //     console.log('===============');
  //     console.log('CONNECTED TO AWS TUNNEL');
  //     console.log('===============');
  //   });
  // }
  const connection = await mongoose.connect(config.databaseURL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};
