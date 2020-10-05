import React, { Component, useState } from 'react';

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
      infoText: "Bonn: 330.000 inh.",
      cities: ["Bonn", "Cologne", "Kiel", "Elba"],
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
    
    this.state.cities.forEach((ft) => {
      Features.loadGeoJSON(ft, vectorLayer.getSource());
    });
    
    const translateInteraction = new OlInteractionTranslate();
    map.addInteraction(translateInteraction);

    translateInteraction.on("translateend", (evt) => {
      const ftTranslate = evt.features.getArray()[0];
      const source = map.getLayers().getArray()[1].getSource();
      const extent = map.getView().calculateExtent(map.getSize());
      source.forEachFeatureInExtent(extent, (ft) => {
        // debugger
        if (ft.get("name") !== ftTranslate.get("name")) {
          try {
            const intersect = GeometryUtil.intersection(ft.getGeometry(), ftTranslate.getGeometry());
            if (intersect) {
              console.log(ft.get("name"));
              this.onIntersect(ftTranslate.get("name"), ft.get("name"));
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

        ImageOverlay.createImageOverlay(ftName, extent);

        // debugger

        // img.getSource().on("imageloadstart", function (evt) {
        //   debugger
        // });
      
    });

    // map.on('click', (evt) => 
      

    //   debugger
      
    //   // this.setState({
    //   //   isInfoWindowHidden: !this.state.isInfoWindowHidden
    //   // });
    // });

  };

  render() {
    return (
      <div className="App">
        <MapProvider map={map}>
          <Map />

      {this.state.intersection &&
          <InfoWindow
          infoText={this.state.infoText}
          onCloseWindow={this.onCloseWindow.bind(this)}
          />}
  

        </MapProvider>
      </div>
    );
  };

};

export default App;
