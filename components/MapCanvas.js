import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { CanvasContainer, CanvasTracks } from 'location-backbone-canvas';

export default observer(({ store }) => {
  console.log(store.trackPlayerStore.get().playerTimeline)
  return (
    <Box flex={{ grow: 1, shrink: 1 }}>
      <CanvasContainer mapkey='99c0746b70009d496380367b4f8f8494'>
        <CanvasTracks tracks={store.tracks.get()} />
      </CanvasContainer>
    </Box>
  );
});