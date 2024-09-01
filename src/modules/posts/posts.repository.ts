/**
 * The Repository in Hexagonal Architecture is responsible
 *  for the persistence of entities. Its single responsibility
 *  is to provide an interface for storing, retrieving, and
 * managing the persistence of entities. The Repository abstracts
 * away the details of how data is stored and retrieved,
 *  ensuring that the core domain logic does not depend on the
 *  underlying data storage mechanism.
 */

import { CreatePostRequestDto } from "./dtos/postsRequest.dto";
import { PostResponseDto } from "./dtos/postsResponse.dto";

export type PostsRepository = {
    save(posts: CreatePostRequestDto): Promise<PostResponseDto>;
};

export class MongoPostsRepository implements PostsRepository {
    connect() {}

    async save(posts: CreatePostRequestDto): Promise<PostResponseDto> {}
}
