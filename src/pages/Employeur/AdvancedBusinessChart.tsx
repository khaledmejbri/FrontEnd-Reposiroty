// src/components/AdvancedBusinessChart.tsx

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, Col, Row, Select } from "antd";

const data = [
  { name: "Jan", revenue: 4000, expenses: 2400 },
  { name: "Feb", revenue: 3000, expenses: 1398 },
  { name: "Mar", revenue: 2000, expenses: 9800 },
  { name: "Apr", revenue: 2780, expenses: 3908 },
  { name: "May", revenue: 1890, expenses: 4800 },
  { name: "Jun", revenue: 2390, expenses: 3800 },
  { name: "Jul", revenue: 3490, expenses: 4300 },
];

const chartTypes = {
  AREA: "Area Chart",
  COMBINATION: "Combination Chart",
};

const AdvancedBusinessChart: React.FC = () => {
  const [chartType, setChartType] = useState<string>(chartTypes.AREA);

  const renderChart = (): React.ReactElement => {
    switch (chartType) {
      case chartTypes.AREA:
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#f95454"
              fillOpacity={1}
              fill="#f95454"
            />
          </AreaChart>
        );

      case chartTypes.COMBINATION:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#82ca9d" />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ff7300"
              fill="#ff7300"
            />
          </BarChart>
        );

      default:
        return <div>No chart selected</div>; // Default case to prevent null
    }
  };

  return (
    <Row gutter={8}>
      <Col span={24}>
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
      </Card>
      </Col>
    </Row>
  );
};

export default AdvancedBusinessChart;
