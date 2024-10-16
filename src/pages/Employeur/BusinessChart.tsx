// src/pages/WelcomePage.tsx

import React from 'react';
import AdvancedBusinessChart from './AdvancedBusinessChart';
import BarHistogram from './BarHistogram';
import { Col, Row } from 'antd';
import PieChartComponent from './PieChartComponent';

const WelcomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <Row>
     
        <Col span={12}>
      <AdvancedBusinessChart />
      <BarHistogram /> 
      </Col>
      <Col span={12}>
      <PieChartComponent />
      </Col>
    
      </Row>
    </div>
  );
};

export default WelcomePage;
