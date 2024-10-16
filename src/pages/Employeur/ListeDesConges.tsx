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
  AppstoreAddOutlined,
  CheckCircleOutlined,
  ClearOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import templatedata from "../../data/mesConge.json";
import moment from "moment"; // For date filtering
import Card from "antd/es/card/Card";

interface ListeCongé {
  key: string;
  id: number;
  reference: string;
  status: string; // "Ok" or "Ref"
  type: string; // "Pay", "Mald", "Matr", "SanSold"
  startDate: string;
  endDate: string;
  nom: string;
  Prenom: string;
  accessRight: string; // "RRH" or "CRH"
  NumTel: string;
}

const ListeDesConges: React.FC = () => {
  const [dataSource, setDataSource] = useState<ListeCongé[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState<ListeCongé>({
    key: "",
    id: 0,
    reference: "",
    status: "Ok", // Default status
    type: "Pay", // Default type
    startDate: "",
    endDate: "",
    nom: "",
    Prenom: "",
    accessRight: "", // Default access right
    NumTel: "",
  });
  const [filters, setFilters] = useState({
    nom:"",
    reference: "",
    type: "",
    status: "",
    startDate: null as string | null,
    endDate: null as string | null,
  });

  useEffect(() => {
    // Initialize the data with keys
    const dataWithKeys = templatedata.map((leave) => ({
      ...leave,
      key: leave.id.toString(),
    }));
    setDataSource(dataWithKeys);
  }, []);

  const handleDelete = (key: string) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Nom",
      dataIndex: "Nom",
      key: "Nom",
    },
    {
      title: "Prenom",
      dataIndex: "Prenom",
      key: "Prenom",
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
      title: "Access Right",
      dataIndex: "accessRight",
      key: "accessRight",
      render: (accessRight: string) =>
        accessRight === "RRH" ? "Responsable RH" :accessRight==="Employee"? "Employee":"Collaborateur RH",
    },
    {
      title: "Numéro de Téléphone",
      dataIndex: "NumTel",
      key: "NumTel",
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
      render: (_: any, record: ListeCongé) => {
        if (record.status === "EnCours") {
          return (
            <Space align="start">
              <Button
                type="primary"
                onClick={() => handleStatusChange(record.key, "Ok")}
                style={{ backgroundColor: "#79ba8a", borderColor: "#79ba8a" }}
              >
                <CheckCircleOutlined />
              </Button>
              <Button
                type="primary"
                onClick={() => handleStatusChange(record.key, "Ref")}
                style={{ backgroundColor: "#ff456c", borderColor: "#ff456c" }}
              >
                <CloseCircleOutlined />
              </Button>
              <Button
                type="primary"
                onClick={() => handleDelete(record.key)}
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
      if (item.key === key) {
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
      nom:"",
      reference: "",
      type: "",
      status: "",
      startDate: null,
      endDate: null,
    });
    setDataSource(
      templatedata.map((leave) => ({ ...leave, key: leave.id.toString() }))
    );
  };

  // Open modal to add new entry
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle form submission in the modal
  const handleAddEntry = () => {
    const newData = {
      ...newEntry,
      id: dataSource.length + 1,
      key: (dataSource.length + 1).toString(),
      reference: `Ref00${(dataSource.length+1).toString()}`,

    };
    setDataSource([newData, ...dataSource]); // Add new entry to data source
    setIsModalVisible(false); // Close the modal
    setNewEntry({
      key: "",
      id: 0,
      reference: "",
      status: "Ok",
      type: "Pay",
      startDate: "",
      endDate: "",
      nom: "",
      Prenom: "",
      accessRight: "RRH",
      NumTel: "",
    }); // Reset form data
  };

  return (
    <>
      <Card>
        <Form layout="horizontal" initialValues={{ size: "default" }}>
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 20, color: "#214f87" }}>
                 Liste de Congés des employers
              </Title>
            </Col>

            <Col xs={12} md={6}>
              <Form.Item label="Référence">
                <Input
                  value={filters.reference}
                  onChange={(e) =>
                    setFilters({ ...filters, reference: e.target.value })
                  }
                  placeholder="Chercher par référence"
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="Nom">
                <Input
                  value={filters.reference}
                  onChange={(e) =>
                    setFilters({ ...filters, nom: e.target.value })
                  }
                  placeholder="Chercher par référence"
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
           

            <Col xs={12} md={6}>
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
          

            <Col xs={12} md={5}>
              <Form.Item label="De">
                <DatePicker
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

            <Col xs={12} md={5}>
              <Form.Item label="À">
                <DatePicker
                  style={{ width: "100%" }}
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
            <Form.Item label="Référence">
              <Input
                value={newEntry.reference}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, reference: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Nom">
              <Input
                value={newEntry.nom}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, nom: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Prenom">
              <Input
                value={newEntry.Prenom}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, Prenom: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Numéro de Téléphone">
              <Input
                value={newEntry.NumTel}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, NumTel: e.target.value })
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

            <Form.Item label="Access Right">
              <Select
                value={newEntry.accessRight}
                onChange={(value) =>
                  setNewEntry({ ...newEntry, accessRight: value })
                }
              >
                <Select.Option value="RRH">Responsable RH</Select.Option>
                <Select.Option value="CRH">Collaborateur RH</Select.Option>
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

export default ListeDesConges;
