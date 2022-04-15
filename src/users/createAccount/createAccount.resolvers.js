import bcrypt from 'bcrypt';
import client from './../../client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          throw new Error('This username/password is already taken.');
        }
        // console.log(existingUser); // si la resp es null sig q no existe user
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        //create and save on DB return the user
        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: 'Cant create account.',
        };
      }
    },
  },
};
