import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';

const resolverFn = async (_, { id }, { loggedInUser }) => {
  try {
    // Delete a single record
    const commentId = await client.comment.findUnique({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });
    if (!commentId) {
      return {
        ok: false,
        msg: 'Comment not found',
      };
    } else if (commentId.userId !== loggedInUser.id) {
      return {
        ok: false,
        msg: 'Not authorized.',
      };
    } else {
      await client.comment.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
        msg: 'Comentario eliminado',
      };
    }
  } catch (e) {
    return e;
  }
};

export default {
  Mutation: {
    deleteComment: protectedResolver(resolverFn),
  },
};
