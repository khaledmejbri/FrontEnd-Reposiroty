import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Select,
  DatePicker,
  Modal,
  Input,
  Space,
} from "antd";
import {
  CheckCircleOutlined,
  ClearOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import templatedata from "../../data/ListConge.json";
import moment from "moment"; 
import Card from "antd/es/card/Card";

interface HistoriqueDesCongesInterface {
  id: string;
  status: string; // "EnCours", "Approved", "Refused"
  type: string; // "Pay", "Unpaid", "Medical", etc.
  startDate: string;
  endDate: string;
  soldeConge: number; // remaining leave balance
  totalDaysPerYear: number;
  daysTaken: number; // totalDaysPerYear - soldeConge
}

const HistoriqueDesConges: React.FC = () => {
  const [dataSource, setDataSource] = useState<HistoriqueDesCongesInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState<HistoriqueDesCongesInterface>({
    id: "",
    status: "", 
    type: "", 
    startDate: "",
    endDate: "",
    soldeConge:0,
    totalDaysPerYear:0,
    daysTaken:0
  });
  const [filters, setFilters] = useState({
    id: "",
    status: "", 
    type: "", 
    startDate: "",
    endDate: "",
    soldeConge:0,
    totalDaysPerYear:0,
    daysTaken:0
  });

  useEffect(() => {
    // Initialize the data with keys
    const dataWithKeys = templatedata
    .filter((leave) => leave.status !== "EnCours")
    .map((leave) => ({
      ...leave,
      key: leave.id.toString(),
    }));
  setDataSource(dataWithKeys);
  }, []);

  const handleDelete = (key: string) => {
    const newData = dataSource.filter((item) => item.id !== key);
    setDataSource(newData);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "totalDaysPerYear",
      dataIndex: "totalDaysPerYear",
      key: "totalDaysPerYear",
    },
    {
      title: "daysTaken",
      dataIndex: "daysTaken",
      key: "daysTaken",
    }, {
      title: "daysTaken",
      dataIndex: "daysTaken",
      key: "daysTaken",
    },
    {
      title: "soldeConge",
      dataIndex: "soldeConge",
      key: "soldeConge",
    },
   
   
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        const typeLabels: { [key: string]: string } = {
          Pay: "Congé Payé",
          Mald: "Congé Maladie",
          Matr: "Congé Maternité",
          SanSold: "Congé sans Solde",
          Nonjustifier: "Non justifier",
        };
        return typeLabels[type] || type;
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
          EnCours: "En Cours de traiter",
          Nonjustifier: "Non justifier",
        };
        return (
          <span style={{ color: status === "Ok" ? "green" : "red" }}>
            {statusLabels[status] || status}
          </span>
        );
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
      render: (_: any, record: HistoriqueDesCongesInterface) => {
        if (record.status === "EnCours") {
          return (
            <Space align="start">
              <Button
                type="primary"
                onClick={() => handleStatusChange(record.id, "Ok")}
                style={{ backgroundColor: "#79ba8a", borderColor: "#79ba8a" }}
              >
                <CheckCircleOutlined />
              </Button>
              <Button
                type="primary"
                onClick={() => handleStatusChange(record.id, "Ref")}
                style={{ backgroundColor: "#ff456c", borderColor: "#ff456c" }}
              >
                <CloseCircleOutlined />
              </Button>
              <Button
                type="primary"
                onClick={() => handleDelete(record.id)}
                style={{ backgroundColor: "#d96666", borderColor: "#d96666" }}
              >
                <DeleteOutlined />
              </Button>
            </Space>
          );
        }
        return null;
      },
    }
  ];
  const handleStatusChange = (key: string, newStatus: string) => {
    const updatedDataSource = dataSource.map((item) => {
      if (item.id === key) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setDataSource(updatedDataSource);
  };
  // Filter the data based on search inputs
  const handleSearch = () => {
    const filteredData = templatedata
      .map((leave) => ({
        ...leave,
        key: leave.id.toString(),
      }))
      .filter((leave) => {
        const matchsoldeConge =
          !filters.soldeConge || leave.soldeConge===filters.soldeConge;
        const matchType = !filters.type || leave.type === filters.type;
        const matchStatus = !filters.status || leave.status === filters.status;
        const matchStartDate =
          !filters.startDate ||
          moment(leave.startDate).isSame(moment(filters.startDate));
        const matchEndDate =
          !filters.endDate ||
          moment(leave.endDate).isSame(moment(filters.endDate));
        return (
          matchsoldeConge &&
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
      id: "",
      status: "", 
      type: "", 
      startDate: "",
      endDate: "",
      soldeConge:0,
      totalDaysPerYear:0,
      daysTaken:0
    });
    setDataSource(
      templatedata.map((leave) => ({ ...leave, key: leave.id.toString() }))
    );
  };



  // Handle form submission in the modal
  const handleAddEntry = () => {
    const newData = {
      ...newEntry,
      id: (dataSource.length + 1).toString(),

    };
    setDataSource([newData, ...dataSource]); // Add new entry to data source
    setIsModalVisible(false); // Close the modal
    setNewEntry({
      id: "",
    status: "", 
    type: "", 
    startDate: "",
    endDate: "",
    soldeConge:0,
    totalDaysPerYear:0,
    daysTaken:0
    }); // Reset form data
  };

  return (
    <>
      <Card>
        <Form layout="horizontal" initialValues={{ size: "default" }}>
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 20, color: "#214f87" }}>
              Historique Des Conges des employés
              </Title>
            </Col>

            <Col xs={12} md={5}>
              <Form.Item label="Solde Conge">
                <Input
                  value={filters.soldeConge}
                  onChange={(e) =>
                    setFilters({ ...filters, soldeConge: Number(e.target.value) })
                  }
                  placeholder="Chercher par solde de Conge"
                />
              </Form.Item>
            </Col>
          
          
            
           
            <Col xs={12} md={5}>
              <Form.Item label="Type">
                <Select
                  value={filters.type}
                  onChange={(value) => setFilters({ ...filters, type: value })}
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Pay">Congé Payé</Select.Option>
                  <Select.Option value="Mald">Congé Maladie</Select.Option>
                  <Select.Option value="Matr">Congé Maternité</Select.Option>
                  <Select.Option value="SanSold">
                    Congé sans Solde
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="Status">
                <Select
                  value={filters.status}
                  onChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Ok">Accepter</Select.Option>
                  <Select.Option value="EnCours">
                    En Cours de traiter
                  </Select.Option>
                  <Select.Option value="Ref">Refusé</Select.Option>
                </Select>
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
          
          

            <Col xs={12} md={5}>
              <Form.Item label="De">
                <DatePicker
                  style={{ width: "100%" }}
                  value={filters.startDate ? moment(filters.startDate) : null}
                  onChange={(date) =>
                    setFilters({
                      ...filters,
                      startDate: date.format("YYYY-MM-DD") ,
                    })
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={12} md={5}>
              <Form.Item label="À">
                <DatePicker
                  style={{ width: "100%" }}
                  value={filters.endDate ? moment(filters.endDate) : null}
                  onChange={(date) =>
                    setFilters({
                      ...filters,
                      endDate:date.format("YYYY-MM-DD"),
                    })
                  }
                />
              </Form.Item>
            </Col>

          

           
          </Row>
        </Form>
      </Card>

      <Card>
        <Table dataSource={dataSource} columns={columns} />

        <Modal
          title="Ajouter un Congé"
          visible={isModalVisible}
          onOk={handleAddEntry}
          onCancel={() => setIsModalVisible(false)}
          okText="Ajouter"
          cancelText="Annuler"
        >
          <Form layout="vertical">
            <Form.Item label="soldeConge">
              <Input
                value={newEntry.soldeConge}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, soldeConge: Number(e.target.value) })
                }
              />
            </Form.Item>

            <Form.Item label="daysTaken">
              <Input
                value={newEntry.daysTaken}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, daysTaken: Number(e.target.value) })
                }
              />
            </Form.Item>

            <Form.Item label="totalDaysPerYear">
              <Input
                value={newEntry.totalDaysPerYear}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, totalDaysPerYear: Number(e.target.value) })
                }
              />
            </Form.Item>

           
            <Form.Item label="Type">
              <Select
                value={newEntry.type}
                onChange={(value) => setNewEntry({ ...newEntry, type: value })}
              >
                <Select.Option value="Pay">Congé Payé</Select.Option>
                <Select.Option value="Mald">Congé Maladie</Select.Option>
                <Select.Option value="Matr">Congé Maternité</Select.Option>
                <Select.Option value="SanSold">Congé sans Solde</Select.Option>
                <Select.Option value="Nonjustifier">
                  Non justifier
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Status">
              <Select
                value={newEntry.status}
                onChange={(value) =>
                  setNewEntry({ ...newEntry, status: value })
                }
              >
                <Select.Option value="Ok">Accepter</Select.Option>
                <Select.Option value="EnCours">
                  En Cours de traiter
                </Select.Option>
                <Select.Option value="Ref">Refusé</Select.Option>
                <Select.Option value="Nonjustifier">
                  Non justifier
                </Select.Option>
              </Select>
            </Form.Item>

          

            <Form.Item label="Start Date">
              <DatePicker
                style={{ width: "100%" }}
                value={newEntry.startDate ? moment(newEntry.startDate) : null}
                onChange={(date) =>
                  setNewEntry({
                    ...newEntry,
                    startDate: date ? date.format("YYYY-MM-DD") : "",
                  })
                }
              />
            </Form.Item>

            <Form.Item label="End Date">
              <DatePicker
                style={{ width: "100%" }}
                value={newEntry.endDate ? moment(newEntry.endDate) : null}
                onChange={(date) =>
                  setNewEntry({
                    ...newEntry,
                    endDate: date ? date.format("YYYY-MM-DD") : "",
                  })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  );
};

export default HistoriqueDesConges;
