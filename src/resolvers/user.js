import { User } from '../models';

export default {
  Mutation: {
    async createUser(
      root,
      {
        data: {
          name, type, email, password,
        },
      },
    ) {
      return User.create({
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        type,
        email,
        password,
      });
    },
  },
  User: {
    name: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  },
  Query: {
    users: async () => {
      return User.find();
    },
    // for searching the user while login
    userByEmail: async (email) => {
      return User.findOne(email);
    },
  },
};
