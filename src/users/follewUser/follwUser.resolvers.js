import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';

const resolverFn = async (_, { username }, { loggedInUser }) => {
  const ok = await client.user.findUnique({
    where: {
      username,
    },
  });

  if (!ok) {
    return {
      ok: false,
      error: 'That user does not exist. Cant follow',
    };
  }

  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      following: {
        connect: {
          username,
        },
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    followUser: protectedResolver(resolverFn),
  },
};
