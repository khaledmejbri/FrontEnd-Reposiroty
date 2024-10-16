import React, { useEffect, useState } from "react";
import { Table, Button, Form, Col, Row, Select, DatePicker } from "antd";
import { ClearOutlined, CopyOutlined, SearchOutlined,  } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import moment from "moment";
import templatedata from "../../data/mesConge.json";
import Card from "antd/es/card/Card";
import { CSVLink } from 'react-csv';

interface MesPresence {
  key: string;
  reference: string;
  status: string; // "Valid" or "NonValid"
  startDate: string;
}

const MesPresences: React.FC = () => {
  const [dataSource, setDataSource] = useState<MesPresence[]>([]);

  const [filters, setFilters] = useState({
    reference: "",
    status: "",
    startDate: null as string | null,
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
    {
      title: "Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
  
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusLabels: { [key: string]: string } = {
          Valide: "Validé",
          NonValide: "Non Validé",
          EnCours: "En Cours",
        };
        return <span style={{ color: status === "Valide" ? "green" : status === "EnCours" ? "orange" : "red" }}>{statusLabels[status] || status}</span>;
      },
    },
   
   
  ];

  const handleSearch = () => {
    const filteredData = templatedata
      .map((presence, index) => ({
        ...presence,
        key: `presence-${index}`, // Ensure the 'key' is included
      }))
      .filter((presence) => {
        const matchReference =
          !filters.reference || presence.reference.includes(filters.reference);
        const matchStatus = !filters.status || presence.status === filters.status;
        const matchStartDate =
          !filters.startDate ||
          moment(presence.startDate).isSameOrAfter(moment(filters.startDate));
        return (
          matchReference &&
          matchStatus &&
          matchStartDate 
        );
      });
    setDataSource(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({
      reference: "",
      status: "",
      startDate: null,
    });
    // Optionally, reset the filtered data source to the full unfiltered list
    const dataWithKeys = templatedata.map((presence, index) => ({
      ...presence,
      key: `presence-${index}`, // Generate a unique key
    }));
    setDataSource(dataWithKeys);
  };

  const csvHeaders = [
    { label: "Reference", key: "reference" },
    { label: "Status", key: "status" },
    { label: "Start Date", key: "startDate" },
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
                  value={filters.status}
                  onChange={(value) => setFilters({ ...filters, status: value })}
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
                  value={filters.startDate ? moment(filters.startDate) : null}
                  onChange={(date) =>
                    setFilters({
                      ...filters,
                      startDate: date ? date.format("YYYY-MM-DD") : null,
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
