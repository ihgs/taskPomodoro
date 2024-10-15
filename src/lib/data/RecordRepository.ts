import { listDataFilter, recordData } from "./datasource"
import { Record } from "./db";

const KEY = "records"

const list = async (taskId: string | undefined)=>{
    if(taskId)
        return await listDataFilter(KEY, "taskId", parseInt(taskId));
    return []
}

const create = async (data: Record) => {
    return await recordData(KEY,data)
}

export {
    list,
    create
}