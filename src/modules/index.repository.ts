import { MongoPhotosRepository } from "./photos/photos.repository";
import { MongoPostsRepository } from "./posts/posts.repository";

export const photoRepository = new MongoPhotosRepository();
export const postsRepository = new MongoPostsRepository();

export const repositories = Object.freeze({
    photoRepository,
    postsRepository,
});
