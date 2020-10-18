import {noteName} from "../music/notes";

export function formatDataValue(column, value) {
	switch (column) {
		case "note":
			if (value === null) {
				return "···"
			}
			return noteName(value);
		case "volume":
			if (value === null) {
				return "··"
			}
			return value.toString(16);
		case "parameter":
			if (value === null) {
				return "000"
			}
			return `000${value.toString(16)}`.substr(-3);
		case "instrument":
			if (value === null) {
				return " "
			}
			return value;

		default:
			return value;
	}
}
