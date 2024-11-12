import React, { useState } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Tabs,
  Input,
  Row,
  Select,
  DatePicker,
} from "antd";
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  SaveOutlined,
  ClearOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import Title from "antd/es/typography/Title";
import Editique from "./Editique";
import GestionCV from "./GestionDeCV";
import Contrat from "../../data/Contrat.json"; // JSON data
import moment from "moment";

interface ContratInterface {
  id_contrat: number;
  date_signature: string;
  type_contrat: string;
  conditionsSpeciales: string;
  dateDebutContrat: string;
  dateFinContrat: string;
  archived: boolean;
  reference_employee: string;
  nom_complet: string;
  editable?: boolean; // new field to toggle edit mode
  disabled?:boolean 
}

const Document: React.FC = () => {
  const [dataSource, setDataSource] = useState<ContratInterface[]>(Contrat);
  const [count, setCount] = useState<number>(
    Contrat.length ? Math.max(...Contrat.map((item) => item.id_contrat)) : 0
  );

  const handleAdd = () => {
    const newData: ContratInterface = {
      id_contrat: count + 1,
      date_signature: "",
      type_contrat: "",
      conditionsSpeciales: "",
      dateDebutContrat: "",
      dateFinContrat: "",
      archived: false,
      reference_employee: "",
      nom_complet: "",
      editable: true, // make new row editable
      disabled:true
    };
    // Prepend the new row at the top of the dataSource
    setDataSource([newData, ...dataSource]);
    setCount(count + 1);
  };

  const handleDelete = (id: number) => {
    const newData = dataSource.filter((item) => item.id_contrat !== id);
    setDataSource(newData);
  };

  const handleSave = (id: number) => {
    setDataSource(
      dataSource.map((item) =>
        item.id_contrat === id ? { ...item, editable: false } : item
      )
    );
  };

  const handleInputChange = (
    id: number,
    field: keyof ContratInterface,
    value: string | boolean
  ) => {
    setDataSource(
      dataSource.map((item) =>
        item.id_contrat === id ? { ...item, [field]: value } : item
      )
    );
  };

  const columns = [
  
    {
      title: "Reference",
      dataIndex: "reference_employee",
      key: "reference_employee",
      render: (_: any, record: ContratInterface) =>
        record.editable && record.disabled? (
          <Input
            value={record.reference_employee}
            onChange={(e) =>
              handleInputChange(
                record.id_contrat,
                "reference_employee",
                e.target.value
              )
            }
          />
        ) : (
          record.reference_employee
        ),
    },
    {
      title: "Employee Name",
      dataIndex: "nom_complet",
      key: "nom_complet",
      render: (_: any, record: ContratInterface) =>
        record.editable && record.disabled? (
          <Input
            value={record.nom_complet}
            onChange={(e) =>
              handleInputChange(
                record.id_contrat,
                "nom_complet",
                e.target.value
              )
            }
          />
        ) : (
          record.nom_complet
        ),
    },
    {
      title: "Type",
      dataIndex: "type_contrat",
      key: "type_contrat",
      render: (_: any, record: ContratInterface) =>
        record.editable ? (
          <Select
            value={record.type_contrat}
            onChange={(value) =>
              handleInputChange(record.id_contrat, "type_contrat", value)
            }
            style={{ width: "100%" }}
          >
            <Select.Option value="CDD">CDD</Select.Option>
            <Select.Option value="CDI">CDI</Select.Option>
          </Select>
        ) : (
          record.type_contrat
        ),
    },
    {
      title: "Start Date",
      dataIndex: "dateDebutContrat",
      key: "dateDebutContrat",
      render: (_: any, record: ContratInterface) =>
        record.editable ? (
          <DatePicker
          style={{ width: "100%" }}
          value={
            record.dateDebutContrat
              ? moment(record.dateDebutContrat, "YYYY-MM-DD") 
              : null
          }
          onChange={(date: moment.Moment | null) =>
            handleDateChange(record.id_contrat, "dateDebutContrat", date)
          }
          
        />
        ) : (
          record.dateDebutContrat
        ),
    },
    {
      title: "End Date",
      dataIndex: "dateFinContrat",
      key: "dateFinContrat",
      render: (_: any, record: ContratInterface) =>
        record.editable ? (
          <DatePicker
          value={
            record.dateFinContrat
              ? moment(record.dateFinContrat, "YYYY-MM-DD") 
              : null
          }
          style={{ width: "100%" }}
          onChange={(date: moment.Moment | null) =>
            handleDateChange(record.id_contrat, "dateFinContrat", date)
          }
          
        />
        
        ) : (
          record.dateFinContrat
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: ContratInterface) =>
        record.editable ? (
          <>
            <Button
              type="primary"
              onClick={() => handleSave(record.id_contrat)}
              style={{ backgroundColor: "#4caf50", marginRight: 8 }}
            >
              <SaveOutlined /> Save
            </Button>
            <Button
              type="primary"
              onClick={() => handleDelete(record.id_contrat)}
              style={{ backgroundColor: "#ff6666" }}
            >
              <DeleteOutlined /> Annuler
            </Button>
          </>
        ) : (
          <>
          <Button
          type="primary"
          onClick={() => handleUpdate(record.id_contrat)}
          style={{ backgroundColor: "#4caf50", marginRight: 8 }}
        >
          <SaveOutlined /> Update
        </Button>
          <Button
            type="primary"
            onClick={() => handleDelete(record.id_contrat)}
            style={{ backgroundColor: "#ff7900" }}
          >
            <DeleteOutlined /> Archiver
          </Button>
          </>
        ),
    },
  ];
  const handleUpdate = (id: number) => {
    // Toggle the editable state for the given row
    setDataSource(
      dataSource.map((item) =>
        item.id_contrat === id ? { ...item, editable: !item.editable } : item
      )
    );
  };
  const handleDateChange = (
    id: number,
    field: keyof ContratInterface,
    date: moment.Moment | null
  ) => {
    setDataSource(
      dataSource.map((item) =>
        item.id_contrat === id
          ? { ...item, [field]: date?.format("YYYY-MM-DD") || "" } // Ensure the date is saved in the proper format
          : item
      )
    );
  };
  const [filters, setFilters] = useState({
    reference_employee: "",
    dateDebutContrat: "",
    dateFinContrat: "",
  });
 
  // Filter the data based on search inputs
  const handleSearch = () => {
    const filteredData = Contrat.map((leave) => ({
      ...leave,
      key: leave.id_contrat.toString(),
    })).filter((leave) => {
      const matchreference_employee =
        !filters.reference_employee ||
        leave.reference_employee === filters.reference_employee;

      // Handle date range comparison
      const matchdateDebutContrat =
        !filters.dateDebutContrat ||
        moment(leave.dateDebutContrat).isSame(moment(filters.dateDebutContrat));

      const matchdateFinContrat =
        !filters.dateFinContrat ||
        moment(leave.dateFinContrat).isSame(moment(filters.dateFinContrat));

      return (
        matchreference_employee && matchdateDebutContrat && matchdateFinContrat
      );
    });
    setDataSource(filteredData);
  };

  // Clear filters and reset table
  const handleClearFilters = () => {
    setFilters({
      reference_employee: "",
      dateDebutContrat: "",
      dateFinContrat: "",
    });
    setDataSource(
      Contrat.map((leave) => ({ ...leave, key: leave.id_contrat.toString() }))
    );
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
          style={{ width: "100%", marginTop: "50px" }}
          tabPosition="left"
        >
          <TabPane tab="Gestion de CV" key="1">
            <GestionCV />
          </TabPane>
          <TabPane tab="Gestion de Contrat" key="2">
            <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
              <TabPane tab="Pièce jointe" key="1">
                <Row>
                  <Col xs={24}>
                    <Title
                      level={4}
                      style={{ marginBottom: 20, color: "#214f87" }}
                    >
                      Pièce jointe
                    </Title>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Item label="reference">
                      <Input
                        placeholder="Enter Reference"
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            reference_employee: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} md={5}>
                    <Form.Item label="De">
                      <DatePicker
                        style={{ width: "100%" }}
                        value={
                          filters.dateDebutContrat
                            ? moment(filters.dateDebutContrat)
                            : null
                        }
                        onChange={(date) =>
                          setFilters({
                            ...filters,
                            dateDebutContrat: date.format("YYYY-MM-DD"),
                          })
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={12} md={5}>
                    <Form.Item label="À">
                      <DatePicker
                        style={{ width: "100%" }}
                        value={
                          filters.dateFinContrat
                            ? moment(filters.dateFinContrat)
                            : null
                        }
                        onChange={(date) =>
                          setFilters({
                            ...filters,
                            dateFinContrat: date.format("YYYY-MM-DD"),
                          })
                        }
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
                      <SearchOutlined /> Recherche
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
                      onClick={handleAdd}
                      style={{
                        backgroundColor: "#79ba8a",
                        marginRight: 20,
                        float: "right",
                      }}
                    >
                      <AppstoreAddOutlined /> Add
                    </Button>
                  </Col>
                
                </Row>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                  style={{ marginTop: 20 }}
                  rowKey="id_contrat"
                />
              </TabPane>
              <TabPane tab="Éditer Template" key="2">
                <Editique />
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </Form>
    </>
  );
};

export default Document;
