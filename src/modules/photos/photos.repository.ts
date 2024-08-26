/**
 * The Repository in Hexagonal Architecture is responsible
 *  for the persistence of entities. Its single responsibility
 *  is to provide an interface for storing, retrieving, and
 * managing the persistence of entities. The Repository abstracts
 * away the details of how data is stored and retrieved,
 *  ensuring that the core domain logic does not depend on the
 *  underlying data storage mechanism.
 */

export type PhotosRepository = {
    save(photos: any): Promise<void>;
};

export class MongoPhotosRepository implements PhotosRepository {
    async save(photos: any): Promise<void> {}
}
