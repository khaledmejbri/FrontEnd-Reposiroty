import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Input,
} from "antd";
import {
  ClearOutlined,
  SearchOutlined,
  
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import templatedata from "../../data/Conditions.json";
import Card from "antd/es/card/Card";

interface ConditionRulesinterface {
  id:number,
  ruleName:string,
  description: string,
  maxDaysPerYear: number,
  minDaysPerRequest: number,
  allowCarryForward: boolean,
  maxCarryForwardDays: number,
  noticePeriod: number

}

const ConditionRules: React.FC = () => {
  const [dataSource, setDataSource] = useState<ConditionRulesinterface[]>([]);
  const [newEntry, setNewEntry] = useState<ConditionRulesinterface>({
    id:0,
    ruleName:"",
    description: "",
    maxDaysPerYear: 0,
    minDaysPerRequest: 0,
    allowCarryForward: false,
    maxCarryForwardDays: 0,
    noticePeriod: 0
  });
  const [filters, setFilters] = useState({
    id:0,
    ruleName:""

  });

  useEffect(() => {
    // Initialize the data with keys
    const dataWithKeys = templatedata.map((leave) => ({
      ...leave,
      key: leave.id,
    }));
    setDataSource(dataWithKeys);
  }, []);



  const columns = [
    {
      title: "ruleName",
      dataIndex: "ruleName",
      key: "ruleName",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "maxDaysPerYear",
      dataIndex: "maxDaysPerYear",
      key: "maxDaysPerYear",
    },
    {
      title: "minDaysPerRequest",
      dataIndex: "minDaysPerRequest",
      key: "minDaysPerRequest",
    },
    {
      title: "allowCarryForward",
      dataIndex: "allowCarryForward",
      key: "allowCarryForward",
      render: (allowCarryForward: boolean) => (
        <span style={allowCarryForward ? { color: "green" } : { color: "red" }}>
          {allowCarryForward ? "Yes" : "No"}
        </span>
      ),
    },
    {
      title: "maxCarryForwardDays",
      dataIndex: "maxCarryForwardDays",
      key: "maxCarryForwardDays",
    },
    {
      title: "noticePeriod",
      dataIndex: "noticePeriod",
      key: "noticePeriod",
    }
];


  // Filter the data based on search inputs
  const handleSearch = () => {
    const filteredData = templatedata
      .map((leave) => ({
        ...leave,
        key: leave.id.toString(),
      }))
      .filter((leave) => {
        const matchruleName =
          !filters.ruleName || leave.ruleName.includes(filters.ruleName);
        return (
          matchruleName 
        );
      });
    setDataSource(filteredData);
  };

  // Clear filters and reset table
  const handleClearFilters = () => {
    setFilters({  
      id:0,
       ruleName:"",

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
      reference: `Ref00${(dataSource.length+1).toString()}`,

    };
    setDataSource([newData, ...dataSource]); 
    setNewEntry({
      id:0,
      ruleName:"",
      description: "",
      maxDaysPerYear: 0,
      minDaysPerRequest: 0,
      allowCarryForward: false,
      maxCarryForwardDays: 0,
      noticePeriod: 0
    }); 
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
              <Form.Item label="ruleName">
                <Input
                  value={filters.ruleName}
                  onChange={(e) =>
                    setFilters({ ...filters, ruleName: e.target.value })
                  }
                  placeholder="Chercher par rule"
                />
              </Form.Item>
            </Col>
          
            <Col xs={24} md={8}>
           
              <Button
                type="primary"
                onClick={handleSearch}
                style={{
                  backgroundColor: "#6195d4"
                 ,marginRight:20,float:'right',marginLeft:20,
                }}
              >
                <SearchOutlined /> Recherche
              </Button>
              <Button
                type="default"
                onClick={handleClearFilters}
                style={{
                  backgroundColor: "orange",marginRight:20,float:'right'
                }}
              >
                <ClearOutlined /> Clear
              </Button>
             
            
            </Col>
           


           
           

          

           
          </Row>
        </Form>
      </Card>

      <Card>
        <Table dataSource={dataSource} columns={columns} />

      
      </Card>
    </>
  );
};

export default ConditionRules;
