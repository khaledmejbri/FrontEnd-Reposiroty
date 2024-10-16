import React, { useEffect, useState } from "react";
import { Table, Button, Form, Col, Row, Select, DatePicker, Modal } from "antd";
import { AppstoreAddOutlined, ClearOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import templatedata from "../../data/mesConge.json";
import moment from "moment"; // For date filtering
import Card from "antd/es/card/Card";

interface MesConge {
  key: string;
  reference: string;
  status: string; // "Ok" or "Ref"
  type: string; // "Pay", "Mald", "Matr", "SanSold"
  startDate: string;
  endDate: string;
}

const MesCongs: React.FC = () => {
  const [dataSource, setDataSource] = useState<MesConge[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState<MesConge>({
    key: '',
    reference: '',
    status: 'Ok', // Default status
    type: 'Pay',  // Default type
    startDate: '',
    endDate: ''
  });
  const [filters, setFilters] = useState({
    reference: "",
    type: "",
    status: "",
    startDate: null as string | null,
    endDate: null as string | null,
  });

  useEffect(() => {
    // Initialize the data with keys
    const dataWithKeys = templatedata.map((leave, index) => ({
      ...leave,
      key: `leave-${index}`,
    }));
    setDataSource(dataWithKeys);
  }, []);

  const handleDelete = (key: string) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const columns = [
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        // Display labels instead of raw values
        const typeLabels: { [key: string]: string } = {
          Pay: "Congé Payé",
          Mald: "Congé Maladie",
          Matr: "Congé Maternité",
          SanSold: "Congé sans Solde",
        };
        return typeLabels[type] || type; // Default to type if not found
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusLabels: { [key: string]: string } = {
          Ok: "Accepter",
          Ref: "Refusé",
          Trait: "En Cours de traiter",
        };
        return <span style={{ color: status === "Ok" ? "green" : "red" }}>{statusLabels[status] || status}</span>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: MesConge) => {
        if (record.status === "EnCours") {
          return (
        <Button
          type="primary"
          onClick={() => handleDelete(record.key)}
          style={{ backgroundColor: "#d96666", borderColor: "#d96666" }}
        >
          <DeleteOutlined /> Delete
        </Button>)}}
      
    },
  ];

  // Filter the data based on search inputs
  const handleSearch = () => {
    const filteredData = templatedata
      .map((leave, index) => ({
        ...leave,
        key: `leave-${index}`, // Ensure the 'key' is included
      }))
      .filter((leave) => {
        const matchReference =
          !filters.reference || leave.reference.includes(filters.reference);
        const matchType = !filters.type || leave.type === filters.type;
        const matchStatus = !filters.status || leave.status === filters.status;
        const matchStartDate =
          !filters.startDate ||
          moment(leave.startDate).isSameOrAfter(moment(filters.startDate));
        const matchEndDate =
          !filters.endDate ||
          moment(leave.endDate).isSameOrBefore(moment(filters.endDate));
        return (
          matchReference &&
          matchType &&
          matchStatus &&
          matchStartDate &&
          matchEndDate
        );
      });
    setDataSource(filteredData);
  };

  // Clear filters and reset table
  const handleClearFilters = () => {
    setFilters({
      reference: "",
      type: "",
      status: "",
      startDate: null,
      endDate: null,
    });
    // Optionally, reset the filtered data source to the full unfiltered list
    const dataWithKeys = templatedata.map((leave, index) => ({
      ...leave,
      key: `leave-${index}`,
      reference: `REF-${Date.now()}`,
    }));
    setDataSource(dataWithKeys);
  };
 // Open modal to add new entry
 const showModal = () => {
  setIsModalVisible(true);
};

// Handle form submission in the modal
const handleAddEntry = () => {
  const newData = {
    ...newEntry,
    status: 'waiting',
    key: `leave-${dataSource.length}`, // Generate a new key
    reference: `Ref00${(dataSource.length+1).toString()}`,
  };
  setDataSource([ newData,...dataSource]); // Add new entry to data source
  setIsModalVisible(false); // Close the modal
  setNewEntry({
    key: '',
    reference: '',
    status: 'waiting',
    type: '', 
    startDate: '',
    endDate: ''
  }); // Reset form data
};
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
                Ma Liste des Congés
              </Title>
            </Col>
          

            <Col xs={12} md={4}>
              <Form.Item label="Type">
                <Select
                  value={filters.type}
                  onChange={(value) =>
                    setFilters({ ...filters, type: value })
                  }
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Pay">Congé Payé</Select.Option>
                  <Select.Option value="Mald">Congé Maladie</Select.Option>
                  <Select.Option value="Matr">Congé Maternité</Select.Option>
                  <Select.Option value="SanSold">Congé sans Solde</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={12} md={4}>
              <Form.Item label="Status">
                <Select
                  value={filters.status}
                  onChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Ok">Accepter</Select.Option>
                  <Select.Option value="Trait">En Cours de traiter</Select.Option>
                  <Select.Option value="Ref">Refusé</Select.Option>
                </Select>
              </Form.Item>
            </Col>

 
            <Col xs={12} md={4}>
              <Form.Item label="De" >
                <DatePicker
                required
                style={{width:"100%"}}
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

            <Col xs={12} md={4}>
              <Form.Item label="Au" >
                <DatePicker
                required
                style={{width:"100%"}}
                  value={filters.endDate ? moment(filters.endDate) : null}
                  onChange={(date) =>
                    setFilters({
                      ...filters,
                      endDate: date ? date.format("YYYY-MM-DD") : null,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
            <Button type="primary"  onClick={showModal} style={{backgroundColor:'#79ba8a',marginRight:20,float:'right'}}>
            <AppstoreAddOutlined /> Add
            </Button>
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
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ marginTop: 20 }}
      />
       <Modal
        title="Demande d'absences"
        visible={isModalVisible}
        onOk={handleAddEntry}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="horizontal">
         
          <Form.Item label="Type">
            <Select
            style={{width:'50%'}}
              value={newEntry.type}
              onChange={(value) => setNewEntry({ ...newEntry, type: value })}
            >
              <Select.Option value="Pay">Congé Payé</Select.Option>
              <Select.Option value="Mald">Congé Maladie</Select.Option>
              <Select.Option value="Matr">Congé Maternité</Select.Option>
              <Select.Option value="SanSold">Congé sans Solde</Select.Option>
            </Select>
          </Form.Item>
        
          <Form.Item label="Start Date">
            <DatePicker
             style={{width:'50%'}}
              value={newEntry.startDate ? moment(newEntry.startDate) : null}
              onChange={(date) => 
                setNewEntry({ ...newEntry, startDate: date ? date.format("YYYY-MM-DD") : '' })
              }
            />
          </Form.Item>
          <Form.Item label="End Date">
            <DatePicker
             style={{width:'50%'}}
              value={newEntry.endDate ? moment(newEntry.endDate) : null}
              onChange={(date) => 
                setNewEntry({ ...newEntry, endDate: date ? date.format("YYYY-MM-DD") : '' })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MesCongs;
