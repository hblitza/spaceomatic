import React, { Component } from 'react';
import {
  Window,
  SimpleButton
} from '@terrestris/react-geo';

export class InfoWindow extends Component {
render() {
  return(
    <div>
          <Window 
            parentId="root"
            title="This is the window title"
            width={300}
            height={150}
            collapsible={false}
            x={(window.innerWidth - 350) / 2}
            y={30}
            style={{
              position: 'fixed',
              boxShadow: '5px 5px 5px 0px #888888'
            }}
            resizeOpts={false}
            >
            {this.props.infoText}
          </Window>
    </div>
    )
  };
};
