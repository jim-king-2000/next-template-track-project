import { observable, computed } from 'mobx';
import { calcPlayerTimestamp } from './TrackPlayerStoreUtil';

export class TrackPlayerStore {
  constructor(tracks, timeRange) {
    this.tracks = tracks.map(t => ({
      thingId: t.thingId,
      tracks: t.splittedTrack.flat()
    }));
    this.timeRange = timeRange;
  }

  @computed
  get playerTimeline() {
    return calcPlayerTimestamp(this.tracks, this.timeRange);
  }

  @observable tracks = [];
  @observable timeRange = {};
}