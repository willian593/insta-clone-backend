import bcrypt from 'bcrypt';
import fs from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import { protectedResolver } from '../../helpers/user.utils';
import client from './../../client';
import { readFile } from '../../middleware/uploadFileServer';
import { uploadCloudinary } from './../../helpers/cloudinaryConfig';

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newpassword, bio, avatar },
  { loggedInUser }
) => {
  try {
    if (!loggedInUser) {
      throw new Error('You need to login.');
    }
    let avatarUrl = String;
    if (avatar) {
      avatarUrl = await uploadCloudinary(avatar, 'avatars');
      // const { createReadStream, filename, mimetype, encoding } = await avatar;
      // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
      // const readStream = createReadStream();
      // const url = `${process.cwd()}/uploads/${newFilename}`;
      // const writeStream = fs.createWriteStream(url);
      // await readStream.pipe(writeStream);
      // avatarUrl = `http://localhost:4000/static/${newFilename}`;
    }
    let uglyPassword = null;
    if (newpassword) {
      uglyPassword = await bcrypt.hash(newpassword, 10);
    }
    const updatedUser = await client.user.update({
      where: { id: loggedInUser.id },
      data: {
        firstName,
        lastName,
        username,
        email,
        bio,
        ...(uglyPassword && { password: uglyPassword }),
        ...(avatarUrl && { avatar: avatarUrl }),
      },
    });
    if (updatedUser.id) {
      return {
        ok: true,
        msg: 'Imagen cargada correctamente',
      };
    } else {
      return {
        ok: false,
        msg: 'Could not update profile.',
      };
    }
  } catch (e) {
    return e;
  }
};

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
