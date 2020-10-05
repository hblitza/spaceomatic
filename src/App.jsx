import React, { Component, useState } from 'react';

import {
  SimpleButton,
  MapProvider,

} from '@terrestris/react-geo';

import {map, Map} from "./components/map/map";

import { Features } from "./utilities/feature"

import {InfoWindow} from "./components/infoWindow/infowindow";

import './assets/App.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './assets/react-geo.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowIsHidden: false,
      infoText: "Bonn: 330.000 inh."
    }
  };

  saysomething () {
    this.setState({
      isInfoWindowHidden: false
    });
  };

  onCloseWindow() {
    this.setState({
      isInfoWindowHidden: !this.state.isInfoWindowHidden
    });
  }

  componentDidMount () {
      //on.click
    map.on('click', (evt) => {
      const ft = Features.loadGeoJSON("Bonn");

      // debugger
      
      // this.setState({
      //   isInfoWindowHidden: !this.state.isInfoWindowHidden
      // });
    });

  };

  render() {
    return (
      <div className="App">
        <MapProvider map={map}>
          <Map />

      {!this.state.isInfoWindowHidden &&
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
