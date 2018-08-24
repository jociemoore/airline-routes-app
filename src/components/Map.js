import React, { Component } from 'react';

class Map extends Component {
  render() {
    const routes = this.props.routes.map((route) => {
      let x1 = route.srcCoordinates[1];
      let y1 = route.srcCoordinates[0];
      let x2 = route.destCoordinates[1];
      let y2 = route.destCoordinates[0];

      return <g key={`maproute-${route.airline}-${route.src}-${route.dest}`}>
        <circle className="source" cx={x1} cy={y1}>
          <title>{route.src}</title>
        </circle>
        <circle className="destination" cx={x2} cy={y2}>
          <title>{route.dest}</title>
        </circle>
        <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
      </g>
    });

    return (
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
          {routes}
        </g>
      </svg>
    );
  }
}

export default Map;
