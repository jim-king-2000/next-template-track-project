import moment from 'moment';

function toTimestamp(dateTime) {
  return moment(`${dateTime.date}T${dateTime.time}:00+08:00`).valueOf();
}

export function calcPlayerTimestamp(tracks, timeRange) {
  if (!Array.isArray(tracks) || 0 === tracks.length) return {
    startTimestamp: 0,
    endTimestamp: 0,
    currentTimestamp: 0
  };

  let timestamps = tracks.map(track =>
    track.tracks[0] && track.tracks[0].timestamp).filter(Boolean);
  if (!Array.isArray(timestamps) || 0 === timestamps.length) return {
    startTimestamp: 0,
    endTimestamp: 0,
    currentTimestamp: 0
  };

  const currentTimestamp = Math.min(...timestamps);
  const endTimestamp = toTimestamp(timeRange.startTime);
  const startTimestamp = toTimestamp(timeRange.endTime);
  return {
    startTimestamp,
    endTimestamp,
    currentTimestamp,
  };
}