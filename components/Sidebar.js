import React, { Component } from 'react';
import { Box, Button } from 'grommet';
import { observer } from 'mobx-react';
import { VehicleSelector, DateTimeRangePicker } from 'location-backbone-fe';
import { TrackPlayer } from './TrackPlayer';

@observer
export default class extends Component {
  state = {
    vehicles: this.props.store.vehicles.map(v => ({ ...v })),
    timeRange: { ...this.props.store.timeRange },
    isPlaying: false
  }

  onChangeStartTime = startTime => this.setState({
    timeRange: {
      startTime,
      endTime: this.state.timeRange.endTime
    }
  });
  onChangeEndTime = endTime => this.setState({
    timeRange: {
      startTime: this.state.timeRange.startTime,
      endTime
    }
  });

  render() {
    const disabled = this.props.store.tracks.busy || this.state.isPlaying;
    return (
      <Box width='medium'>
        <VehicleSelector
          disabled={disabled}
          overflow='auto'
          vehicles={this.state.vehicles}
          onChange={(v, checked) => {
            v.enabled = checked;
            this.setState({ vehicles: this.state.vehicles });
          }} />
        <DateTimeRangePicker
          disabled={disabled}
          startTime={this.state.timeRange.startTime}
          endTime={this.state.timeRange.endTime}
          onChangeStartTime={this.onChangeStartTime}
          onChangeEndTime={this.onChangeEndTime} />
        <Button
          disabled={disabled}
          label='确认'
          onClick={() => this.props.store.set(
            this.state.vehicles,
            this.state.timeRange)} />
          <TrackPlayer
            onPlayOrPause={isPlaying => this.setState({ isPlaying })}
            timeline={this.props.store.trackPlayerStore.get().playerTimeline}/>
      </Box>
    );
  }
}
