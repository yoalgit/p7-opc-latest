const sharp = require('sharp');
const fs = require('fs');

// Mime types / file extension translation
const MIME_TYPES = require('../utils/mimeTypes');

module.exports = async (req, res, next) => {
  // Target the file depending on its fieldname (image or profilePic)
  if (req.files) {
    const file = req.files.profilePic
      ? req.files.profilePic[0]
      : req.files.image[0];

    // Define new filename
    // replace blank spaces by underscores
    const name = file.originalname.split(' ').join('_').split('.')[0];
    // apply file extension corresponding to image MIME type
    const extension = MIME_TYPES[file.mimetype];
    const filename = `${name}${Date.now()}.${extension}`;

    const dirnames = ['user', 'article'];

    // if the folders do not exist, we create them
    await Promise.all(
      dirnames.map((dirname) =>
        fs.promises
          .access(`images/${dirname}`)
          .catch(() => fs.promises.mkdir(`images/${dirname}`))
      )
    );

    // Sharp configuration
    const resizeOptions = req.files.profilePic
      ? { width: 260, height: 260 }
      : { width: 1300, withoutEnlargement: true };

    const dirname = req.files.profilePic ? 'user' : 'article';

    // Resize and save images
    await sharp(file.buffer)
      .resize(resizeOptions)
      .toFile(`images/${dirname}/${filename}`);

    req.file = { filename: filename };
  }
  next();
};
