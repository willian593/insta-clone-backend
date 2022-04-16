import client from './../../client';

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      try {
        const likes = await client.like.findMany({
          where: {
            photoId: id,
          },
          select: {
            user: true,
          },
        });

        return likes.map((like) => like.user);
      } catch (e) {
        return e;
      }
    },
  },
};
