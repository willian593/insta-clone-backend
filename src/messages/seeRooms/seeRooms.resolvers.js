import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';

export default {
  Query: {
    seeRooms: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const rooms = await client.room.findMany({
          where: {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return rooms;
      } catch (e) {
        return e;
      }
    }),
  },
};
