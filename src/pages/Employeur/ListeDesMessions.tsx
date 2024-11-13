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
  List,
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
import NewModal from "./NewModal";

const employeeData = [
  {
    id: 1,
    matricule: "E001",
    fullname: "Mejbri khaled",
    position: "Developer",
    email: "mejbri khaled@company.com",
    phoneNumber: "123-456-7890",
  },
  {
    id: 2,
    matricule: "E002",
    fullname: "Mohamed ALI",
    position: "Designer",
    email: "med@company.com",
    phoneNumber: "123-456-7891",
  },
  {
    id: 3,
    matricule: "E003",
    fullname: "Foulen ben Foulen ",
    position: "Manager",
    email: "test@company.com",
    phoneNumber: "123-456-7892",
  },
];

interface MissionOrderInterface {
  key: string;
  id: number;
  reference: string;
  status: string;
  type: string;
  startDate: string;
  endDate: string;
  presence: boolean;
  budget: string;
  destination: string;
  employees?: Array<{
    id: number;
    fullname: string;
    matricule: string;
    position: string;
    email: string;
    phoneNumber: string;
  }>;
}

const ListeMission: React.FC = () => {
  const [dataSource, setDataSource] = useState<MissionOrderInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalDetailVisible, setIsModalDetailVisible] = useState(false);

  const [newEntry, setNewEntry] = useState<MissionOrderInterface>({
    key: "",
    id: 0,
    reference: `Ref00${Math.floor(Math.random() * 1000)}`,
    status: "",
    type: "",
    startDate: "",
    endDate: "",
    presence: false,
    budget: "",
    destination: "",
    employees: [],
  });
  const [filters, setFilters] = useState({
    status: "",
    destination: "",
    startDate: "" as string | null,
    endDate: "" as string,
    presence: false,
  });
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employeeData);
  const [selectedMission, setSelectedMission] =
    useState<MissionOrderInterface | null>(null); // State for the selected mission

  const showModal = () => {
    setIsModalVisible(true);
    setFilteredEmployees(employeeData);
  };
  const showModalDetail = (mission: MissionOrderInterface) => {
    setSelectedMission(mission); // Set selected mission
    setIsModalDetailVisible(true);
  };
  const handleEmployeeSearch = (searchTerm: string) => {
    setEmployeeSearch(searchTerm);
    setFilteredEmployees(
      employeeData.filter((employee) =>
        employee.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleAddEmployee = (employee: any) => {
    if (!newEntry.employees?.find((emp) => emp.id === employee.id)) {
      setNewEntry({
        ...newEntry,
        employees: [...(newEntry.employees || []), employee],
      });
    }
  };

  const handleRemoveEmployee = (employeeId: number) => {
    setNewEntry({
      ...newEntry,
      employees: newEntry.employees?.filter((emp) => emp.id !== employeeId),
    });
  };

  const handleAddMission = () => {
    const newMission = {
      ...newEntry,
      id: dataSource.length + 1,
      key: (dataSource.length + 1).toString(),
    };
    setDataSource([newMission, ...dataSource]);
    setIsModalVisible(false);
    setNewEntry({
      key: "",
      id: 0,
      reference: `Ref00${Math.floor(Math.random() * 1000)}`,
      status: "",
      type: "",
      startDate: "",
      endDate: "",
      presence: false,
      budget: "",
      destination: "",
      employees: [],
    });
  };

  const handleSearch = () => {
    const filteredData = templatedata.filter((mission) => {
      const matchStatus = !filters.status || mission.status === filters.status;
      const matchDestination =
        !filters.destination ||
        mission.destination.includes(filters.destination);
      const matchPresence = mission.presence === filters.presence;
      const matchStartDate =
        !filters.startDate ||
        moment(mission.startDate).isSameOrAfter(moment(filters.startDate));
      const matchEndDate =
        !filters.endDate ||
        moment(mission.endDate).isSameOrBefore(moment(filters.endDate));

      return (
        matchStatus &&
        matchDestination &&
        matchPresence &&
        matchStartDate &&
        matchEndDate
      );
    });
    setDataSource(filteredData as any);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      destination: "",
      startDate: null,
      endDate: "",
      presence: false,
    });
    setDataSource(
      templatedata.map((mission: any) => ({
        ...mission,
        key: mission.id.toString(),
        employees: mission.employees
          ? {
              ...mission.employees,
              key: mission.employees.id.toString(), // Add a unique key for the employee
            }
          : null, // Ensure the employees object is handled correctly if missing
      }))
    );
  };

  useEffect(() => {
    setDataSource(
      templatedata.map((mission: any) => ({
        ...mission,
        key: mission.id.toString(),
        employees: mission.employees
          ? {
              ...mission.employees,
              key: mission.employees.id.toString(), // Add a unique key for the employee
            }
          : null, // Ensure the employees object is handled correctly if missing
      }))
    );
  }, []);
  const [isModalVisibleNew, setIsModalVisibleNew] = useState(false);

  const showModalNew = () => setIsModalVisibleNew(true);
  const hideModalNew = () => setIsModalVisibleNew(false);
  const handleConfirm = () => {
    // Add confirmation logic here
    hideModalNew();
  };
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
            <Col xs={12} md={4}>
              <Form.Item label="Statut">
                <Select
                  value={filters.status}
                  onChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Pending">En attente</Select.Option>
                  <Select.Option value="Approved">Approuvé</Select.Option>
                  <Select.Option value="Rejected">Rejeté</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={4}>
              <Form.Item label="Destination">
                <Input
                  value={filters.destination}
                  onChange={(e) =>
                    setFilters({ ...filters, destination: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={2}>
              <Form.Item label="Présence">
                <Switch
                  checked={filters.presence}
                  onChange={(checked) =>
                    setFilters({ ...filters, presence: checked })
                  }
                />
              </Form.Item>
            </Col>
         <Col span={2}/>
            <Col xs={24} md={12}>

              <Button
                type="primary"
                onClick={handleSearch}
                style={{ backgroundColor: "#6195d4", marginRight: 8 }}
              >
                <SearchOutlined /> Rechercher
              </Button>
              <Button
                type="default"
                onClick={handleClearFilters}
                style={{ backgroundColor: "orange" }}
              >
                <ClearOutlined /> Réinitialiser
              </Button>
              <Button
                type="primary"
                onClick={showModal}
                style={{ backgroundColor: "#79ba8a", marginLeft: 8 }}
              >
                <AppstoreAddOutlined /> Ajouter une Mission
              </Button>
              <Button type="primary" onClick={showModalNew} style={{ backgroundColor: "#6195d4", marginLeft: 8 }}
              >
                Calculer budget
              </Button>
            </Col>
            <Col xs={12} md={4}>
              <Form.Item label="Date début">
                <DatePicker
                  style={{ width: "100%" }}
                  value={filters.startDate ? moment(filters.startDate) : null}
                  onChange={(date) =>
                    setFilters({
                      ...filters,
                      startDate: date?.toISOString() || null,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={4}>
              <Form.Item label="Date fin">
                <DatePicker
                  style={{ width: "100%" }}
                  value={filters.endDate ? moment(filters.endDate) : null}
                  onChange={(date) =>
                    setFilters({
                      ...filters,
                      endDate: date?.toISOString() || "",
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Table
        dataSource={dataSource}
        columns={[
          {
            title: "Référence",
            dataIndex: "reference",
            key: "reference",
            render: (reference: string, mission: MissionOrderInterface) => (
              <a onClick={() => showModalDetail(mission)}>{reference}</a>
            ),
          },
          { title: "Statut", dataIndex: "status", key: "status" },
          {
            title: "presence",
            dataIndex: "presence",
            key: "presence",
            render: (presence: boolean) => {
              return (
                <span
                  style={
                    presence === false ? { color: "green" } : { color: "red" }
                  }
                >
                  {presence === false ? "Presentiel" : "A distance"}
                </span>
              );
            },
          },
          { title: "Budget", dataIndex: "budget", key: "budget" },
          {
            title: "Destination",
            dataIndex: "destination",
            key: "destination",
          },
          { title: "Date de début", dataIndex: "startDate", key: "startDate" },
          { title: "Date de fin", dataIndex: "endDate", key: "endDate" },
        ]}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Détails de la mission"
        visible={isModalDetailVisible}
        onOk={() => setIsModalDetailVisible(false)}
        onCancel={() => setIsModalDetailVisible(false)}
        width={800}
      >
        {selectedMission && (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <p>
                  <strong>Référence:</strong> {selectedMission.reference}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Statut:</strong> {selectedMission.status}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Type de mission:</strong> {selectedMission.type}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Budget:</strong> {selectedMission.budget}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Destination:</strong> {selectedMission.destination}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Date de début:</strong>{" "}
                  {selectedMission.startDate
                    ? moment(selectedMission.startDate).format("DD/MM/YYYY")
                    : ""}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Date de fin:</strong>{" "}
                  {selectedMission.endDate
                    ? moment(selectedMission.endDate).format("DD/MM/YYYY")
                    : ""}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Présence:</strong>{" "}
                  {selectedMission.presence ? "À distance" : "Présentiel"}
                </p>
              </Col>
            </Row>

            <h3>Employés assignés:</h3>
            <List
              bordered
              dataSource={employeeData}
              renderItem={(employee) => (
                <List.Item>
                  {employee.fullname} - {employee.position}
                </List.Item>
              )}
            />
          </>
        )}
      </Modal>

      <Modal
        title="Ajouter une nouvelle mission"
        visible={isModalVisible}
        onOk={handleAddMission}
        onCancel={() => setIsModalVisible(false)}
        okText="Ajouter"
        cancelText="Annuler"
        width={800}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Référence">
                <Input value={newEntry.reference} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Destination">
                <Input
                  value={newEntry.destination}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, destination: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Budget">
                <Input
                  value={newEntry.budget}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, budget: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Présence">
                <Switch
                  checked={newEntry.presence}
                  onChange={(checked) =>
                    setNewEntry({ ...newEntry, presence: checked })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Date de début de mission">
                <DatePicker
                  style={{ width: "100%" }}
                  value={newEntry.startDate ? moment(newEntry.startDate) : null}
                  onChange={(date) =>
                    setNewEntry({
                      ...newEntry,
                      startDate: date ? date.toISOString() : "",
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Date de fin de mission">
                <DatePicker
                  style={{ width: "100%" }}
                  value={newEntry.endDate ? moment(newEntry.endDate) : null}
                  onChange={(date) =>
                    setNewEntry({
                      ...newEntry,
                      endDate: date ? date.toISOString() : "",
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Chercher Employés">
            <Input
              placeholder="Rechercher par nom"
              value={employeeSearch}
              onChange={(e) => handleEmployeeSearch(e.target.value)}
            />
          </Form.Item>
          <List
            bordered
            dataSource={filteredEmployees}
            renderItem={(employee) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    onClick={() => handleAddEmployee(employee)}
                  >
                    Ajouter
                  </Button>,
                ]}
              >
                {employee.fullname} - {employee.position}
              </List.Item>
            )}
          />

          <Form.Item label="Employés assignés">
            <List
              bordered
              dataSource={newEntry.employees}
              renderItem={(employee) => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      danger
                      onClick={() => handleRemoveEmployee(employee.id)}
                    >
                      Retirer
                    </Button>,
                  ]}
                >
                  {employee.fullname} - {employee.position}
                </List.Item>
              )}
            />
          </Form.Item>
        </Form>
      </Modal>

      <NewModal
        isVisible={isModalVisibleNew}
        onClose={hideModalNew}
        onConfirm={handleConfirm}
        title="Custom Modal Title"
        content={<div>Custom content goes here.</div>}
      />
    </>
  );
};

export default ListeMission;
