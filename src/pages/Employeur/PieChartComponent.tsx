// src/components/PieChartComponent.tsx

import React from 'react';
import Chart from 'react-apexcharts';
import { Row, Col, Card } from 'antd';
import { ApexOptions } from 'apexcharts';

const PieChartComponent: React.FC = () => {
  const data = {
    series: [400, 300, 300, 200],
    labels: ['Group A', 'Group B', 'Group C', 'Group D'],
  };

  const options: ApexOptions = {
    chart: {
      type: 'donut', // Ensure this is 'donut' or 'pie'
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    labels: data.labels,
    legend: {
      show: true,
      position: 'bottom',
      formatter: (val: string, opts: { w: { globals: { series: number[] }; seriesIndex: number } }) => {
        // Casting opts to any to access seriesIndex
        return `${val} (${opts.w.globals.series[opts.w.seriesIndex]})`;
      },
    },
    plotOptions: {
      pie: {
        customScale: 1,
        dataLabels: {
          offset: -10,
        },
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              fontSize: '20px',
              fontWeight: 'bold',
            },
            value: {
              fontSize: '16px',
              color: '#fff',
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <Row gutter={8}>
      <Col span={24}>
        <Card>
          <Chart options={options} series={data.series} type="donut" height={300} />
        </Card>
      </Col>
    </Row>
  );
};

export default PieChartComponent;
