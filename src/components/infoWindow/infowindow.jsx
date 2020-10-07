import React, { Component } from 'react';
import {
  Window
} from '@terrestris/react-geo';
import { PieChart } from 'react-minimal-pie-chart';
import { Row, Col } from 'antd';

export class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaFactor: undefined
    }
  };

render() {

  // check order
  if (this.props.intersectedFeatures[1].get("area") > this.props.intersectedFeatures[0].get("area")) {
    this.props.intersectedFeatures.reverse();
  }


  return(
    <div>
          <Window 
            parentId="root"
            title={this.props.intersectedFeatures[0].get("name") + " vs. " + this.props.intersectedFeatures[1].get("name")}
            width={300}
            height={"auto"}
            collapsible={false}
            x={(window.innerWidth - 350) / 2}
            y={30}
            style={{
              position: 'fixed',
              boxShadow: '5px 5px 5px 0px #888888'
            }}
            resizeOpts={false}
            >
            <Row 
              style={{
                textAlign: 'center',
                fontWeight: '500'

            }}>
            <Col span={8}>
            {this.props.intersectedFeatures[0].get("name")}
            </Col>
            <Col
              span={8}
              style={{
                fontSize: '11px'
              }}
              >
            
            {"is " + (this.props.intersectedFeatures[0].get("area") / this.props.intersectedFeatures[1].get("area")).toFixed(2) + " times the size of"}
            </Col>
            <Col span={8}>
            {this.props.intersectedFeatures[1].get("name")}
            </Col>
            </Row>
            <Row 
            >
            <Col span={12}
              style={{
                padding: '10px'
            }}>
              <PieChart
                  data={[
                    { title: 'Open land', value: this.props.intersectedFeatures[0].get("openLand"), color: '#9FD872' },
                    { title: 'Built-Up', value: this.props.intersectedFeatures[0].get("builtUp"), color: '#FF2D20' },
                    { title: 'Water', value: this.props.intersectedFeatures[0].get("water"), color: '#74B6E6' },
                  ]}
                  animate={true}
              />
            </Col>
            <Col span={12}
              style={{
                padding: '10px'
            }}>
              <PieChart
                  data={[
                    { title: 'Open land', value: this.props.intersectedFeatures[1].get("openLand"), color: '#9FD872' },
                    { title: 'Built-Up', value: this.props.intersectedFeatures[1].get("builtUp"), color: '#FF2D20' },
                    { title: 'Water', value: this.props.intersectedFeatures[1].get("water"), color: '#74B6E6' },
                  ]}
                  animate={true}
              />
            </Col>
            </Row>
            <Row 
            >
            <Col span={3}
              style={{
                padding: '10px',
                fontWeight: '500'
            }}>
              Pop.
            </Col>
            <Col span={10}
              style={{
                padding: '10px'
            }}>
              {this.props.intersectedFeatures[0].get("pop")}
            </Col>
            <Col span={10}
              style={{
                padding: '10px',
                textAlign: 'center'
            }}>
              {this.props.intersectedFeatures[1].get("pop")}
            </Col>
            </Row>
            <Row 
            >
            <Col span={3}
              style={{
                padding: '10px',
                fontWeight: '500'
            }}>
              Area
            </Col>
            <Col span={10}
              style={{
                padding: '10px',
            }}>
              {this.props.intersectedFeatures[0].get("area") + " km²"}
            </Col>
            <Col span={10}
              style={{
                padding: '10px',
                textAlign: 'center'
            }}>
              {this.props.intersectedFeatures[1].get("area") + " km²"}
            </Col>
            </Row>
          </Window>
    </div>
    )
  };
};
