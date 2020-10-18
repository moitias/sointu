const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

export function noteName(note: number): string {
	const octave = Math.floor(note / 12);
	const octaveNote = note % 12;
	return `${`${notes[octaveNote]}-`.substr(0, 2)}${octave}`;
}

export function note(octave, note: number): number {
	return octave * 12 + note;
}