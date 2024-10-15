import { useEffect, useState } from "react"
import { Record } from "../lib/data/db"
import { list } from "../lib/data/RecordRepository"
import { List, ListItem, ListItemText } from "@mui/material"


interface RecordListProps {
    taskId: string | undefined
}

const disaplyTime = (timestamp: number): string => {
    const d = new Date(timestamp)

    return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.toLocaleTimeString()}`
}
export default function RecordList({taskId}:RecordListProps) {
    const [data, setData] = useState<Record[]>([])

    useEffect(() => {
        if(taskId){
            list(taskId).then(records => {
                setData(records)
            })    
        }

    }, [])
    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {data.map((value) => (
                    <ListItem
                        key={value.id}
                        disableGutters
                    >
                        <ListItemText primary={disaplyTime(value.startTimestamp)} />
                    </ListItem>
                ))}
            </List>

        </>
    )
}