import React, { Component } from 'react';
import { Polyline } from 'react-amap';

export class CanvasTracks extends Component {
  render() {
    const tracks = this.props.tracks;
    const __map__ = this.props.__map__;
    return (
      <>
        {tracks && tracks.map(track => {
          let path = track.splittedTrack || [];
          if (!Array.isArray(path) || !Array.isArray(path[0])) {
            path = [path];
          }
          return path.map((pathItem, i) => <Polyline
            __map__={__map__}
            key={`${track.thingId}-${i}`}
            path={pathItem}
            events={{ created: () => __map__.setFitView() }} />);
        })}
      </>
    );
  }
}