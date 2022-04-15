import { protectedResolver } from '../../helpers/user.utils';
import client from '../../client';

const resolverFn = async (_, { id }, { loggedInUser }) => {
  try {
    const photo = await client.photo.findUnique({
      where: {
        id,
      },
    });
    if (!photo) {
      return {
        ok: false,
        msg: 'Photo no found',
      };
    }
    const likeWhere = {
      photoId_userId: {
        userId: loggedInUser.id,
        photoId: id,
      },
    };
    const like = await client.like.findUnique({
      where: likeWhere,
    });
    let dislike;
    dislike = like;
    if (dislike) {
      await client.like.delete({
        where: likeWhere,
      });
      return {
        ok: true,
        msg: 'Dislike',
      };
    } else {
      await client.like.create({
        data: {
          user: {
            connect: {
              id: loggedInUser.id, // ver si user esta logeado
            },
          },
          photo: {
            connect: {
              id: photo.id,
            },
          },
        },
      });
    }
    return {
      ok: true,
      msg: 'You have given a like',
    };
  } catch (e) {
    return e;
  }
};

export default {
  Mutation: {
    toggleLike: protectedResolver(resolverFn),
  },
};
