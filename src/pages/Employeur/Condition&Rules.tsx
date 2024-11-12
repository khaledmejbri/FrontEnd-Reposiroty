import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Input,
  Switch,
  Modal,
} from "antd";
import {
  ClearOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import templatedata from "../../data/Conditions.json";
import Card from "antd/es/card/Card";

interface ConditionRulesinterface {
  id: number;
  ruleName: string;
  description: string;
  maxDaysPerYear: number;
  minDaysPerRequest: number;
  allowCarryForward: boolean;
  maxCarryForwardDays: number;
  noticePeriod: number;
}

const ConditionRules: React.FC = () => {
  const [dataSource, setDataSource] = useState<ConditionRulesinterface[]>([]);
  const [newEntry, setNewEntry] = useState<ConditionRulesinterface>({
    id: 0,
    ruleName: "",
    description: "",
    maxDaysPerYear: 0,
    minDaysPerRequest: 0,
    allowCarryForward: false,
    maxCarryForwardDays: 0,
    noticePeriod: 0,
  });
  const [filters, setFilters] = useState({
    id: 0,
    ruleName: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const dataWithKeys = templatedata.map((leave) => ({
      ...leave,
      key: leave.id,
    }));
    setDataSource(dataWithKeys);
  }, []);

  const columns = [
    {
      title: "Rule Name",
      dataIndex: "ruleName",
      key: "ruleName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Max Days Per Year",
      dataIndex: "maxDaysPerYear",
      key: "maxDaysPerYear",
    },
    {
      title: "Min Days Per Request",
      dataIndex: "minDaysPerRequest",
      key: "minDaysPerRequest",
    },
    {
      title: "Allow Carry Forward",
      dataIndex: "allowCarryForward",
      key: "allowCarryForward",
      render: (allowCarryForward: boolean) => (
        <span style={allowCarryForward ? { color: "green" } : { color: "red" }}>
          {allowCarryForward ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "Max Carry Forward Days",
      dataIndex: "maxCarryForwardDays",
      key: "maxCarryForwardDays",
    },
    {
      title: "Notice Period",
      dataIndex: "noticePeriod",
      key: "noticePeriod",
    },
  ];

  const handleSearch = () => {
    const filteredData = templatedata
      .map((leave) => ({
        ...leave,
        key: leave.id.toString(),
      }))
      .filter((leave) => {
        const matchruleName =
          !filters.ruleName || leave.ruleName.includes(filters.ruleName);
        return matchruleName;
      });
    setDataSource(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({
      id: 0,
      ruleName: "",
    });
    setDataSource(
      templatedata.map((leave) => ({ ...leave, key: leave.id.toString() }))
    );
  };

  const handleAddEntry = () => {
    const newData = {
      ...newEntry,
      id: dataSource.length + 1,
      key: (dataSource.length + 1).toString(),
    };
    setDataSource([newData, ...dataSource]);
    setNewEntry({
      id: 0,
      ruleName: "",
      description: "",
      maxDaysPerYear: 0,
      minDaysPerRequest: 0,
      allowCarryForward: false,
      maxCarryForwardDays: 0,
      noticePeriod: 0,
    });
    setIsModalVisible(false); // Close the modal
  };

  return (
    <>
      <Card>
        <Form layout="horizontal" initialValues={{ size: "default" }}>
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 20, color: "#214f87" }}>
                Condition & Rules
              </Title>
            </Col>

            <Col xs={12} md={6}>
              <Form.Item label="Rule Name">
                <Input
                  value={filters.ruleName}
                  onChange={(e) =>
                    setFilters({ ...filters, ruleName: e.target.value })
                  }
                  placeholder="Search by rule"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Button
                type="primary"
                onClick={handleSearch}
                style={{
                  backgroundColor: "#6195d4",
                  marginRight: 20,
                  float: "right",
                  marginLeft: 20,
                }}
              >
                <SearchOutlined /> Search
              </Button>
              <Button
                type="default"
                onClick={handleClearFilters}
                style={{
                  backgroundColor: "orange",
                  marginRight: 20,
                  float: "right",
                }}
              >
                <ClearOutlined /> Clear
              </Button>
              <Button
                type="primary"
                onClick={() => setIsModalVisible(true)}
                style={{
                  backgroundColor: "#79ba8a",
                  float: "right",
                  marginRight: 20,
                }}
              >
                <PlusOutlined /> Add Rule
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Table dataSource={dataSource} columns={columns} style={{ marginTop: 20 }} />

      {/* Modal for adding a new entry */}
      <Modal
        title="Add New Rule"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddEntry}
      >
        <Form layout="vertical">
          <Form.Item label="Rule Name">
            <Input
              value={newEntry.ruleName}
              onChange={(e) =>
                setNewEntry({ ...newEntry, ruleName: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              value={newEntry.description}
              onChange={(e) =>
                setNewEntry({ ...newEntry, description: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Max Days Per Year">
            <Input
              type="number"
              value={newEntry.maxDaysPerYear}
              onChange={(e) =>
                setNewEntry({
                  ...newEntry,
                  maxDaysPerYear: parseInt(e.target.value) || 0,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Min Days Per Request">
            <Input
              type="number"
              value={newEntry.minDaysPerRequest}
              onChange={(e) =>
                setNewEntry({
                  ...newEntry,
                  minDaysPerRequest: parseInt(e.target.value) || 0,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Allow Carry Forward">
            <Switch
              checked={newEntry.allowCarryForward}
              onChange={(checked) =>
                setNewEntry({ ...newEntry, allowCarryForward: checked })
              }
            />
          </Form.Item>
          <Form.Item label="Max Carry Forward Days">
            <Input
              type="number"
              value={newEntry.maxCarryForwardDays}
              onChange={(e) =>
                setNewEntry({
                  ...newEntry,
                  maxCarryForwardDays: parseInt(e.target.value) || 0,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Notice Period">
            <Input
              type="number"
              value={newEntry.noticePeriod}
              onChange={(e) =>
                setNewEntry({
                  ...newEntry,
                  noticePeriod: parseInt(e.target.value) || 0,
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ConditionRules;
