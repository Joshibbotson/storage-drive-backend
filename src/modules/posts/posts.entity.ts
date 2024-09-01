/**
 * The Entity in Hexagonal Architecture represents a core
 *  domain object. Its single responsibility is to encapsulate
 *  the business logic and rules that apply to that specific
 *  domain concept
 */

import { CreatePostRequestDto } from "./dtos/postsRequest.dto";
import { PostResponseDto } from "./dtos/postsResponse.dto";
import { PostsRepository } from "./posts.repository";

export class PostsEntity {
    constructor(private readonly postsRepository: PostsRepository) {}

    async create(post: CreatePostRequestDto): PostResponseDto {
        return this.postsRepository.save(post);
    }
}
