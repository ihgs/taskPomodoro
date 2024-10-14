import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import { useEffect, useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TimeHandler } from "../lib/TimeHandler";
import { useNavigate, useParams } from "react-router-dom";
import { create } from "../lib/data/RecordRepository";

export default function Timer() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [timeHandler, setTimeHandler] = useState<TimeHandler | null>(null)
    const [displayTimer, setDisplayTimer] = useState<string>("25:00")
    const [state, setState] = useState<string>("init")

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
                    if(id){
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
        if(timer){
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
                            <ArrowBackIosIcon  sx={{ color: "white" }}></ArrowBackIosIcon>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Task
                        </Typography>
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
        </>
    )
}