import { GraphQLUpload } from 'graphql-upload';
import { uploadCloudinary } from '../../helpers/cloudinaryConfig';
import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';
import { processHashtags } from './../../helpers/photos.utils';

export default {
  Upload: GraphQLUpload,
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          // parse caption
          hashtagObj = processHashtags(caption);
        }
        const fileUrl = await uploadCloudinary(file, 'uploads');
        // create hashtags
        return client.photo.create({
          data: {
            file: fileUrl,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        // save the photo with the paserd hashtags
        // add the photo to the hashtags
      }
    ),
  },
};
