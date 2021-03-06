import React, { Component } from 'react';
import { Box, Button } from 'grommet';
import { observer } from 'mobx-react';
import { FlatSelector, DateTimeRangePicker,
  TrackPlayer, TrackVisualizer } from 'location-backbone-fe';

@observer
export default class extends Component {
  state = {
    vehicles: this.props.store.vehicles.map(v => ({ ...v })),
    timeRange: { ...this.props.store.timeRange },
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
    const store = this.props.store;
    const trackPlayerStore = store.trackPlayerStore.get();
    const disabled = store.tracks.busy ||
      trackPlayerStore.playerStatus.isPlaying;
    return (
      <Box width='medium' gap='xsmall'>
        <FlatSelector
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
        <Box align='center' flex={false}>
          <Button
            disabled={disabled}
            label='查询轨迹'
            onClick={() => store.set(
              this.state.vehicles,
              this.state.timeRange)} />
        </Box>
        <TrackPlayer
          playerStatus={trackPlayerStore.playerStatus}
          timeline={trackPlayerStore.playerTimeline} />
        <TrackVisualizer
          timeline={trackPlayerStore.playerTimeline}
          visualization={trackPlayerStore.visualization} />
      </Box>
    );
  }
}
