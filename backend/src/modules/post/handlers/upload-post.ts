import { FastifyRequest } from 'fastify';

import fs from 'fs';

import { postRepo } from '../entities/post.entity';

const handleUploadPost = async (req: FastifyRequest) => {
  const data = await req.file();
  const bufferImage = await data.toBuffer();
  const fileName = data.fields['image'].filename;
  const caption = data.fields['caption'].value;
  const author = req.user;

  // make user specific dir for clean directory and faster disk index
  const userDir = `storage/${author.id}`;
  const isUserDirExist = fs.existsSync(userDir);
  if (!isUserDirExist) {
    fs.mkdirSync(userDir);
  }
  const imagePath = `${userDir}/${fileName}`;

  fs.writeFileSync(imagePath, bufferImage);
  await postRepo().save({
    caption,
    image_path: imagePath,
    author_id: author.id,
  });
  return { message: 'ok' };
};

export default handleUploadPost;
