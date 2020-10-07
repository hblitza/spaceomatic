import React, { Component } from 'react';

import {
  SimpleButton,
  MapProvider,
  Titlebar

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

import { Game } from "./utilities/game";

import ImageLayer from 'ol/layer/Image';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowIsHidden: true,
      intersection: false,
      intersectedFeatures: undefined,
      gameMode: false,
      switchModeBtnIconName: "fas fa-wpexplorer fa-3x",
      modeTitle: "Explorer mode",
      originalFeatures: []
    }
  };

  switchMode () {
    if (!this.state.gameMode) {
      this.setState({
        gameMode: true,
        switchModeBtnIconName: "fas fa-gamepad fa-3x",
        modeTitle: "Game mode"
      });
      Game.shuffleFeatures(this.vectorLayer.getSource().getFeatures());
    }
    else {
      this.setState({
        gameMode: false,
        switchModeBtnIconName: "fas fa-wpexplorer fa-3x",
        modeTitle: "Explorer mode"
      });
      this.vectorLayerSource.clear();
      this.map.getLayerGroup().getLayersArray().forEach( function (layer) {
        if (layer instanceof ImageLayer) {
          this.map.removeLayer(layer);
        }
      }.bind(this))
      // debugger
      this.state.originalFeatures.forEach(function (ft) {
        this.vectorLayerSource.addFeature(ft.clone());
      }.bind(this));
    }
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
    this.map = map;
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

    this.vectorLayer = vectorLayer;
    this.vectorLayerSource = vectorLayer.getSource();

    this.vectorLayerSource.on("addfeature", function (evt) {
      const ftName = evt.feature.get("name"),
        extent = evt.feature.getGeometry().getExtent(),
        ftClone = evt.feature.clone(),
          originalFeatures = this.state.originalFeatures;

          if (originalFeatures.some(e => e.get("name") === ftName)) {
            return;
          }

        originalFeatures.push(ftClone);
    
        this.setState({
          originalFeatures: originalFeatures
        });

        ImageOverlay.createImageOverlay(ftName, extent, map);
    }.bind(this));

  // debugger

    map.on('click', (evt) => {
      // debugger
    });

    
  }
  render() {
        if (this.state.gameMode) {
          // console.log(this.vectorLayer);
          // debugger
          
        }
    return (
      <div className="App">
        <MapProvider map={map}>
        <Titlebar
          className="titlebar"
          tools={[
            <SimpleButton
            className={"btn-toggleMode"}
            onClick={this.switchMode.bind(this)}
            iconName={this.state.switchModeBtnIconName}
            tooltip="Switch mode"
            size="small"
          >
          </SimpleButton>
          ]}
        >
{this.state.modeTitle}
        </Titlebar>
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
