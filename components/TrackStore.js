import { observable } from 'mobx';
import moment from 'moment';
import { promisedComputed } from 'computed-async-mobx';
import { TsdbClient } from 'location-backbone-sdk';
import { appId, authorization } from '../components/account';

const tsdbClient = new TsdbClient();

export class TrackStore {
  constructor(vehicles) {
    this.vehicles = vehicles;
  }

  set = (vehicles, timeRange) => {
    this.vehicles = vehicles;
    this.timeRange = timeRange;
  }

  tracks = promisedComputed([], async () => {
    const vehiclesEnabled = this.vehicles.filter(v => v.enabled);
    const startTime = this.timeRange.startTime;
    const endTime = this.timeRange.endTime;
    const start = `${startTime.date}T${startTime.time}:00+08:00`;
    const end = `${endTime.date}T${endTime.time}:00+08:00`;
    console.log(start, end)
    return Promise.all(vehiclesEnabled.map(async v => ({
      thingId: v.thingId,
      name: v.name,
      splittedTrack: await tsdbClient.getTrackSplit({
        appId,
        thingId: v.thingId,
        authorization,
        start: moment(start).valueOf(),
        end: moment(end).valueOf()
      })
    })));
  });

  @observable vehicles = [];
  @observable timeRange = {
    startTime: {
      date: moment().format('YYYY-MM-DD'),
      time: '00:00'
    },
    endTime: {
      date: moment().format('YYYY-MM-DD'),
      time: '00:00'
    }
  };
}