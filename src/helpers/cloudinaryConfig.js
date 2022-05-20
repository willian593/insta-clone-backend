import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.KEY_CLOUDINARY,
  api_secret: process.env.SECRET_CLOUDINARY,
});

export const uploadCloudinary = async (file, folderName) => {
  const { createReadStream } = await file;
  // const readStream = createReadStream();
  // const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  try {
    const uploadStream = await new Promise((resolve, reject) => {
      createReadStream().pipe(
        cloudinary.v2.uploader.upload_stream(
          {
            folder: `${folderName}/`,
          },
          (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          }
        )
      );
    });
    return uploadStream.secure_url;
  } catch (e) {
    return e;
  }
};
