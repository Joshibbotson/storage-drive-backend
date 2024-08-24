import express from "express";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

/** Multer adds a body object and a file or files object to
 * the Fastify's request object. The body object contains the
 *  values of the text fields of the form, the file or files
 * object contains the files uploaded via the form. */
const upload = multer({ dest: "uploads/" });
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/photos/upload", upload.array("photos", 12));
async function startServer(): Promise<void> {
    try {
        const port = process.env.PORT || 3000;
        app.listen(port);
        console.log(`Listening on ${port}`);
        throw new Error("argh!!!!!!");
    } catch (err) {
        throw err;
        console.log(`Server failed with an error of ${err}`);
    }
}

startServer();
