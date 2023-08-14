import Dexie, { Table } from "dexie";

export class CQIDexie extends Dexie {
    coc!: Table<{ id: string; value: string }>;

    constructor() {
        super("ihris");
        this.version(1).stores({
            coc: "++id,value",
        });
    }
}

export const db = new CQIDexie();
