import React, { Component } from 'react';
import { Box, Stack, Text } from 'grommet';
import { observer } from 'mobx-react';
import moment from 'moment';

export function formatTime2(timestamp) {
  return timestamp && (
    <>
      {moment(timestamp).format('YY/MM/DD')}
      <br />
      {moment(timestamp).format('HH:mm:ss')}
    </>
  );
}

@observer
export class TrackVisualizer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const visualData = this.props.visualization;
    const player = this.props.timeline;
    let curPos = (player.currentTimestamp - player.startTimestamp) /
      (player.endTimestamp - player.startTimestamp);
    curPos = Math.round(curPos * 10000) / 100 + '%';
    return (
      <Box margin='xsmall' gap='xsmall' flex={false}>
        {visualData && visualData.length > 0 && 
          <div style={{ maxHeight: '150px', overflow: 'auto' }}>
          <Box flex={false} margin='xsmall'>
            {visualData.map(trackVisual => (
              <Box key={trackVisual.thingId}>
                <Text>{trackVisual.name}</Text>
                <Stack margin={{ right: '6px' }} height='8px'>
                  <Box
                    margin={{ top: '2px' }}
                    height='4px'
                    background='light-6'>
                  </Box>
                  {trackVisual.visualData && trackVisual.visualData.map(
                    (seg, i) => (
                      <Box
                        key={i}
                        height='4px'
                        margin={{ left: seg.margin, top: '2px' }}
                        width={seg.width}
                        background='green' />)
                  )}
                  <Box
                    height='8px'
                    width='4px'
                    margin={{ left: curPos }}
                    background='brand' />
                </Stack>
              </Box>
            ))}
          </Box>
        </div>}
        {player.endTimestamp - player.startTimestamp > 0 &&
          <Box direction='row' justify='between' flex={false}>
            <Box>
              <Text>{formatTime2(player.startTimestamp)}</Text>
            </Box>
            <Box>
              <Text color='brand'>{formatTime2(player.currentTimestamp)}</Text>
            </Box>
            <Box>
              <Text>{formatTime2(player.endTimestamp)}</Text>
            </Box>
          </Box>}
      </Box>
    );
  }
}