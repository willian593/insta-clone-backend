import { processHashtags } from '../../helpers/photos.utils';
import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';

const resolverFn = async (_, { id, caption }, { loggedInUser }) => {
  try {
    // find photo
    const photo = await client.photo.findFirst({
      where: {
        id,
        userId: loggedInUser.id,
      },
      include: {
        hashtags: {
          select: {
            hashtag: true,
          },
        },
      },
    });
    console.log(photo);
    // verificar si existe photo
    if (!photo) {
      return {
        ok: false,
        error: 'Photo not found',
      };
    }
    // update photo
    const updatePhoto = await client.photo.update({
      where: {
        id,
      },
      data: {
        caption,
        hashtags: {
          disconnect: photo.hashtags,
          connectOrCreate: processHashtags(caption),
        },
      },
    });
    return {
      ok: true,
    };
  } catch (e) {
    return e;
  }
};

export default {
  Mutation: {
    editPhoto: protectedResolver(resolverFn),
  },
};

// const photo = await client.photo.findUnique({
//     where: {
//       id,
//     },
//   });
//   if (photo.userId !== loggedInUser.id) {
//     return {
//       ok: false,
//       error: 'Photo not found',
//     };
//   }
