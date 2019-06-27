import React, { Component } from 'react';
import { Grommet, Box } from 'grommet';
import { ThingManagementClient } from 'location-backbone-sdk';
import { PositionStore } from 'location-backbone-store';
import { appId, authorization } from '../components/account';
import Sidebar from '../components/Sidebar';
import MapCanvas from '../components/MapCanvas';

const client = new ThingManagementClient();

export default class extends Component {
  state = new PositionStore(this.props.vehicles);

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
