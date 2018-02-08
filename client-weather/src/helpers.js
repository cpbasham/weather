export function filterForecastData(forecast) {
  const {alerts=undefined, currently=undefined, daily=undefined, hourly=undefined, minutely=undefined} = forecast;
  return {alerts, currently, daily, hourly, minutely};
}
export function getDate(data) {
  let conversion;
  if (data === undefined) { conversion = new Date(); }
  else { conversion = new Date(data.time * 1000); }
  return `${conversion.getMonth()+1}/${conversion.getDate()}/${conversion.getFullYear()}`;
}
export function getDay(data) {
  let conversion;
  if (data === undefined) { conversion = new Date(); }
  else { conversion = new Date(data.time * 1000); }
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][conversion.getDay()]
}
export function getTime(data) {
  let conversion;
  if (data === undefined) { conversion = new Date(); }
  else { conversion = new Date(data.time * 1000); }
  let hours = conversion.getHours(), minutes = conversion.getMinutes();
  if (("" + minutes).length === 1) {
    minutes = "0" + minutes;
  }
  return `${hours}:${minutes}`
}
export function getWindBearing(data) {
  if (data.windBearing === undefined) { return ""; }
  let bearings = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW"
  ];
  // each bearing represents a 22.5 degree arc
  let windBearing = data.windBearing;
  if (windBearing > (360-11.25)) { windBearing -= 360; } // make all northern bearings < 11.25
  let bearingIndex = 0;
  while (windBearing > 11.25) {
    windBearing -= 22.5;
    bearingIndex++;
  }
  return bearings[bearingIndex];
}
