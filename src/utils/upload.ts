import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID, //노출주의
    secretAccessKey: process.env.SECRET_ACCESS_KEY, //노출주의
    region: process.env.REGION //노출주의
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "areact-picture",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + "." + file.originalname.split(".").pop());
        }
    })
});

export default upload;
