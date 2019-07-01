import React, { Component } from 'react';
import assert from 'assert';
import { observer } from 'mobx-react';
import { Box, Button, RangeInput } from 'grommet';
import { FastForward, Rewind } from 'grommet-icons';
import ButtonPlayOrPause from './ButtonPlayOrPause';

const Steps = [
  500,
  1000,
  2000,
  5000,
  10000,
  20000,
  50000,
  100000,
];

function normalize(step) {
  if (step < 0) return 0;
  if (Steps.length <= step) return Steps.length - 1;
  return step;
}

@observer
export class TrackPlayer extends Component {
  state = { isPlay: true, step: 1 };

  onPlay = () => {
    assert.deepEqual(this.state.isPlay, true);
    if (this.timer) {
      assert.fail('this.timer should be null.');
      this.onPause();
    }
    this.timer = setInterval(() => {
      if (this.props.value >= this.props.max) {
        this.onPause();
        return;
      }
      this.props.onForward(Steps[this.state.step]);
    }, 700);
    this.setState({ isPlay: false });
    this.props.onPlayOrPause(true);
  }

  onPause = () => {
    assert.deepEqual(this.state.isPlay, false);
    clearInterval(this.timer);
    this.timer = null;
    this.setState({ isPlay: true });
    this.props.onPlayOrPause(false);
  }

  onFast = () => this.setState({ step: normalize(this.state.step + 1) });
  onSlow = () => this.setState({ step: normalize(this.state.step - 1) });

  render() {
    console.log(this.props)
    // const { startTimestamp, endTimestamp, currentTimestamp } = this.props.timeline;
    const enabled = this.props.min < this.props.max;
    return (
      <Box>
        <Box align='center' pad='xsmall'>
          <RangeInput
            min={this.props.min}
            max={this.props.max}
            value={this.props.value}
            onChange={e => this.props.onChange(Number(e.target.value))} />
        </Box>
        <Box direction='row'>
          <ButtonPlayOrPause
            disabled={!enabled}
            isPlay={this.state.isPlay}
            onPlay={this.onPlay}
            onPause={this.onPause} />
          <Button
            margin='xsmall'
            plain={false}
            disabled={!enabled}
            icon={<Rewind />}
            onClick={this.onSlow} />
          <Button
            margin='xsmall'
            plain={false}
            disabled={!enabled}
            icon={<FastForward />}
            onClick={this.onFast} />
          <Box
            margin='xsmall'
            justify='center'>
            {Steps[this.state.step] / 1000}&times;
          </Box>
        </Box>
      </Box>
    );
  }
}