import player from './music/simpleplayer';

export function emitData(trackData) {
	for (let i = 0; i < trackData.length; i++) {
		if (trackData[i][0] !== null) {
			player.play({
				track: i,
				note: trackData[i][0],
				instrument: trackData[i][1],
				volume: trackData[i][2],
				param: trackData[i][3]
			});
			console.log("TRACK", i, "NOTE", trackData[i][0], "INSTRUMENT", trackData[i][1], "VOL", trackData[i][2], "PARAM", trackData[i][3], `HEX ${trackData[i][3] && trackData[i][3].toString(16)}`)
		} else if (trackData[i][3] !== null) {
			player.control({track: i, param: trackData[i][3]});
			console.log("CONTROL TRACK", i, "PARAM", trackData[i][3], `HEX ${trackData[i][3].toString(16)}`);
		}
	}
}