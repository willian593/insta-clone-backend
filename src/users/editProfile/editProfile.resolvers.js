import bcrypt from 'bcrypt';
import { GraphQLUpload } from 'graphql-upload';
import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newpassword, bio, avatar },
  { loggedInUser }
) => {
  try {
    if (!loggedInUser) {
      throw new Error('You need to login.');
    }
    console.log(avatar);
    let uglyPassword = null;
    if (newpassword) {
      uglyPassword = await bcrypt.hash(newpassword, 10);
    }
    const updatedUser = client.user.update({
      where: { id: loggedInUser.id },
      data: {
        firstName,
        lastName,
        username,
        email,
        bio,
        avatar,
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
};

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
