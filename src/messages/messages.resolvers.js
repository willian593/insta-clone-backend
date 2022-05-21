import client from './../client';
export default {
  Message: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
  },
};
