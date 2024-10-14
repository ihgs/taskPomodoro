import { AppBar, Box, IconButton, Menu, MenuItem, Modal, Toolbar, Typography } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import { useEffect, useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';
import { TimeHandler } from "../lib/TimeHandler";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { create } from "../lib/data/RecordRepository";
import { get } from "../lib/data/TaskRepository";
import { Task } from "../lib/data/db";
import RecordList from "../componets/RecordList";

export const taskLoader = async ({ params }: { params: any }) => {
    return await get(parseInt(params.id))
}

const modalStyle = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function Timer() {
    const navigate = useNavigate()
    const data = useLoaderData() as Task
    const { id } = useParams();
    const [timeHandler, setTimeHandler] = useState<TimeHandler | null>(null)
    const [displayTimer, setDisplayTimer] = useState<string>("25:00")
    const [state, setState] = useState<string>("init")
    const [openList, setOpenList] = useState(false)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseList = () => {
        setOpenList(false)
    }

    const showList = () => {
        setOpenList(true)
    }

    let timer: any = null;
    useEffect(() => {
        if (timeHandler) {
            timer = setInterval(() => {
                try {
                    setDisplayTimer(timeHandler.remain())
                } catch {
                    clearInterval(timer)
                    timer = null
                    setState("finished")
                    setDisplayTimer("00:00")
                    if (id) {
                        create({
                            taskId: parseInt(id),
                            startTimestamp: timeHandler.startTimestamp
                        })
                    }
                }
            }, 1000)
        }
    }, [timeHandler])

    const backTaskList = () => {
        if (timer) {
            clearInterval(timer)
            timer = null
        }
        navigate("/")
    }
    const renderButtons = () => {
        if (state == "tick") {
            return (
                <IconButton onClick={() => { setState("paused"); timeHandler?.pause() }} >
                    <PauseCircleOutlineOutlinedIcon sx={{ fontSize: 80 }} />
                </IconButton>
            )
        } else if (state == "paused") {
            return (
                <IconButton onClick={() => { setState("tick"); timeHandler?.resume() }}>
                    <PlayCircleOutlineIcon sx={{ fontSize: 80 }} />
                </IconButton>

            )
        } else {
            return (
                <IconButton onClick={() => { setState("tick"); setTimeHandler(new TimeHandler()) }}>
                    <PlayCircleOutlineIcon sx={{ fontSize: 80 }} />
                </IconButton>
            )
        }
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={backTaskList}>
                            <ArrowBackIosIcon sx={{ color: "white" }}></ArrowBackIosIcon>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {data.title}
                        </Typography>
                        <IconButton onClick={handleMenu}>
                            <MenuIcon sx={{ color: "white" }}>
                            </MenuIcon>
                        </IconButton>
                        <Box>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)} onClose={handleClose}>
                                <MenuItem onClick={showList}>List</MenuItem>
                                <MenuItem onClick={handleClose}>Graph</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Typography sx={{ margin: 10, fontSize: 80 }}>
                    {displayTimer}
                </Typography>
            </Box>
            <Box>
                {renderButtons()}
            </Box>

            <Modal
                open={openList}
                onClose={handleCloseList}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} component="form">
                    <RecordList />
                </Box>
            </Modal>
        </>
    )
}