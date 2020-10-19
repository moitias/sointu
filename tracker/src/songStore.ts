import {get, writable, Writable} from "svelte/store";
import testsong from './music/testsong.json';
import {trackColumns} from "./tracker/constants";
import {instruments, reactiveInstrument, setInstrument} from "./instrumentStore";
import {setPlayerInstrument} from "./music/simpleplayer";
import {displayPattern} from "./tracker/trackerStore";
import {jumpToPattern} from "./playerStore";

type Event = (number | null)[];
type TrackEvents = Event[]
type TrackListener = (events: TrackEvents) => void

interface Track {
	listeners: TrackListener[];
	subscribe: (TrackListener) => () => void
	events: TrackEvents
}

interface Pattern {
	length: number
	tracks: Track[]
}

export const trackCount: Writable<number> = writable(0);
export const patternOrder: Writable<number[]> = writable([]);
export const patterns: Pattern[] = [];
export const patternCount: Writable<number> = writable(0);

function expandTrack(length) {
	return (track) => {
		const out = [...new Array(length)].map(() => [null, null, null, null])
		for (let tentry of track) {
			out[tentry[0]] = tentry.slice(1)
		}
		const listeners = [];
		return {
			listeners,
			subscribe: (subscriber) => {
				listeners.push(subscriber);
				subscriber(out);
				return () => {
					listeners.splice(listeners.indexOf(subscriber), 1);
				}
			},
			events: out
		};
	}
}

export function loadSong(songdata) {
	console.log("LOADING", songdata);
	patternOrder.set(songdata.patternOrder)
	for (let p of songdata.patterns) {
		patterns.push({
			length: p.length,
			tracks: p.tracks.map(expandTrack(p.length))
		})
	}
	patternCount.set(patterns.length);
	trackCount.set(songdata.tracks);
	for (let i = 0; i < songdata.instruments.length; i++) {
		setInstrument(i, reactiveInstrument(songdata.instruments[i]))
		setPlayerInstrument(i, songdata.instruments[i]);
	}
}

export function updatePattern(pattern, track, row, col, value): void {
	const colI = trackColumns.indexOf(col);
	if (patterns?.[pattern].tracks?.[track].events?.[row]?.[colI] !== undefined) {
		patterns[pattern].tracks[track].events[row][colI] = value;
		// trigger listeners
		for (const listener of patterns[pattern].tracks[track].listeners) {
			listener(patterns[pattern].tracks[track].events);
		}
	} else {
		console.warn("NO UPDATE", track, row, col, colI, "=", value, value.toString(16))
	}
}

export function getPatternValues(pattern, track, row): (number | null)[] {
	return patterns?.[pattern].tracks?.[track].events?.[row] || [null, null, null, null];
}

export function getPatternRow(pattern, row): Event[] {
	return patterns?.[pattern].tracks.map(t => t.events?.[row] || [null, null, null, null]);
}

export function exportSong() {
	return {
		name,
		tracks: get(trackCount),
		instruments: instruments.map(i => ({
			name: i.name(),
			units: i.units()
		})),
		patterns: patterns.map(p => ({
			length: p.length,
			tracks: p.tracks.map(t => t.events.map((e, i) => [i, ...e]))
		})),
		patternOrder: get(patternOrder),
		loop: false,
		loopStart: 0
	}
}

export function saveSong() {
	window.localStorage.setItem("song", JSON.stringify(exportSong()));
}

export function resetSong() {
	window.localStorage.setItem("song", JSON.stringify(testsong));
	window.location.reload();
}

const song = window.localStorage.getItem("song");
if (song) {
	loadSong(JSON.parse(song));
} else {
	loadSong(testsong);
}
