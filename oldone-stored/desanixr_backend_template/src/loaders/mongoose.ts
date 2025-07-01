import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '@/config';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL || 'mongodb+srv://Dipesh:admin@cluster0.agjew.mongodb.net/DX-Back?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};

// Step2 : 