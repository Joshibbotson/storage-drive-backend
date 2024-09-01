import dotenv from "dotenv";
import express from "express";
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import multer from "multer";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { postsEntity } from "./modules/index.entity";
import mongoose from "mongoose";
import { DatasourceManager } from "./datasource/datasourceManager";

dotenv.config();
const dataSource = DatasourceManager.instance;
dataSource.datasource.connect();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
});
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/api/posts", async (req, res) => {
    // TODO
    // const client = new S3Client(clientParams);
    // const command = new GetObjectCommand(getObjectParams);
    // const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    // res.send(posts);
});

app.post("/api/newPost", upload.single("image"), async (req: any, res) => {
    console.log("req.body:", req.body);
    console.log("req.file", req.file);

    // buffer is actual image
    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);
    // TODO implement posts
    const post = await postsEntity.create({
        imageName: req.file.originalname,
    });

    res.send(post);
});
