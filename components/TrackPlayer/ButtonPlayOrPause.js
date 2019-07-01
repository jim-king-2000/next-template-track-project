import React, { Component } from 'react';
import { Button } from 'grommet';
import { Pause, Play } from 'grommet-icons';

export default class extends Component {
  onPlayOrPause = () => {
    if (this.props.isPlay) this.props.onPlay();
    else this.props.onPause();
  }

  render() {
    return <Button
      margin='xsmall'
      plain={false}
      disabled={this.props.disabled}
      icon={this.props.isPlay ? <Play /> : <Pause />}
      onClick={this.onPlayOrPause}
      name='onPlayOrPause' />;
  }
}