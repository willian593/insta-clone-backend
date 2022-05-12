import client from './../../client';

export default {
  Query: {
    seePhotoComment: async (_, { id }) => {
      try {
        const comments = await client.comment.findMany({
          where: {
            photoId: id,
          },
          orderBy: {
            createdAt: 'asc',
          },
        });
        return comments;
        // return comments.map((comment) => comment.user);
      } catch (e) {
        return e;
      }
    },
  },
};
