import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { CanvasContainer, CanvasTracks,
  CanvasPositions } from 'location-backbone-canvas';

export default observer(({ store }) => {
  // console.log(store.trackPlayerStore.get().playerTimeline)
  const things = store.trackPlayerStore.get().things;
  return (
    <Box flex={{ grow: 1, shrink: 1 }}>
      <CanvasContainer mapkey='99c0746b70009d496380367b4f8f8494'>
        <CanvasTracks tracks={store.tracks.get()} />
        <CanvasPositions things={things} />
      </CanvasContainer>
    </Box>
  );
});