import { getData, listData, recordData } from "./datasource"
import { Task } from "./db";

const KEY = "tasks"

const list = async ()=>{
    return await listData(KEY);
}

const create = async (data: Task) => {
    return await recordData(KEY,data)
}

const get = async (id: number) => {
    return await getData(KEY, id)
}

export {
    list,
    create,
    get,
}