import freq from 'midi-freq';
import type {InstrumentDefinition} from "../instrumentStore";

//const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
const instruments = [];
const tracks = {};

function buildOsc(ops, note, output) {
	let osc = audioCtx.createOscillator();
	let node = audioCtx.createConstantSource();
	for (let op of ops) {
		switch (op.command) {
			case "osc":
				osc = audioCtx.createOscillator();
				osc.type = op.type;
				osc.frequency.value = freq(440, note);
				node = osc;
				break;
			case "filter":
				let filter = audioCtx.createBiquadFilter();
				filter.type = "lowshelf";
				filter.frequency.setValueAtTime(op.frequency, audioCtx.currentTime);
				node.connect(filter);
				node = filter;
				break;
			case "output":
				node.connect(output);
				return osc;

		}
	}
	throw new Error("no output!")
}

function playSound(track, instrument, note, volume, param) {
	if (tracks[track]) {
		tracks[track].end();
	}
	let gain = audioCtx.createGain();
	const duration = 0.5;
	gain.connect(audioCtx.destination);
	let osc = buildOsc(instrument.units, note, gain)
	console.log({note, instrument, volume, param, osc});
	gain.gain.setValueAtTime(0.5 * (volume / 128), audioCtx.currentTime);
	osc.start();
	gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
	osc.stop(audioCtx.currentTime + duration)
	tracks[track] = {
		end: () => {
			osc.stop(audioCtx.currentTime);
		}
	}
}

export function play({track, note, instrument, volume, param}) {
	if (audioCtx === null) {
		audioCtx = new window.AudioContext();
	}
	playSound(track, instruments[instrument], note, volume, param);
}

export function control({track, param}) {
	console.log("CONTROL", {track, param})
}

export function setPlayerInstrument(index: number, i: InstrumentDefinition) {
	instruments[index] = i;
}

