import fs from 'fs';

export const readFile = async (avatar, loggedInUser) => {
  try {
    const { createReadStream, filename, mimetype, encoding } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const url = `${process.cwd()}/uploads/${newFilename}`;
    const writeStream = fs.createWriteStream(url);
    await readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;

    return { avatarUrl };
  } catch (e) {
    console.error(e);
  }
};
