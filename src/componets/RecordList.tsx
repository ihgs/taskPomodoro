import { useEffect, useState } from "react"
import { Record } from "../lib/data/db"
import { list } from "../lib/data/RecordRepository"
import { List, ListItem, ListItemText } from "@mui/material"

export default function RecordList() {
    const [data, setData] = useState<Record[]>([])

    useEffect(() => {
        list().then(records => {
            setData(records)
        })

    }, [])
    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {data.map((value) => (
                    <ListItem
                        key={value.id}
                        disableGutters
                    >
                        <ListItemText primary={new Date(value.startTimestamp).toISOString()} />
                    </ListItem>
                ))}
            </List>

        </>
    )
}