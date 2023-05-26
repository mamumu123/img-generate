// db.ts
import Dexie, { Table } from 'dexie';

export interface FileData {
    id?: number;
    name: string;
    type: string;
    data: File;
}

export class FileDexie extends Dexie {

    files!: Table<FileData>;


    constructor() {
        super('myDatabase');
        this.version(1).stores({
            files: '++id, name, type, data' // Primary key and indexed props
        });
    }
}

export const dbFileDexie = new FileDexie();