import { Box, Stack, Text } from 'grommet';
import { observer } from 'mobx-react';
import moment from 'moment';

function formatTime2(timestamp) {
  return (
    <>
      {moment(timestamp).format('YY/MM/DD')}
      <br />
      {moment(timestamp).format('HH:mm:ss')}
    </>
  );
}

const ClockItem = ({ timestamp, current }) => (
  <Box>
    <Text color={current ? 'brand' : undefined}>
      {moment(timestamp).format('YY/MM/DD')}
      <br />
      {moment(timestamp).format('HH:mm:ss')}
    </Text>
  </Box>
);

const ClockRange = observer(({ timeline }) => (
  <>
    {timeline.endTimestamp - timeline.startTimestamp > 0 &&
      <Box direction='row' justify='between' flex={false}>
        <ClockItem timestamp={timeline.startTimestamp} />
        <ClockItem timestamp={timeline.currentTimestamp} current />
        <ClockItem timestamp={timeline.endTimestamp} />
      </Box>
    }
  </>
));

function calcCurrent(timeline) {
  const curPos = (timeline.currentTimestamp - timeline.startTimestamp) /
  (timeline.endTimestamp - timeline.startTimestamp);
  return Math.round(curPos * 10000) / 100 + '%';
}

const VisualItem = observer(({ timeline, trackVisual }) => (
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
            background='brand' />)
      )}
      <Box
        height='8px'
        width='4px'
        margin={{ left: calcCurrent(timeline) }}
        background='brand' />
    </Stack>
  </Box>
));

export const TrackVisualizer = observer(({ timeline, visualization }) => (
  <Box margin='xsmall' gap='xsmall' flex={false}>
    <div style={{ maxHeight: '150px', overflow: 'auto' }}>
      <Box flex={false} margin='xsmall'>
        {visualization.map(trackVisual => <VisualItem
          trackVisual={trackVisual}
          timeline={timeline} />)}
      </Box>
    </div>
    <ClockRange timeline={timeline} />
  </Box>
));
