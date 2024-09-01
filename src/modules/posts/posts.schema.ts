import mongoose, { HydratedDocument, Schema } from "mongoose";

export const postSchema = new Schema(
    {
        imageName: { type: String, required: true },
    },
    { timestamps: true }
);
