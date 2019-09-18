import React, { Component } from 'react';
import { Grommet, Box } from 'grommet';
import { ThingManagementClient } from 'location-backbone-sdk';
import { TrackStore, TrackPlayerStore } from 'location-backbone-store';
import { appId, authorization } from '../components/account';
import Sidebar from '../components/Sidebar';
import dynamic from 'next/dynamic';

const MapCanvas = dynamic(
  () => import('../components/MapCanvasAMap'),
  { ssr: false }
);
const client = new ThingManagementClient();

export default class extends Component {
  state = new TrackStore(this.props.vehicles, [{
    name: 'trackPlayerStore',
    type: TrackPlayerStore
  }]);

  static async getInitialProps() {
    const resp = await client.listThing({ appId, authorization });
    const vehicles = await resp.json();
    return { vehicles };
  }

  render = () => (
    <Grommet full plain>
      <Box fill direction='row'>
        <Sidebar store={this.state} />
        <MapCanvas store={this.state} />
      </Box>
    </Grommet>
  );
}
