export function emitData(trackData) {
	for (let i = 0; i < trackData.length; i++) {
		if (trackData[i][0] !== null) {
			console.log("TRACK", i, "NOTE", trackData[i][0], "INSTRUMENT", trackData[i][1], "VOL", trackData[i][2], "PARAM", trackData[i][3], `HEX ${trackData[i][3].toString(16)}`)
		} else if (trackData[i][3] !== null) {
			console.log("CONTROL TRACK", i, "PARAM", trackData[i][3], `HEX ${trackData[i][3].toString(16)}`);
		}
	}
}