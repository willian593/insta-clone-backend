import client from './../../client';
export default {
  Query: {
    searchPhotos: async (_, { keyword }) => {
      try {
        const photos = await client.photo.findMany({
          where: {
            caption: {
              startsWith: keyword.toLowerCase(),
            },
          },
        });
        if (photos.length === 0) {
          throw new Error('No existe la foto');
        }
        return photos;
      } catch (e) {
        return e;
      }
    },
  },
};
