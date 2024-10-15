const zeroPadding = (target:number) =>{
    return ('00' + target).slice(-2)
}

export class TimeHandler {
    startTimestamp: number
    endTimestamp: number

    puaseTimestamp?: number

    constructor() {
        this.startTimestamp = Date.now()
        this.endTimestamp = this.startTimestamp + 25 * 60 * 1000
    }

    remain(): string {
        let intRemainSec = 0
        if (this.puaseTimestamp) {
            intRemainSec = Math.round((this.endTimestamp - this.puaseTimestamp) / 1000)
        } else {
            intRemainSec = Math.round((this.endTimestamp - Date.now()) / 1000)
        }
        if (intRemainSec < 0) {
            throw "finished"
        }
        return `${zeroPadding(Math.floor(intRemainSec / 60))}:${zeroPadding(Math.floor(intRemainSec % 60))}`
    }

    pause() {
        this.puaseTimestamp = Date.now()
    }

    resume() {
        if (this.puaseTimestamp) {
            const diff = Date.now() - this.puaseTimestamp
            this.endTimestamp += diff
            this.puaseTimestamp = undefined
        }
    }
}