import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';
import OlLayerGroup from 'ol/layer/Group';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';


import {
  MapComponent,
  mappify,
  onDropAware
} from '@terrestris/react-geo';


proj4.defs("EPSG:3035","+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

register(proj4);

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
    center: [4310960,3089478],
    zoom: 8,
    projection: "EPSG:3035",
    extent: [2500000, 1500000, 6000000, 5500000]
  }),
  layers: [layerGroup]
});
