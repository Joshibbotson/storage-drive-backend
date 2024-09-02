import { Schema } from "mongoose";

export const postSchema = new Schema(
    {
        imageName: { type: String, required: true },
        imageUrl: { type: String, required: false },
    },
    { timestamps: true }
);
