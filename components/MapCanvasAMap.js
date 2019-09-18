import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { CanvasTrackMonitor } from 'location-backbone-canvas-amap';

export default observer(({ store }) => {
  const trackPlayerStore = store.trackPlayerStore.get();
  return (
    <Box flex={{ grow: 1, shrink: 1 }}>
      <CanvasTrackMonitor
        mapKey='99c0746b70009d496380367b4f8f8494'
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