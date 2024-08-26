import dotenv from "dotenv";
import express from "express";
import AWS from "aws-sdk";
const s3 = new AWS.S3();

async () => {
    s3.putObject({
        Body: "Hello World",
        Bucket: "ji-file-uploads",
        Key: "my-file.txt",
    }).promise();
};

dotenv.config();
const app = express();

let port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
