export const trackColumns = ["note", "instrument", "volume", "parameter"];
export const trackColumnStops = [1, 2, 2, 3];
export const trackColumnCount = trackColumnStops.reduce((p, c) => p + c, 0);
export const trackWidth = 120;
