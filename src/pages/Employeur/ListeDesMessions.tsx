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
  Switch,
} from "antd";
import {
  AppstoreAddOutlined,
  ClearOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import templatedata from "../../data/missionOrder.json";
import moment from "moment";
import Card from "antd/es/card/Card";

interface MissionOrderInterface {
  key: string;
  id: number;
  reference: string;
  status: string;
  type: string;
  startDate: string;
  endDate: string;
  nom: string;
  prenom: string;
  accessRight: string;
  numTel: string;
  presence: boolean;
  budget: string;
  destination: string;
}

const ListeMission: React.FC = () => {
  const [dataSource, setDataSource] = useState<MissionOrderInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState<MissionOrderInterface>({
    key: "",
    id: 0,
    reference: "",
    status: "", // Default status
    type: "", // Default type for mission
    startDate: "",
    endDate: "",
    nom: "",
    prenom: "",
    accessRight: "", // Default access right
    numTel: "",
    presence: false,
    budget: "",
    destination: "",
  });

  const [filters, setFilters] = useState({
    reference: "",
    type: "",
    status: "",
    startDate: "" as string | null,
    endDate: "" as string,
    nom: "",
    presence: false,
    budget:"",
    destination: "",
  });

  

  const columns = [
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prenom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        const typeLabels: { [key: string]: string } = {
          Business: "Mission Business",
          Training: "Mission Training",
          Project: "Project Assignment",
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
          Nonjustifier: "En Cours de mession",
        };
        return (
          <span style={{ color: status === "Nonjustifier" ? "green" : "red" }}>
            {statusLabels[status] || status}
          </span>
        );
      },
    },
    {
      title: "presence",
      dataIndex: "presence",
      key: "presence",
      
        render: (presence: boolean) => (
          <span style={{ color: presence ? "green" : "red" }}>
            {presence ? "Yes" : "No"}
          </span>
        ),
      
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Mission Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Mission End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
   
  ];

  const handleSearch = () => {
    const filteredData = templatedata
      .map((missionOrder) => ({
        ...missionOrder,
        key: missionOrder.id.toString(),
      }))
      .filter((missionOrder) => {
        const matchReference =
          !filters.reference ||
          missionOrder.reference.includes(filters.reference);
        const matchType = !filters.type || missionOrder.type === filters.type;
        const matchStatus =
          !filters.status || missionOrder.status === filters.status;
          const matchPresence =
          !filters.presence || missionOrder.presence=== filters.presence;
        const matchNom = !filters.nom || missionOrder.nom === filters.nom;
        const matchBudget =
          !filters.budget || missionOrder.budget === filters.budget;

        const matchStartDate =
          !filters.startDate ||
          moment(missionOrder.startDate).isSameOrAfter(
            moment(filters.startDate)
          );
        const matchEndDate =
          !filters.endDate ||
          moment(missionOrder.endDate).isSameOrBefore(moment(filters.endDate));
        return (
          matchReference &&
          matchType &&
          matchStatus &&
          matchStartDate &&
          matchEndDate &&
          matchNom &&
          matchBudget &&
          matchPresence

        );
      });
    setDataSource(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({
      reference: "",
      type: "",
      status: "",
      startDate: "",
      endDate: "",
      nom: "",
      presence: false,
      budget:"",
      destination: "",
    });
    setDataSource(
      templatedata.map((missionOrder) => ({
        ...missionOrder,
        key: missionOrder.id.toString(),
      }))
    );
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddEntry = () => {
    const newData = {
      ...newEntry,
      id: dataSource.length + 1,
      key: (dataSource.length + 1).toString(),
      reference: `Ref00${(dataSource.length+1).toString()}`,

    };
    setDataSource([newData, ...dataSource]);
    setIsModalVisible(false);
    setNewEntry({
      key: "",
      id: 0,
      reference: "",
      status: "",
      type: "",
      startDate: "",
      endDate: "",
      nom: "",
      prenom: "",
      accessRight: "",
      numTel: "",
      presence: false,
      budget: "",
      destination: "",
    });
  };
  useEffect(() => {
    // Initialize the data source with templatedata on first render
    setDataSource(
      templatedata.map((missionOrder) => ({
        ...missionOrder,
        key: missionOrder.id.toString(),
      }))
    );
  }, []);
  return (
    <>
      <Card>
        <Form layout="horizontal" initialValues={{ size: "default" }}>
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 20, color: "#214f87" }}>
                Liste des ordres de mission
              </Title>
            </Col>

            <Col xs={12} md={5}>
              <Form.Item label="Nom">
                <Select
                  showSearch
                  value={filters.nom} // Ensure `filters.nom` is a string, not an object or array
                  onChange={(value) => setFilters({ ...filters, nom: value })}
                  placeholder="Chercher par nom"
                  optionFilterProp="children"
                  onSelect={(e) => {
                    console.log({ e });
                    setFilters({ ...filters, nom: e });
                  }}
                >
                  {dataSource.map((item) => (
                    <Select.Option
                      key={item.id}
                      value={item.nom}
                      onSelect={(e: any) => {
                        console.log({ e });
                        setFilters({ ...filters, nom: e });
                      }}
                    >
                      {" "}
                      {/* Ensure value is a string */}
                      {item.nom}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="Type">
                <Select
                  value={filters.type}
                  onChange={(value) => setFilters({ ...filters, type: value })}
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Business">Business</Select.Option>
                  <Select.Option value="Training">Training</Select.Option>
                  <Select.Option value="Project">Project</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={2}>
              <Form.Item label="presence">
              <Switch size="small" checked={filters.presence}
                  onChange={(checked) =>
                    setFilters({ ...filters, presence: checked })
                  }/>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
            <Button type="primary"  onClick={showModal} style={{backgroundColor:'#79ba8a',marginRight:20,float:'right'}}>
            <AppstoreAddOutlined /> Ajouter
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
           
            <Col xs={12} md={5}>
              <Form.Item label="Date début">
                <DatePicker
                  style={{ width: "100%" }}
                  value={filters.startDate ? moment(filters.startDate) : null}
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="Date fin">
                <DatePicker
                  style={{ width: "100%" }}
                  value={filters.endDate ? moment(filters.endDate) : null}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />

        <Modal
          title="Ajouter un nouvel ordre de mission"
          visible={isModalVisible}
          onOk={handleAddEntry}
          onCancel={() => setIsModalVisible(false)}
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
            <Form.Item label="Prénom">
              <Input
                value={newEntry.prenom}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, prenom: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Numéro de Téléphone">
              <Input
                value={newEntry.numTel}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, numTel: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Type de mission">
              <Select
                value={newEntry.type}
                onChange={(value) => setNewEntry({ ...newEntry, type: value })}
              >
                <Select.Option value="Business">Business</Select.Option>
                <Select.Option value="Training">Training</Select.Option>
                <Select.Option value="Project">Project</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Statut">
              <Select
                value={newEntry.status}
                onChange={(value) =>
                  setNewEntry({ ...newEntry, status: value })
                }
              >
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Approved">Approved</Select.Option>
                <Select.Option value="Rejected">Rejected</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date de début de mission">
              <DatePicker
                style={{ width: "100%" }}
                value={newEntry.startDate ? moment(newEntry.startDate) : null}
                onChange={(date) =>
                  setNewEntry({ ...newEntry, startDate: date.toString() })
                }
              />
            </Form.Item>
            <Form.Item label="Date de fin de mission">
              <DatePicker
                style={{ width: "100%" }}
                value={newEntry.endDate ? moment(newEntry.endDate) : null}
                onChange={(date) =>
                  setNewEntry({ ...newEntry, endDate: date.toString() })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  );
};

export default ListeMission;
