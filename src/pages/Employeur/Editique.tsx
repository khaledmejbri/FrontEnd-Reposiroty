/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import { Table, Button, Form, Col, Tabs, Upload, Input, Row, Select } from "antd";
import { AppstoreAddOutlined, DeleteOutlined, UploadOutlined, SaveOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import Title from "antd/es/typography/Title";
import Editor from '@monaco-editor/react';
import templatesData from "../../data/TemplateEntity.json"; // Import JSON data

// Define interface for Template
interface TemplateEntity {
  reference: string;
  htmlContent: string;
  lancode: string;
}

const Document: React.FC = () => {
  const [dataSource, setDataSource] = useState<TemplateEntity[]>(templatesData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateEntity | null>(null);
  const [filterType, setFilterType] = useState<string>("cv"); // Default to "cv" section

  // Filter templates based on filterType
  const filteredDataSource = dataSource.filter((template) => {
    if (filterType === "cv") {
      return template.reference.toLowerCase().includes("cv");
    } else if (filterType === "contrat") {
      return template.reference.toLowerCase().includes("contrat");
    }
    return true;
  });

  const handleAdd = () => {
    const newTemplate: TemplateEntity = {
      reference: `Template ${dataSource.length + 1}`,
      htmlContent: "<html><body><h1>New Template</h1><p>Sample content</p></body></html>",
      lancode: "EN"
    };
    setDataSource([...dataSource, newTemplate]);
    setSelectedTemplate(newTemplate); // Automatically select the new template for editing
  };

  const handleDelete = (reference: string) => {
    const updatedData = dataSource.filter((template) => template.reference !== reference);
    setDataSource(updatedData);
    if (selectedTemplate?.reference === reference) {
      setSelectedTemplate(null);
    }
  };

  const handleTemplateSelect = (reference: string) => {
    const template = dataSource.find((item) => item.reference === reference);
    setSelectedTemplate(template || null);
  };

  return (
    <>
      <Form labelCol={{ span: 8 }} layout="horizontal">
        <Row>
          <Col xs={24}>
            <Title level={4} style={{ marginBottom: 20, color: '#214f87' }}>Liste des templates</Title>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item label="Filter Type">
              <Select value={filterType} onChange={(value) => setFilterType(value)}>
                <Select.Option value="cv">CV</Select.Option>
                <Select.Option value="contrat">Contrat</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} md={2}>
            <Button type="primary" onClick={handleAdd} style={{ backgroundColor: '#79ba8a', float: 'right' }}>
              <AppstoreAddOutlined /> Add
            </Button>
          </Col>
        </Row>
      </Form>

      <Table
        dataSource={filteredDataSource.map((template, index) => ({
          key: index.toString(),
          reference: template.reference,
          lancode: template.lancode
        }))}
        columns={[
          { title: "Reference", dataIndex: "reference", key: "reference" },
          { title: "Language Code", dataIndex: "lancode", key: "lancode" },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <>
                <Button onClick={() => handleTemplateSelect(record.reference)} style={{ marginRight: 8 }}>Edit</Button>
                <Button type="primary" onClick={() => handleDelete(record.reference)} style={{ backgroundColor: '#d96666' }}>
                  <DeleteOutlined /> Delete
                </Button>
              </>
            )
          }
        ]}
        pagination={false}
        style={{ marginTop: 20 }}
      />

      <Tabs>
        <TabPane tab="Editor" key="1" style={{ padding: '15px 1px' }}>
          <Editor
            height="800px"
            defaultLanguage="html"
            theme="vs-dark"
            value={selectedTemplate?.htmlContent || ""}
            onChange={(val) => setSelectedTemplate(prev => prev ? { ...prev, htmlContent: val || "" } : null)}
          />
        </TabPane>
        <TabPane tab="Preview" key="2">
          <iframe
            name="my_iframe"
            srcDoc={selectedTemplate?.htmlContent || "<p>No content to display</p>"}
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
