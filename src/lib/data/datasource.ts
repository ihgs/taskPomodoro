import { db, recordKey } from './db'
 

const recordData = async (recordKey: recordKey, data: any) => {
    await db.type(recordKey).add(
        {
            ...data
        }
    )
}

const updateData = async (recordKey: recordKey, data: any) => {
    return await db.type(recordKey).update(data.id, data)
}

const listData = async (recordKey: recordKey) => {
    return await db.type(recordKey).reverse().toArray()
}

const getData = async (recordKey: recordKey, id: number) => {
    return await db.type(recordKey).get(id)
}

const deleteData = async (recordKey: recordKey, id: number) => {
    return await db.type(recordKey).delete(id);
}

export {
    recordData,
    updateData,
    listData,
    getData,
    deleteData,
} 