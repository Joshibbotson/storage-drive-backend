/**
 * The Entity in Hexagonal Architecture represents a core
 *  domain object. Its single responsibility is to encapsulate
 *  the business logic and rules that apply to that specific
 *  domain concept
 */

import { CreatePostRequestDto } from "./dtos/postsRequest.dto";
import { Post } from "./dtos/postsResponse.dto";
import { PostsRepository } from "./posts.repository";

export type PostsEntityType = {
    create(post: CreatePostRequestDto): Promise<Post>;
    findMany(): Promise<Post[]>;
    findById(id: string): Promise<Post>;
    deleteById(
        id: string
    ): Promise<{ acknowledged: boolean; deletedCount: number }>;
};

export class PostsEntity implements PostsEntityType {
    constructor(private readonly postsRepository: PostsRepository) {}

    async create(post: CreatePostRequestDto): Promise<Post> {
        return this.postsRepository.save(post);
    }

    async findMany(): Promise<Post[]> {
        return this.postsRepository.read();
    }

    async findById(id: string): Promise<Post> {
        return this.postsRepository.readById(id);
    }

    async deleteById(
        id: string
    ): Promise<{ acknowledged: boolean; deletedCount: number }> {
        return this.postsRepository.delete(id);
    }
}
