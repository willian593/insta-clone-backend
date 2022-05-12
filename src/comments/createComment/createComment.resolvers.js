import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { loggedInUser }) => {
        const ok = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            msg: 'Photo not found',
          };
        }
        // create comment
        const newComment = await client.comment.create({
          data: {
            payload,
            photo: {
              connect: {
                id: photoId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          ok: true,
          id: newComment.id,
          msg: 'Se creo el comentario',
        };
      }
    ),
  },
};
