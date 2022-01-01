import faker from 'faker';

export const createData = (count) => {
  return new Array(count).fill(1).map(() => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    age: faker.datatype.number({
      min: 10,
      max: 50,
    }),
  }));
};
