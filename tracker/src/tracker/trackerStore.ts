import {get, writable} from "svelte/store";
import {rowCount, trackColumnCount} from "./constants";
import {trackCount} from "../songStore";

export const displayPattern = writable(0);

export const cursorRow = writable(0);
export const cursorTrack = writable<number>(0);
export const cursorTrackColumn = writable<number>(0);

export const octave = writable(4);

export function changeRow(delta: number): void {
	cursorRow.update(v => ((v + delta) + rowCount) % rowCount);
}

export function changeTrack(delta: number): void {
	const count: number = get(trackCount);
	cursorTrack.update(v => ((v + delta) + count) % count);
	cursorTrackColumn.set(0);
}

export function changeTrackColumn(delta: number): void {
	let newTrackColumn = (get(cursorTrackColumn) as number + delta);
	const count: number = get(trackCount);
	while (newTrackColumn < 0) {
		cursorTrack.update(v => v == 0 ? count - 1 : v - 1)
		newTrackColumn += trackColumnCount;
	}
	while (newTrackColumn >= trackColumnCount) {
		cursorTrack.update(v => v >= count - 1 ? 0 : v + 1)
		newTrackColumn -= trackColumnCount;
	}
	cursorTrackColumn.set(newTrackColumn);
}
