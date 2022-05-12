import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';

const resolverFn = async (_, { id }, { loggedInUser }) => {
  try {
    // find photo
    const photoId = await client.photo.findUnique({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });
    // verificar si existe
    if (!photoId) {
      return {
        ok: false,
        msg: 'Photo not found',
      };
    } else if (photoId.userId !== loggedInUser.id) {
      return {
        ok: false,
        error: 'Not authorized.',
      };
    } else {
      await client.photo.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
        msg: 'Photo eliminado',
      };
    }
  } catch (e) {
    return e;
  }
};

export default {
  Mutation: {
    deletePhoto: protectedResolver(resolverFn),
  },
};
