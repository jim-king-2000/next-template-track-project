import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { CanvasContainer } from 'location-backbone-canvas';
import { CanvasTracks } from './CanvasTracks';

export default observer(({ store }) => (
  <Box flex={{ grow: 1, shrink: 1 }}>
    <CanvasContainer mapkey='99c0746b70009d496380367b4f8f8494'>
      <CanvasTracks tracks={store.tracks.value} />
    </CanvasContainer>
  </Box>
));