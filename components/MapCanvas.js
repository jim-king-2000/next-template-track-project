import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { LinkUp } from 'grommet-icons';
import moment from 'moment';
import { CanvasContainer, CanvasTracks, CanvasPluginZoom, CanvasReactor, 
  CanvasPositions, CanvasInformation } from 'location-backbone-canvas';

const template = [{
  label: '时间',
  property: 'timestamp',
  transform: ts => moment(ts).format('YYYY-MM-DD HH:mm:ss')
}, {
  label: '名称',
  property: 'thingName'
}, {
  label: '状态',
  property: 'isOnline',
  transform: isOnline => isOnline ? '在线' : '离线'
}, {
  label: '经度',
  property: 'longitude',
  transform: v => v && v.toFixed(6)
}, {
  label: '纬度',
  property: 'latitude',
  transform: v => v && v.toFixed(6)
}, {
  label: '速度',
  property: 'speed',
  transform: v => `${v && (v * 3.6).toFixed(2)}km/h`
}, {
  label: '高度',
  property: 'altitude',
  transform: v => `${v && v.toFixed(2)}m`
}, {
  label: '精度',
  property: 'accuracy',
  transform: v => `${v && v.toFixed(2)}m`
}, {
  label: '方向',
  property: 'heading',
  transform: v => <LinkUp style={{ transform: `rotate(${v}deg)` }} />
}, {
  label: '光线',
  property: 'light'
}, {
  label: '温度',
  property: 'temp',
  transform: v => `${v}\u2103`
}];

export default observer(({ store }) => {
  const trackPlayerStore = store.trackPlayerStore.get();
  return (
    <Box flex={{ grow: 1, shrink: 1 }}>
      <CanvasContainer mapkey='99c0746b70009d496380367b4f8f8494'
        events={{
          created: ins => ins.setFeatures(['bg', 'road'])
        }}
      >
        <CanvasTracks tracks={store.tracks.get()} />
        <CanvasPositions
          things={trackPlayerStore.things}
          events={{
            click: e =>
              trackPlayerStore.selectedThingId = e.target.getExtData().thingId
          }} />
        <CanvasInformation
          onClose={() => trackPlayerStore.selectedThingId = undefined}
          data={trackPlayerStore.selectedVehicle}
          template={template}
        />
        <CanvasPluginZoom
          direction='row'
          style={{
            position: 'absolute',
            top: 0
          }}
          tracingMode={store.tracingMode}
          onChange={e => store.tracingMode = e.target.checked} />
        <CanvasReactor
          markers={trackPlayerStore.things}
          tracingMode={store.tracingMode} />
      </CanvasContainer>
    </Box>
  )}
);