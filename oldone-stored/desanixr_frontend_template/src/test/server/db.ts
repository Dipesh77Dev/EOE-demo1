import { factory, primaryKey } from '@mswjs/data';

const models = {
  user: {
    _id: primaryKey(String),
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    teamId: String,
    role: String,
    bio: String,
    createdAt: Number,
  },
  team: {
    _id: primaryKey(String),
    name: String,
    description: String,
    createdAt: Number,
  },
  discussion: {
    _id: primaryKey(String),
    title: String,
    body: String,
    teamId: String,
    createdAt: Number,
  },
  images: {
    _id: primaryKey(String),
    imageTitle: String,
    fileName: String,
    filePath: String,
    fileType: String,
    fileSize: String,
    teamId: String,
    createdAt: Number,
  },
  screen: {
    _id: primaryKey(String),
    screenName: String,
    imageId: String,
    imageTitle: String,
    description: String,
    createdAt: Number,
  },
  scene: {
    _id: primaryKey(String),
    sceneName: String,
    imageId: String,
    imageTitle: String,
    description: String,
    createdAt: Number,
  },
  comment: {
    _id: primaryKey(String),
    body: String,
    authorId: String,
    discussionId: String,
    createdAt: Number,
  },
};

export const db = factory(models);

export type Model = keyof typeof db;

export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'));

export const persistDb = (model: Model) => {
  if (process.env.NODE_ENV === 'test') return;
  const data = loadDb();
  data[model] = db[model].getAll();
  window.localStorage.setItem('msw-db', JSON.stringify(data));
};

export const initializeDb = () => {
  const database = loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntres = database[key];
    if (dataEntres) {
      dataEntres?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDb = () => {
  window.localStorage.clear();
};

initializeDb();
