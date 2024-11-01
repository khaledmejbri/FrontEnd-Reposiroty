// src/pages/WelcomePage.tsx

import React from 'react';
import AdvancedBusinessChart from './AdvancedBusinessChart';
import BarHistogram from './BarHistogram';
import { Col, Row } from 'antd';
import PieChartComponent from './PieChartComponent';

const WelcomePage: React.FC = () => {
  return (
    <div  typeof='container'>
      <h1>Welcome to the Dashboard</h1>
      <Row gutter={8}>
     
        <Col span={8}>
      <AdvancedBusinessChart />
      </Col>
      <Col span={8}>
      <BarHistogram /> 
      </Col>
      <Col span={8}>
      <PieChartComponent />
      </Col>
    
      </Row>
    </div>
  );
};

export default WelcomePage;
