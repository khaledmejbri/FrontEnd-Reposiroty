import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Select,
  Modal,
  Input,
} from "antd";
import {
  AppstoreAddOutlined,
  ClearOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import templatedata from "../../data/GeneralData.json";
import Card from "antd/es/card/Card";
import { Link, useNavigate } from "react-router-dom";

interface TeamBuildingInterface {
  niveauEN: string; 
  niveauFR: string;
  nom: string;
  id :number;
  nomFormation:string

  
}

const TeamBuilding: React.FC = () => {
  const [dataSource, setDataSource] = useState<TeamBuildingInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState<TeamBuildingInterface>({
    niveauEN: "",
    niveauFR: "",
    nom: "",
    id :0,
    nomFormation:"",

  });

  const [filters, setFilters] = useState({
    niveauEN: "",
    niveauFR: "",
    nom: "",
    id :0,
    nomFormation:"",

  });

  const columns = [
    {
      title: "Nom de Condidat",
      dataIndex: "nom",
      key: "nom",
      render: (text: string, record: TeamBuildingInterface) => (
        <Link to={`entretien/details/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Nom de Formation",
      dataIndex: "nomFormation", 
      key: "nomFormation",
    },
   
    {
      title: "Niveau FR",
      dataIndex: "niveauFR", 
      key: "niveauFR",
    },
    {
      title: "Niveau EN",
      dataIndex: "niveauEN",
      key: "niveauEN",
    },
    {
      title: "escription",
      dataIndex: "description",
      key: "description",
    },
 
    
  ];
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = () => {
    const filteredData = templatedata
      .map((building) => ({
        ...building,
        key: building.id.toString(),
      }))
      .filter((building) => {
        const matchniveauEN = !filters.niveauEN || building.niveauEN === filters.niveauEN; 
        const matchniveauFR = !filters.niveauFR || building.niveauFR === filters.niveauFR;
        const matchnom = !filters.nom || building.nom === filters.nom;
        return (
          matchniveauFR &&
          matchnom &&
          matchniveauEN
        );
      });

    setDataSource(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({
      nomFormation:"",
      niveauEN: "",
      niveauFR: "",
      nom: "",
      id :0,
    });
    setDataSource(
      templatedata.map((building) => ({
        ...building,
        key: building.id.toString(),
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
      reference: `Ref00${(dataSource.length + 1).toString()}`,
    };
    setDataSource([newData, ...dataSource]);
    setIsModalVisible(false);
    setNewEntry({
      id :0,
      niveauEN: "",
      niveauFR: "",
      nom: "",
      nomFormation:"",

    });
  };

  useEffect(() => {
    setDataSource(
      templatedata.map((building) => ({
        ...building,
        key: building.id.toString(),
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
                Liste des Entretiens
              </Title>
            </Col>

            <Col xs={12} md={5}>
              <Form.Item label="nomFormation">
                <Select
                  showSearch
                  value={filters.nomFormation}
                  onChange={(value) => setFilters({ ...filters, nomFormation: value })}
                  placeholder="Chercher par nomFormation"
                  optionFilterProp="children"
                  onSelect={(e) => {
                    setFilters({ ...filters, nomFormation: e });
                  }}
                >
                  {dataSource.map((item) => (
                    <Select.Option key={item.id} value={item.nomFormation}>
                      {item.nomFormation}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
           
            <Col xs={12} md={5}>
              <Form.Item label="niveauEN">
              <Select
                  showSearch
                  value={filters.niveauEN}
                  onChange={(value) => setFilters({ ...filters, niveauEN: value })}
                  placeholder="Chercher par niveauEN"
                  optionFilterProp="children"
                  onSelect={(e) => {
                    setFilters({ ...filters, niveauEN: e });
                  }}
                >
                  {dataSource.map((item) => (
                    <Select.Option key={item.id} value={item.niveauEN}>
                      {item.niveauEN}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="niveauFR">
              <Select
                  showSearch
                  value={filters.niveauFR}
                  onChange={(value) => setFilters({ ...filters, niveauFR: value })}
                  placeholder="Chercher par niveauFR"
                  optionFilterProp="children"
                  onSelect={(e) => {
                    setFilters({ ...filters, niveauFR: e });
                  }}
                >
                  {dataSource.map((item) => (
                    <Select.Option key={item.id} value={item.niveauFR}>
                      {item.niveauFR}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={9}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#79ba8a",
                  marginRight: 20,
                  float: "right",
                }}
                onClick={() => navigate(`entretien/details/${null}`)}

               
              >
                <AppstoreAddOutlined /> Ajouter
              </Button>
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
            </Col>
        
            

          
           
          </Row>
        </Form>

        <Table dataSource={dataSource} columns={columns} />

        <Modal
          title="Ajouter une nouvelle mission"
          visible={isModalVisible}
          onOk={handleAddEntry}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form layout="vertical">
          <Form.Item label="nom">
              <Input
                value={newEntry.nom}
                onChange={(e) => setNewEntry({ ...newEntry, nom: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="niveauEN">
              <Input
                value={newEntry.niveauEN} // changed from niveauEN to niveauEN
                onChange={(e) => setNewEntry({ ...newEntry, niveauEN: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="niveauFR">
              <Input
                value={newEntry.niveauFR}
                onChange={(e) => setNewEntry({ ...newEntry, niveauFR: e.target.value })}
              />
            </Form.Item>
           
           
           
          </Form>
        </Modal>
      </Card>
    </>
  );
};

export default TeamBuilding;
