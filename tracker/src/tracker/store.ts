import {get, writable} from "svelte/store";
import {rowCount, trackColumnCount, trackCount} from "./constants";

export const cursorRow = writable(0);
export const cursorTrack = writable(0);
export const cursorTrackColumn = writable<number>(0);

export function changeRow(delta: number) {
	cursorRow.update( v => ((v + delta) + rowCount) % rowCount );
}

export function changeTrack(delta: number) {
	cursorTrack.update( v => ((v + delta) + trackCount) % trackCount);
	cursorTrackColumn.set(0);
}

export function changeTrackColumn(delta: number) {
	let newTrackColumn = (get(cursorTrackColumn) as number + delta);
	while (newTrackColumn < 0) {
		cursorTrack.update( v => v == 0 ? trackCount - 1 : v-1 )
		newTrackColumn += trackColumnCount;
	}
	while (newTrackColumn >= trackColumnCount) {
		cursorTrack.update( v => v >= trackCount - 1 ? 0 : v+1 )
		newTrackColumn -= trackColumnCount;
	}
	cursorTrackColumn.set(newTrackColumn);
}

