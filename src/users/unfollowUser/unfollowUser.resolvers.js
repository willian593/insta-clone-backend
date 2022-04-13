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
      error: 'Cant unfollow user',
    };
  }

  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      following: {
        disconnect: {
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
    unfollowUser: protectedResolver(resolverFn),
  },
};
