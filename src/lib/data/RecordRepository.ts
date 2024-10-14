import { listData, recordData } from "./datasource"
import { Record } from "./db";

const KEY = "records"

const list = async ()=>{
    return await listData(KEY);
}

const create = async (data: Record) => {
    return await recordData(KEY,data)
}

export {
    list,
    create
}