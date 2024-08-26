/**
 * The Entity in Hexagonal Architecture represents a core
 *  domain object. Its single responsibility is to encapsulate
 *  the business logic and rules that apply to that specific
 *  domain concept
 */

import { PhotosRepository } from "./photos.repository";

export class PhotosEntity {
    constructor(private readonly photosRepository: PhotosRepository) {}

    async savePhoto(photo: any) {
        return this.photosRepository.save(photo);
    }
}
