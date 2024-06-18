const admin = require("firebase-admin");
const sharp = require("sharp");

// 配置したサービスアカウントの秘密鍵を取得
const serviceAccount = require("./key/service-account.json");

// firebase-adminを初期化
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "tatami-f2ad1.appspot.com"
});

// storageのbucketのインスタンスを取得
const bucket = admin.storage().bucket();
const maxWidth = 980

// ****************************
// * MAIN
// ****************************
async function main() {
    const [files] = await bucket.getFiles();

    files.forEach(async file => {

        const filePath = file.name; // File path in the bucket.
        const contentType = file.metadata.contentType

        // Exit if this is triggered on a file that is not an image.
        if (!contentType.startsWith("image/")) {
            return console.log("This is not an image.");
        }

        // Download file into memory from bucket.
        const downloadResponse = await bucket.file(filePath).download();
        const imageBuffer = downloadResponse[0];
        console.log("Image downloaded!");

        let sharpImage = sharp(imageBuffer)

        sharpImage = await resizeImage(sharpImage)
        sharpImage = await convertWebp(sharpImage, contentType)

        const convertedBuffer = await sharpImage.toBuffer()

        // Upload the webp.
        const metadata = { contentType: 'image/webp' };
        await bucket.file(filePath).save(convertedBuffer, {
            metadata: metadata,
        });
        return console.log("uploaded");
    });
}

const resizeImage = async (sharpImage) => {
    const imageInfo = await sharpImage.metadata()
    if (imageInfo.width > maxWidth) {
        console.log("resized");
        return sharpImage.resize(maxWidth)
    }
    return sharpImage
}

const convertWebp = async (sharpImage, contentType) => {
    if (!contentType.startsWith("image/webp")) {
        return sharpImage.webp({ quality: 80 })
    }

    return sharpImage
}



main().then();
