import client from '../../client';
import { protectedResolver } from '../../helpers/user.utils';

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser }) => {
        let room = null;
        try {
          // find user
          if (userId) {
            const user = await client.user.findUnique({
              where: {
                id: userId,
              },
              select: {
                id: true,
              },
            });
            if (!user) {
              return {
                ok: false,
                msg: 'this user does not exist',
              };
            }
            // create sala
            room = await client.room.create({
              data: {
                users: {
                  connect: [{ id: userId }, { id: loggedInUser.id }],
                },
              },
            });
            // find sala
          } else if (roomId) {
            room = await client.room.findUnique({
              where: {
                id: roomId,
              },
              select: {
                id: true,
              },
            });
            if (!room) {
              return {
                ok: false,
                msg: 'Room not found.',
              };
            }
          }
          const message = await client.message.create({
            data: {
              payload,
              room: {
                connect: {
                  id: room.id,
                },
              },
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
          console.log(message);
          return {
            ok: true,
            id: message.id,
            msg: 'Message created',
          };
        } catch (e) {
          return e;
        }
      }
    ),
  },
};
