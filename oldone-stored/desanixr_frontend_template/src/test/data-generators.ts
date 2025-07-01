import * as faker from 'faker';

type Overrides = Record<string, any>;

export const userGenerator = (overrides?: Overrides) => ({
  _id: faker.datatype.uuid(),
  firstName: faker.internet.userName(),
  lastName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  teamId: faker.datatype.uuid(),
  teamName: faker.company.companyName(),
  role: 'ADMIN',
  bio: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const teamGenerator = (overrides?: Overrides) => ({
  _id: faker.datatype.uuid(),
  name: faker.company.companyName(),
  description: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const discussionGenerator = (overrides?: Overrides) => ({
  _id: faker.datatype.uuid(),
  title: faker.company.catchPhrase(),
  body: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const screenGenerator = (overrides?: Overrides) => ({
  _id: faker.datatype.uuid(),
  screenName: faker.company.catchPhrase(),
  description: faker.lorem.sentence(),
  imageId: faker.company.catchPhrase(),
  imageTitle: faker.company.catchPhrase(),
  createdAt: Date.now(),
  ...overrides,
});

export const sceneGenerator = (overrides?: Overrides) => ({
  _id: faker.datatype.uuid(),
  sceneName: faker.company.catchPhrase(),
  description: faker.lorem.sentence(),
  imageId: faker.company.catchPhrase(),
  imageTitle: faker.company.catchPhrase(),
  createdAt: Date.now(),
  ...overrides,
});

export const commentGenerator = (overrides?: Overrides) => ({
  _id: faker.datatype.uuid(),
  body: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});
