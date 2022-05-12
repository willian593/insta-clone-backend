import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';

const resolverFn = async (_, { id, payload }, { loggedInUser }) => {
  try {
    // find commnet
    const comment = await client.comment.findUnique({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });
    // verificar si existe commet
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
    } // update comment
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
        msg: 'Se modifico el comentario',
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
