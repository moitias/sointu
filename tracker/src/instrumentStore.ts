import {writable, Writable} from "svelte/store";

interface InstrumentDefinition {
	name: string
	program: string[]
}

type InstrumentListener = (i: InstrumentDefinition) => void

interface Instrument {
	set: (i: InstrumentDefinition) => void
	subscribe: (cb: InstrumentListener) => () => void
	name: () => string
	program: () => string[]
}

export const instruments: Instrument[] = [];
export const instrumentCount: Writable<number> = writable(0);

export const currentUnit: Writable<number | null> = writable(null);

export function reactiveInstrument(initialnstrument: InstrumentDefinition): Instrument {
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
		subscribe,
		name: () => instrument.name,
		program: () => [...instrument.program],
	}
}

export function setInstrument(i: number, instrument: Instrument): void {
	while (instruments.length <= i) {
		instruments.push(null)
	}
	instruments[i] = instrument;
	instrumentCount.set(instruments.length);
}