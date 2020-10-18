import {writable, Writable} from "svelte/store";
import testsong from './music/testsong.json';

interface Instrument {

}

interface Track {
	subscribe: () => void
}

interface Pattern {
	subscribe: () => void
	tracks: Track[]
}

export const trackCount: Writable<number> = writable(0);
export const patternOrder: Writable<number[]> = writable([]);
export const patterns: Pattern[] = [];
export const instruments: Instrument[] = [];


function expandTrack(length) {
	return (track) => {
		const out = [...new Array(length)].map(() => [null, null, null, null])
		for (let tentry of track) {
			out[tentry[0]] = tentry.slice(1)
		}
		return out;
	}
}

export function loadSong(songdata) {
	patternOrder.set(songdata.patternOrder)
	for (let p of songdata.patterns) {
		let popp = {...p}
		patterns.push({
			subscribe: () => {
				console.log("SUBBBB", popp);
			},
			tracks: p.tracks.map(expandTrack(p.length))
		})
	}
	trackCount.set(songdata.tracks);
}

loadSong(testsong);