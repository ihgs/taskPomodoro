import Dexie, {Table}from "dexie";

const version = 1;

export interface Task {
    id?: number
    title: string
}


export interface Record {
    id?: number
    taskId: number
    startTimestamp: number
}

export type recordKey = "tasks" | "records"

export class MyRecordDexie extends Dexie {
    tasks!: Table<Task>;
    records!: Table<Record>;

    constructor(){
        super('myTimer')
        this.version(version).stores({
            tasks: '++id',
            records: '++id, taskId'
        })
    }

    type (recordKey: recordKey) : Table<any>{
        if(recordKey == 'tasks'){
            return this.tasks;
        } else if (recordKey == 'records') {
            return this.records;
        }
        return this.tasks;
    }
}

export const db = new MyRecordDexie