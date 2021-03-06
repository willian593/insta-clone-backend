import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';

export default {
  Query: {
    seeRoom: protectedResolver((_, { id }, { loggedInUser }) => {
      try {
        const room = client.room.findFirst({
          where: {
            id,
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return room;
      } catch (e) {
        return e;
      }
    }),
  },
};
