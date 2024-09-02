import dotenv from "dotenv";
import express from "express";
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
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
    // get all images
    const posts = await postsEntity.findMany();

    // loop through and create a config for each
    // add imageUrl for each and send posts back to client
    for (const post of posts) {
        const getObjectParams = {
            Bucket: bucketName,
            Key: post.imageName,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour
        post.imageUrl = url;
    }

    res.send(posts);
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
    const post = await postsEntity.create({
        imageName: req.file.originalname,
    });

    res.send(post);
});

app.delete("/api/posts/:id", async (req, res) => {
    console.log("hit");
    const id = req.params.id;

    const post = await postsEntity.findById(id);
    if (!post) {
        res.status(404).send("Post not found");
        return;
    }

    const params = {
        Bucket: bucketName,
        Key: post.imageName,
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    await postsEntity.deleteById(id);
    res.send({});
});
