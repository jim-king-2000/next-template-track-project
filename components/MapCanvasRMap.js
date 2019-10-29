import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { CanvasTrackMonitor } from 'location-backbone-canvas-react-map';

export default observer(({ store, mapKey, mapVendor }) => {
  const trackPlayerStore = store.trackPlayerStore.get();
  return (
    <Box flex={{ grow: 1, shrink: 1 }}>
      <CanvasTrackMonitor
        mapKey={mapKey}
        mapVendor={mapVendor}
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