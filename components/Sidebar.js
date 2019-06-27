import React, { Component } from 'react';
import { Box, Button } from 'grommet';
import { VehicleSelector, DateTimeRangePicker } from 'location-backbone-fe';

export default class extends Component {
  state = {
    vehicles: this.props.store.vehicles.map(v => ({ ...v })),
    timeRange: { ...this.props.store.timeRange }
  }

  onChangeStartTime = () => {};
  onChangeEndTime = () => {};

  render() {
    return (
      <Box>
        <VehicleSelector
          overflow='auto'
          vehicles={this.state.vehicles}
          onChange={(v, checked) => {
            v.enabled = checked;
            this.setState({ vehicles: this.state.vehicles });
          }} />
        <DateTimeRangePicker
          startTime={this.state.timeRange.start}
          endTime={this.state.timeRange.end}
          onChangeStartTime={this.onChangeStartTime}
          onChangeEndTime={this.onChangeEndTime} />
        <Button
          label='确认'
          onClick={() => this.props.store.setVehicles(this.state.vehicles)} />
      </Box>
    );
  }
}
