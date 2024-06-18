const { logger, storage } = require("firebase-functions/v2");
const { getStorage } = require("firebase-admin/storage");
const sharp = require("sharp");

const maxWidth = 1000

module.exports = storage.onObjectFinalized(async ({data}) => {

    const fileBucket = data.bucket; // Storage bucket containing the file.
    const filePath = data.name; // File path in the bucket.
    const contentType = data.contentType; // File content type.

    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith("image/")) {
        return logger.log("This is not an image.");
    }
    // Exit if the image is already converted
    if (contentType.startsWith("image/webp")) {
        return logger.log("Already converted.");
    }

    // Download file into memory from bucket.
    const bucket = getStorage().bucket(fileBucket);
    const downloadResponse = await bucket.file(filePath).download();
    const imageBuffer = downloadResponse[0];
    logger.log("Image downloaded!");

    let sharpImage = sharp(imageBuffer)

    const imageInfo = await sharpImage.metadata()
    if(imageInfo.width > maxWidth && !filePath.startsWith("top/")) {
        sharpImage = sharpImage.resize(maxWidth)
        logger.log("resized");
    }

    // Generate webp using sharp.
    sharpImage = sharpImage.webp({quality: 100 })
    logger.log("converted");

    const convertedBuffer = await sharpImage.toBuffer()

    // Upload the webp.
    const metadata = { contentType: 'image/webp' };
    await bucket.file(filePath).save(convertedBuffer, {
        metadata: metadata,
    });
    return logger.log("uploaded");
});