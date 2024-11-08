// src/components/BarHistogram.tsx

import { Row, Col, Card } from 'antd';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data for the histogram
const data = [
  { name: 'Category A', value: 4000 },
  { name: 'Category B', value: 3000 },
  { name: 'Category C', value: 2000 },
  { name: 'Category D', value: 2780 },
  { name: 'Category E', value: 1890 },
  { name: 'Category F', value: 2390 },
  { name: 'Category G', value: 3490 },
];

const BarHistogram: React.FC = () => {
  return (
    <Row gutter={8}>
      <Col span={24}>
      <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
   </Card>
   </Col></Row>
  );
};

export default BarHistogram;
