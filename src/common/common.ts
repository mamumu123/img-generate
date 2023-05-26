// @ts-ignore
import DT from "duration-time-conversion";


export function durationToTime(duration = 0) {
    return DT.d2t(duration.toFixed(3));
}