import { Datasource } from "./types/datasource";
import { MongodbDataSource } from "./MongodbDataSource";

export class DatasourceManager {
    private static datasourceInstance: DatasourceManager | null = null;
    public datasource: Datasource;
    constructor() {
        this.datasource = new MongodbDataSource(`${process.env.MONGODB_URI}`);
    }

    static get instance() {
        return DatasourceManager.datasourceInstance
            ? DatasourceManager.datasourceInstance
            : (DatasourceManager.datasourceInstance = new DatasourceManager());
    }
}
