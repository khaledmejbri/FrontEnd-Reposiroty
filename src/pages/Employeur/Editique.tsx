/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Col, Tabs, Upload, Input, Row, Select,  } from "antd";
import { AppstoreAddOutlined, DeleteOutlined, UploadOutlined,  } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import Title from "antd/es/typography/Title";
import Editor from '@monaco-editor/react';
import templatedata from "../../data/template";

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
  const [value, setValue] = useState<undefined | any>('no code');
  const template = templatedata
   

  useEffect(() => {
    setValue(template)
    
  }, [template]);
  console.log({value,templatedata})
  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        layout="horizontal"
        initialValues={{ size: "default" }}
      >
        
       
           
  
        <Row>
        <Col xs={24}><Title level={4} style={{marginBottom:20,color:'#214f87'}}>Liste des templates</Title></Col>
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
      
        
      </Form>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ marginTop: 20 }}
      />
        <Tabs>
                <TabPane
                  tab="editor" 
                  key="1"
                  style={{ padding: '15px 1px' }}
                >
                   <Editor
                          height="800px"
                          defaultLanguage="html"
                          theme="vs-dark"
                          value={value}
                          onChange={(val:any) => setValue(val)}
                        />
                </TabPane>
                <TabPane tab="preview" key="2">
                 
                  <iframe
                    name="my_iframe"
                    srcDoc={value}
                    width="100%"
                    height="800px"
                    style={{ border: '1px solid #E3E3E3' }}
                  ></iframe>
                </TabPane>
                </Tabs>
      
                       
                      
    </>
  );
};

export default Document;
