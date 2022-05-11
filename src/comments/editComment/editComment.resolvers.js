import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';

const resolverFn = async (_, { id, payload }, { loggedInUser }) => {
  try {
    // find photo
    const comment = await client.comment.findUnique({
      where: {
        id,
      },
    });
    // console.log(comment);
    // verificar si existe foto
    if (!comment) {
      return {
        ok: false,
        msg: 'Comment not found',
      };
    } // verificar si user puede edit comment
    else if (comment.userId !== loggedInUser.id) {
      return {
        ok: false,
        msg: 'Not authorized',
      };
    } // udate comment
    else {
      await client.comment.update({
        where: {
          id,
        },
        data: {
          payload,
        },
      });
      return {
        ok: true,
      };
    }
  } catch (e) {
    return e;
  }
};

export default {
  Mutation: {
    editComment: protectedResolver(resolverFn),
  },
};
