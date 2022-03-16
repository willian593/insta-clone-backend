import bcrypt from 'bcrypt';
import client from './../../client';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newpassword, token }
    ) => {
      try {
        // check if the token is authentic
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        // pass  new
        let uglyPassword = null;
        if (newpassword) {
          uglyPassword = await bcrypt.hash(newpassword, 10);
        }
        const updatedUser = client.user.update({
          where: { id },
          data: {
            firstName,
            lastName,
            username,
            email,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        if ((await updatedUser).id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: 'Could not update profile.',
          };
        }
      } catch (e) {
        return e;
      }
    },
  },
};

/*
No quiero ver la contraseña en los datos 
q estoy actualizando
*/
