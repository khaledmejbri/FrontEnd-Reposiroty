import React, { useState } from "react";
import { Table, Button, Form, Input, Row, Col, Select } from "antd";
import { render } from "@testing-library/react";
import { AppstoreAddOutlined, DeleteOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

interface Enfant {
  key: string;
  name: string;
  age: string;
  id:string
}

const Enfants: React.FC = () => {
  const [dataSource, setDataSource] = useState<Enfant[]>([]);
  const [count, setCount] = useState<number>(0);

  const handleAdd = () => {
    const newData: Enfant = {
      key: `${count}`,
      name: `Name ${count}`,
      age: `${count + 1}`,
      id:`${count+1}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleDelete = (key: string) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Niveau Scolaire",
      dataIndex: "nvsco",
      key: "nvsco",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: Enfant) => (
        <Button type="primary" onClick={() => handleDelete(record.key)} style={{backgroundColor:'#d96666'}}>
             <DeleteOutlined /> Delete
            </Button>
      )
    },
  ];

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: "default" }}
      >
        <Row>
        <Col xs={24}><Title level={4} style={{marginBottom:20,color:'#214f87'}}>Données des Enfants</Title></Col>
          <Col xs={12} md={6}>
        <Form.Item label="Nom">
          <Input placeholder="Enter name" />
        </Form.Item>
        </Col>
        <Col xs={12} md={6}>
        <Form.Item label="Age">
          <Input placeholder="Enter age" />
        </Form.Item>
        </Col>
        <Col xs={12} md={6}>
        <Form.Item label="Niveau scolaire" labelCol={{span:12}}>
        <Select>
              <Select.Option value="1_primaire">1ere année primaire</Select.Option>
            </Select>
        </Form.Item>
        </Col>
        <Col xs={12} md={6}>
            <Button type="primary" onClick={handleAdd} style={{backgroundColor:'#79ba8a',marginRight:20,float:'right'}}>
            <AppstoreAddOutlined /> Add
            </Button>
          </Col>
        </Row>
        
      </Form>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default Enfants;
