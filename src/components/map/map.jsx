import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';
import OlLayerGroup from 'ol/layer/Group';

import {
  MapComponent,
  mappify,
  onDropAware
} from '@terrestris/react-geo';

export const Map = mappify(onDropAware(MapComponent));

const layerGroup = new OlLayerGroup({
  name: 'Layergroup',
  layers: [
    new OlLayerTile({
      source: new OlSourceOsm(),
      name: 'OSM'
    })
  ]
});

const center = [ 788453.4890155146, 6573085.729161344 ];

export const map = new OlMap({
  view: new OlView({
    center: center,
    zoom: 16,
  }),
  layers: [layerGroup]
});
