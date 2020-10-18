import {writable, Writable} from "svelte/store";
import testsong from './music/testsong.json';
import {trackColumns} from "./tracker/constants";

interface InstrumentDefinition {
	name: string
	program: string[]
}

type InstrumentListener = (i: InstrumentDefinition) => void

interface Instrument {
	set: (i: InstrumentDefinition) => void
	subscribe: (cb: InstrumentListener) => () => void
}

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
export const instruments: Instrument[] = [];
export const instrumentCount: Writable<number> = writable(0);

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

function reactiveInstrument(initialnstrument: InstrumentDefinition): Instrument {
	let instrument = initialnstrument;

	function set(newI: InstrumentDefinition) {
		instrument = newI;
	}

	const listeners = [];

	function subscribe(cb: (i: InstrumentDefinition) => void): () => void {
		listeners.push(cb);
		return () => {
			listeners.splice(listeners.indexOf(cb), 1)
		}
	}

	return {
		set,
		subscribe
	}
}

export function loadSong(songdata) {
	patternOrder.set(songdata.patternOrder)
	for (let p of songdata.patterns) {
		patterns.push({
			length: p.length,
			tracks: p.tracks.map(expandTrack(p.length))
		})
	}
	patternCount.set(patterns.length);
	trackCount.set(songdata.tracks);
	for (let i of songdata.instruments) {
		instruments.push(reactiveInstrument(i))
	}
	instrumentCount.set(instruments.length);
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

loadSong(testsong);