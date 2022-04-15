import client from '../../client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        //   find user with args username
        const user = await client.user.findFirst({ where: { username } });
        if (!user) {
          return {
            ok: false,
            msg: 'User not found.',
          };
        }
        //check password with args password
        const passwordOk = await bcrypt.compare(password, user.password);
        console.log(passwordOk);
        if (!passwordOk) {
          return {
            ok: false,
            msg: 'Incorrect password.',
          };
        }
        // issue a token and send it to the user
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return {
          ok: true,
          token,
        };
      } catch (e) {
        return e;
      }
    },
  },
};
