import {get, writable} from "svelte/store";
import {getPatternRow, patterns, saveSong} from "./songStore";
import {cursorRow, setRow} from "./tracker/trackerStore";
import {emitData} from "./emitter";

const playing = writable(false);
const playingPattern = writable(0);
const playingRow = writable(0);

let tickTimeout = -1;

function tick() {
	const currentPattern: number = get(playingPattern);
	const patternData = patterns[currentPattern];
	const row: number = get(playingRow);
	//console.log("TICK",pattern,row)
	const tracks = getPatternRow(currentPattern, row)
	emitData(tracks);
	if (row + 1 >= patternData.length) {
		//playingPattern.update(p => p +1);
		playingRow.set(0);
		setRow(0)
	} else {
		playingRow.set(row + 1);
		setRow(row + 1)
	}
	tickTimeout = setTimeout(tick, 120)
}

function start() {
	playingRow.set(get(cursorRow))
	tick();
}

function stop() {
	clearTimeout(tickTimeout);
}

playing.subscribe((v) => {
	if (v) {
		start();
	} else {
		stop();
	}
})

export function togglePlay(pattern?: number) {
	// save on play.. TODO: figure this out smarter
	saveSong();
	if (pattern) {
		playingPattern.set(pattern)
	}
	playing.update(v => !v);
}

export const isPlaying = {
	subscribe: playing.subscribe
}

export const currentRow = {
	subscribe: playingRow.subscribe
}

export const currentPattern = {
	subscribe: playingPattern.subscribe
}

export function jumpToPattern(pattern: number) {
	playingPattern.set(pattern);
}