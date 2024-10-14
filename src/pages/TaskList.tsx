import { AppBar, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, Modal, TextField, Toolbar, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Edit as EditIcon, Add as AddIcon } from "@mui/icons-material"
import { useState } from "react";

export const listTaskLoader = async () => {
    return [
        { id: 0, title: "test" },
        { id: 1, title: "test1" },
        { id: 2, title: "test2" },
    ]
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function TaskList() {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const data = useLoaderData() as any[]
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Task List
                        </Typography>
                        <IconButton aria-label="add" onClick={()=>{setOpen(true)}}>
                            <AddIcon sx={{ color: "white" }}></AddIcon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <List
                sx={{ width: "100%", maxWidth: 400, bgcolor: 'background.paper' }}
            >
                {data.map((datum) => {
                    return (
                        <ListItem
                            key={datum.id}
                            secondaryAction={
                                <IconButton
                                    aria-label="edit"
                                    onClick={() => { }}
                                >
                                    <EditIcon></EditIcon>
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={() => { }} dense>

                                <ListItemText primary={datum.title} />
                            </ListItemButton>
                        </ListItem>

                    )
                })}
            </List>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} component="form">
                    <div>
                        <TextField
                            required
                            label="Title"
                        ></TextField>
                    </div>                    
                    <div>
                        <Button variant="outlined" sx={{marginY:2, }} onClick={()=>setOpen(false)}>Cancel</Button>
                        <Button variant="contained" sx={{marginY:2, marginX: 1}}>Save</Button>
                    </div>
                </Box>
            </Modal>

        </>
    )
}