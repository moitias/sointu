const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

export function noteName(note: number): string {
	const octave = Math.floor(note / 12);
	const octaveNote = note % 12;
	return `${`${notes[octaveNote]}-`.substr(0, 2)}${octave}`;
}

export function noteValue(octave: number, note: number | string): number {
	if (typeof note === "string") {
		return octave * 12 + notes.indexOf(note);
	}
	return octave * 12 + note;
}
