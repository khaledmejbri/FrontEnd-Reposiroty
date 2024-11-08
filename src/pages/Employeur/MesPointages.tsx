import React, { useEffect, useState } from "react";
import { Table, Button, Form, Col, Row, Select, DatePicker } from "antd";
import { ClearOutlined, CopyOutlined, SearchOutlined,  } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import moment from "moment";
import templatedata from "../../data/Pointage.json";
import Card from "antd/es/card/Card";
import { CSVLink } from 'react-csv';

interface MesPresence {
  name:string;
  employeeId: number;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  totalHours: number | null;
  isAbsent: boolean; 
  overtimeHours: null,
  breakMinutes: null,
  shiftType: string,
  location: string,
  isRemote: boolean,
  deviceId: null,
  isLate: boolean,
  remarks: string
}

const MesPresences: React.FC = () => {
  const [dataSource, setDataSource] = useState<MesPresence[]>([]);

  const [filters, setFilters] = useState({
    name:"",
  employeeId: 0,
  date: "",
  checkInTime: "",
  checkOutTime:"",
  totalHours:0,
  isAbsent: false,
  overtimeHours: null,
  breakMinutes: null,
  shiftType: "",
  location: "",
  isRemote: false,
  deviceId: null,
  isLate: false,
  remarks: ""
  });

  useEffect(() => {
    // Initialize the data with keys
    const dataWithKeys = templatedata.map((presence, index) => ({
      ...presence,
      key: `presence-${index}`, // Generate a unique key
    }));
    setDataSource(dataWithKeys);
  }, []);

 

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Check In Time", dataIndex: "checkInTime", key: "checkInTime" },
    { title: "Check Out Time", dataIndex: "checkOutTime", key: "checkOutTime" },
    { title: "Total Hours", dataIndex: "totalHours", key: "totalHours" },
    { title: "Late", dataIndex: "isLate", key: "isLate", 
      render: (isLate: boolean) => (
        <span style={{ color: isLate ? "red" : "green" }}>
          {isLate ? "Yes" : "No"}
        </span>
      ),
    },
  ];
  

  const handleSearch = () => {
    const filteredData = templatedata
      .map((presence, index) => ({
        ...presence,
        key: `presence-${index}`, // Ensure the 'key' is included
      }))
      .filter((presence) => {
       
        const matchStartDate =
          !filters.date ||
          moment(presence.date).isSameOrAfter(moment(filters.date));
        return (
          matchStartDate 
        );
      });
    setDataSource(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({
      name:"",
  employeeId: 0,
  date: "",
  checkInTime: "",
  checkOutTime:"",
  totalHours:0,
  isAbsent: false,
  overtimeHours: null,
  breakMinutes: null,
  shiftType: "",
  location: "",
  isRemote: false,
  deviceId: null,
  isLate: false,
  remarks: ""
    });
    // Optionally, reset the filtered data source to the full unfiltered list
    const dataWithKeys = templatedata.map((presence, index) => ({
      ...presence,
      key: `presence-${index}`, // Generate a unique key
    }));
    setDataSource(dataWithKeys);
  };

  const csvHeaders = [
    { label: "date", key: "date" },
    { label: "checkInTime", key: "checkInTime" },
    { label: "checkOutTime", key: "checkOutTime" },
    { label: "totalHours", key: "totalHours" },
    { label: " isAbsent", key: "isAbsent" },

  ];

  return (
    <>
      <Card>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          initialValues={{ size: "default" }}
        >
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 20, color: "#214f87" }}>
                Ma Liste des Présences
              </Title>
            </Col>

            <Col xs={12} md={4}>
              <Form.Item label="Status">
                <Select
                  value={filters.date}
                  onChange={(value) => setFilters({ ...filters, date: value })}
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Ok">Accepter</Select.Option>
                  <Select.Option value="Ref">Refusé</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={12} md={4}>
              <Form.Item label="De">
                <DatePicker
                  required
                  style={{ width: "100%" }}
                  value={filters.date ? moment(filters.date) : null}
                  onChange={(date) =>
                    setFilters({
                      ...filters,
                      date:date.format("YYYY-MM-DD") ,
                    })
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={10}>
              <CSVLink
                data={dataSource}
                headers={csvHeaders}
                filename={"mes_presences.csv"}
              >
                <Button 
                  type="primary"  
                  style={{ backgroundColor: '#79ba8a', marginRight: 20, float: 'right' }}
                >
                  <CopyOutlined />
                  Extract Data
                </Button>
              </CSVLink>
              <Button
                type="primary"
                onClick={handleSearch}
                style={{
                  backgroundColor: "#6195d4",
                  marginRight: 20,
                  float: 'right',
                }}
              >
                <SearchOutlined /> Recherche
              </Button>
              <Button
                type="default"
                onClick={handleClearFilters}
                style={{
                  backgroundColor: "orange", marginRight: 20, float: 'right'
                }}
              >
                <ClearOutlined /> Clear
              </Button>
            </Col>

          </Row>
        </Form>
      </Card>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ marginTop: 20 }}
      />
      
    </>
  );
};

export default MesPresences;
