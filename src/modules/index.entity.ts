import { photoRepository } from "./index.repository";
import { PhotosEntity } from "./photos/photos.entity";

export const photosEntity = new PhotosEntity(photoRepository);
