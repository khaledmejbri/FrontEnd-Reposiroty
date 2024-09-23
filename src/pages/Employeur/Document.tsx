import React, { useState } from "react";
import { Table, Button, Form, Col, Tabs, Avatar, Upload, Input, Row, Select } from "antd";
import { AppstoreAddOutlined, DeleteOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import Title from "antd/es/typography/Title";
import Editique from "./Editique";

interface Enfant {
  key: string;
  name: string;
  age: string;
  id:string
}

const Document: React.FC = () => {
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
      title: "Reference",
      dataIndex: "Reference",
      key: "Reference",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "type",
      
    },
    {
      title: "Path",
      dataIndex: "Path",
      key: "Path",
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
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        layout="horizontal"
        initialValues={{ size: "default" }}
      >
        
        <Tabs
        defaultActiveKey="1"
        style={{ width: "100%" }}
      >
        <TabPane tab="Piece a joint " key={1}>
           
  
        <Row>
        <Col xs={24}><Title level={4} style={{marginBottom:20,color:'#214f87'}}>Pièce a joint</Title></Col>
          <Col xs={12} md={6}>
        <Form.Item label="Reference">
          <Input placeholder="Enter Reference" />
        </Form.Item>
        </Col>
        <Col xs={12} md={4}>
        <Form.Item label="Type">
            <Select>
              <Select.Option value="PDF">PDF</Select.Option>
              <Select.Option value="IMG">IMG</Select.Option>
            </Select>
          </Form.Item>
       
        </Col>
       
        
          <Col xs={12} md={4}>
        <Form.Item
      name="upload"
      label="Upload"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      extra=""
    >
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}/>
      </Upload>
    </Form.Item>
    </Col>
    <Col xs={12} md={2}>
            <Button type="primary" onClick={handleAdd} style={{backgroundColor:'#79ba8a',marginRight:20,float:'right'}}>
            <AppstoreAddOutlined /> Add
            </Button>
          </Col>
    </Row>
    <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ marginTop: 20 }}
      />
        </TabPane>
        <TabPane tab="Edite Template" key={2} >
        <Editique/>
        </TabPane>
      </Tabs>
      
        
      </Form>
    
    </>
  );
};

export default Document;
