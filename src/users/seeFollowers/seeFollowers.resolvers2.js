import client from './../../client';

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      /* 1.- Buscamos al user (eminem) y luego sus seguidores */
      const aFollowers = await client.user
        .findUnique({ where: { username } })
        .followers();
      console.log(aFollowers.length);

      /* 2.- Buscamos gente q sigan a eminem */
      const bFollowers = await client.user.findMany({
        where: {
          following: {
            some: {
              username,
            },
          },
        },
      });
      console.log('followers', bFollowers.length);
    },
  },
};

/*

some.-  returns all records where one or more related records math filtering criteria
every.- Returns all records where all related records matched filtering criteria
none.- Returns all records where no related records matched filtering criteria
*/
