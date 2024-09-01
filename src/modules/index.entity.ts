import { photoRepository, postsRepository } from "./index.repository";
import { PhotosEntity } from "./photos/photos.entity";
import { PostsEntity } from "./posts/posts.entity";

export const photosEntity = new PhotosEntity(photoRepository);
export const postsEntity = new PostsEntity(postsRepository);
