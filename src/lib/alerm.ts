import * as Tone from "tone"

export const alarm = ()=> {
    const synth = new Tone.Synth().toDestination()
    const seq = new Tone.Sequence((time, note)=>{
        synth.triggerAttackRelease(note, '16n', time)
    },["B5","B5"]).start()
    seq.loop = false
    Tone.getTransport().start()
}