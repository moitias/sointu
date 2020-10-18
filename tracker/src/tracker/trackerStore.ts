import {get, writable} from "svelte/store";
import {trackColumnCount} from "./constants";
import {patterns, trackCount} from "../songStore";

export const displayPattern = writable(0);
export const selectedInstrument = writable(0);

export const cursorRow = writable(0);
export const cursorTrack = writable<number>(0);
export const cursorTrackColumn = writable<number>(0);

export const octave = writable(5);

export function changeRow(delta: number): void {
	const rowCount = patterns[get(displayPattern) as number].length;
	cursorRow.update(v => ((v + delta) + rowCount) % rowCount);
}

export function setRow(newRow: number): void {
	cursorRow.set(newRow);
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
