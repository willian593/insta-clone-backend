import { protectedResolver } from '../../helpers/user.utils';
import client from '../../client';

export default {
  Query: {
    seeComments: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const Profiles = await client.user.findMany({
          where: {
            comments: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return Profiles;
      } catch (e) {
        return e;
      }
    }),
  },
};
