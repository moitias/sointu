import freq from 'midi-freq';

//const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function play({track, note, instrument, volume, param}) {
	if (audioCtx === null) {
		audioCtx = new window.AudioContext();
	}
	let osc = audioCtx.createOscillator();
	let gain = audioCtx.createGain();
	const duration = 0.5;
	osc.connect(gain);
	gain.connect(audioCtx.destination);
	osc.type = "sine";
	osc.frequency.value = freq(440, note);
	console.log({track, note, instrument, volume, param});
	gain.gain.setValueAtTime(0.5 * (volume / 128), audioCtx.currentTime);
	osc.start();
	gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
	osc.stop(audioCtx.currentTime + duration)
}

function control({track, param}) {
	console.log("CONTROL", {track, param})
}

export default {
	play,
	control
};