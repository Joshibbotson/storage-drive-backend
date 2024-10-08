/**
 * The Repository in Hexagonal Architecture is responsible
 *  for the persistence of entities. Its single responsibility
 *  is to provide an interface for storing, retrieving, and
 * managing the persistence of entities. The Repository abstracts
 * away the details of how data is stored and retrieved,
 *  ensuring that the core domain logic does not depend on the
 *  underlying data storage mechanism.
 */

import mongoose from "mongoose";
import { CreatePostRequestDto } from "./dtos/postsRequest.dto";
import { postSchema } from "./posts.schema";
import { Post } from "./dtos/postsResponse.dto";

export type PostsRepository = {
    save(posts: CreatePostRequestDto): Promise<Post>;
    read(): Promise<Post[]>;
    readById(id: string): Promise<Post>;
    delete(
        id: string
    ): Promise<{ acknowledged: boolean; deletedCount: number }>;
};

export class MongoPostsRepository implements PostsRepository {
    postsModel = mongoose.model("posts", postSchema);
    constructor() {}
    async save(newPost: CreatePostRequestDto): Promise<Post> {
        const post = new this.postsModel(newPost);
        await post.save();

        return post.toObject();
    }

    async read(): Promise<Post[]> {
        return this.postsModel.find();
    }

    async readById(id: string): Promise<Post> {
        return this.postsModel.findById(id);
    }

    async delete(
        id: string
    ): Promise<{ acknowledged: boolean; deletedCount: number }> {
        return this.postsModel.deleteOne({ _id: id });
    }
}
