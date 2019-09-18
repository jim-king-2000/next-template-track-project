import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { CanvasTrackMonitor } from 'location-backbone-canvas-bmap';

export default observer(({ store }) => {
  const trackPlayerStore = store.trackPlayerStore.get();
  return (
    <Box flex={{ grow: 1, shrink: 1 }}>
      <CanvasTrackMonitor
        setFitView={!!store.setFitView}
        onUpdateEnd={() => store.tracks.busy || (store.setFitView = false)}
        positions={trackPlayerStore.things}
        tracks={store.tracks.get()}
        selectedThing={trackPlayerStore.selectedVehicle}
        selectThingId={thingId => trackPlayerStore.selectedThingId = thingId}
      />
    </Box>
  )}
);