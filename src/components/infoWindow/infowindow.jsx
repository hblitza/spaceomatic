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
            x={(window.innerWidth / 2 - 150) / 2}
            y={(window.innerHeight / 2 - 75) / 2}
            style={{
              position: 'fixed',
              boxShadow: '5px 5px 5px 0px #888888'
            }}
            resizeOpts={false}
            tools={[
              <SimpleButton
                key="closeButton"
                iconName="close"
                size="small"
                tooltip="Close"
                onClick={this.props.onCloseWindow}
              />
            ]}
            >
            {this.props.infoText}
          </Window>
    </div>
    )
  };
};
