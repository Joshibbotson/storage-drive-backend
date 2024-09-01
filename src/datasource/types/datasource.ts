export type Datasource = {
    connect: () => Promise<void>;
    close: () => Promise<void>;
};
