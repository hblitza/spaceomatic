import React, { Component } from 'react';

import {
  SimpleButton,
  MapProvider,

} from '@terrestris/react-geo';

import {map, Map} from "./components/map/map";

import { Features } from "./utilities/feature"

import {InfoWindow} from "./components/infoWindow/infowindow";

import OlInteractionTranslate from 'ol/interaction/Translate';

import './assets/App.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './assets/react-geo.css';

import GeometryUtil from "@terrestris/ol-util/dist/GeometryUtil/GeometryUtil";

import { ImageOverlay } from "./utilities/imageOverlay";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowIsHidden: true,
      intersection: false,
      intersectedFeatures: undefined
    }
  };

  saysomething () {
    this.setState({
      isInfoWindowHidden: false
    });
  };

  onCloseWindow () {
    this.setState({
      isInfoWindowHidden: !this.state.isInfoWindowHidden
    });
  };

  onIntersect (ft1, ft2) {
    const intersection = [ft1, ft2];
    this.setState({
      intersectedFeatures: intersection,
      intersection: true
    });
  };

  componentDidMount () {
    const vectorLayer = Features.createVectorLayer();
    
    map.addLayer(vectorLayer);

    // load features from geoPackage
    Features.loadGPKG(vectorLayer.getSource());
    
    // create and apply translate interaction
    const translateInteraction = new OlInteractionTranslate();
    map.addInteraction(translateInteraction);

    translateInteraction.on("translateend", (evt) => {
      const ftTranslate = evt.features.getArray()[0];
      const source = map.getLayers().getArray()[1].getSource();
      const extent = map.getView().calculateExtent(map.getSize());
      source.forEachFeatureInExtent(extent, (ft) => {
        if (ft.get("name") !== ftTranslate.get("name")) {
          try {
            // const intersect = GeometryUtil.intersection(ft.getGeometry(), ftTranslate.getGeometry());
            const intersectExtent = ftTranslate.getGeometry().intersectsExtent(ft.getGeometry().getExtent());
            if (intersectExtent) {
              console.log(ft.get("name"));
              this.onIntersect(ftTranslate, ft);
            }
          }
          catch (error) {
            console.error(error);
            return;
          }

        }
      });
    });

    translateInteraction.on("translatestart", (evt) => {
      this.setState({
        intersection: false
      });
    })

    vectorLayer.getSource().on("addfeature", function (evt) {
      const ftName = evt.feature.get("name"),
        extent = evt.feature.getGeometry().getExtent();

        ImageOverlay.createImageOverlay(ftName, extent, map);
    });

    map.on('click', (evt) => {
      debugger
    });

  }
  render() {
    return (
      <div className="App">
        <MapProvider map={map}>
          <Map />
      {this.state.intersection &&
          <InfoWindow
          infoText={this.state.infoText}
          intersectedFeatures={this.state.intersectedFeatures}
          onCloseWindow={this.onCloseWindow.bind(this)}
          />}
        </MapProvider>
      </div>
    );
  };
};

export default App;
