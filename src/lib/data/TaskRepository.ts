import { listData, recordData } from "./datasource"
import { Task } from "./db";

const KEY = "tasks"

const list = async ()=>{
    return await listData(KEY);
}

const create = async (data: Task) => {
    return await recordData(KEY,data)
}

export {
    list,
    create
}