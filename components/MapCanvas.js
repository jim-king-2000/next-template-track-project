import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { LinkUp } from 'grommet-icons';
import moment from 'moment';
import { CanvasTrackMonitor } from 'location-backbone-canvas';

const template = [{
  label: '时间',
  property: 'timestamp',
  transform: ts => ts && moment(ts).format('YYYY-MM-DD HH:mm:ss')
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
  transform: v => typeof v === 'number' && v.toFixed(6)
}, {
  label: '纬度',
  property: 'latitude',
  transform: v => typeof v === 'number' && v.toFixed(6)
}, {
  label: '速度',
  property: 'speed',
  transform: v => typeof v === 'number' && `${(v * 3.6).toFixed(2)}km/h`
}, {
  label: '高度',
  property: 'altitude',
  transform: v => typeof v === 'number' && `${v.toFixed(2)}m`
}, {
  label: '精度',
  property: 'accuracy',
  transform: v => typeof v === 'number' && `${v.toFixed(2)}m`
}, {
  label: '方向',
  property: 'heading',
  transform: v => typeof v === 'number' &&
    <LinkUp style={{ transform: `rotate(${v}deg)` }} />
}, {
  label: '光线',
  property: 'light',
  transform: v => typeof v === 'number' && v
}, {
  label: '温度',
  property: 'temp',
  transform: v => typeof v === 'number' && `${v}\u2103`
}, {
  label: '湿度',
  property: 'humidity',
  transform: v => typeof v === 'number' && `${v}%`
}];

export default observer(({ store }) => {
  const trackPlayerStore = store.trackPlayerStore.get();
  return (
    <Box flex={{ grow: 1, shrink: 1 }}>
      <CanvasTrackMonitor
        mapKey='99c0746b70009d496380367b4f8f8494'
        positions={trackPlayerStore.things}
        tracks={store.tracks.get()}
        selectedThing={trackPlayerStore.selectedVehicle}
        selectThingId={thingId => trackPlayerStore.selectedThingId = thingId}
        propertyTemplate={template}
      />
    </Box>
  )}
);