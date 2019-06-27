import { observable } from 'mobx';
import { promisedComputed } from 'computed-async-mobx';

export class TrackStore {
  @observable vehicles = [];
  @observable timeRange = { start: undefined, end: undefined };

  tracks = promisedComputed([], async () => {
    ;
  });
}