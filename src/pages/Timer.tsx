import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import { useEffect, useState } from "react";
import { TimeHandler } from "../lib/TimeHandler";

export default function Timer() {
    const [timeHandler, setTimeHandler] = useState<TimeHandler | null>(null)
    const [displayTimer, setDisplayTimer] = useState<string>("25:00")
    const [state, setState] = useState<string>("init")

    useEffect(() => {
        if (timeHandler) {
            const timer = setInterval(() => {
                try {
                    setDisplayTimer(timeHandler.remain())
                } catch {
                    clearInterval(timer)
                    setState("finished")
                    setDisplayTimer("00:00")
                }
            }, 1000)
        }
    }, [timeHandler])

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