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

interface TeamBuildingInterface {
  horaires: string; 
  placement: string;
  nom: string;
  id :number;
  nomFormation:string

  
}

const TeamBuilding: React.FC = () => {
  const [dataSource, setDataSource] = useState<TeamBuildingInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState<TeamBuildingInterface>({
    horaires: "",
    placement: "",
    nom: "",
    id :0,
    nomFormation:"",

  });

  const [filters, setFilters] = useState({
    horaires: "",
    placement: "",
    nom: "",
    id :0,
    nomFormation:"",

  });

  const columns = [
    {
      title: "nomFormation",
      dataIndex: "nomFormation", 
      key: "nomFormation",
    },
   
    {
      title: "Horaire",
      dataIndex: "horaires", 
      key: "horaires",
    },
    {
      title: "Placement",
      dataIndex: "placement",
      key: "placement",
    },
 
    {
      title: "Nom de formateur",
      dataIndex: "nom",
      key: "nom",
    },
  ];

  const handleSearch = () => {
    const filteredData = templatedata
      .map((building) => ({
        ...building,
        key: building.id.toString(),
      }))
      .filter((building) => {
        const matchHoraire = !filters.horaires || building.horaires === filters.horaires; // changed from Horaires to horaires
        const matchPlacement = !filters.placement || building.placement === filters.placement;
        const matchnom = !filters.nom || building.nom === filters.nom;
        return (
          matchPlacement &&
          matchnom &&
          matchHoraire
        );
      });

    setDataSource(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({
      nomFormation:"",
      horaires: "",
      placement: "",
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
      horaires: "",
      placement: "",
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
                Liste des Formations
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
              <Form.Item label="Horaires">
              <Select
                  showSearch
                  value={filters.horaires}
                  onChange={(value) => setFilters({ ...filters, horaires: value })}
                  placeholder="Chercher par horaires"
                  optionFilterProp="children"
                  onSelect={(e) => {
                    setFilters({ ...filters, horaires: e });
                  }}
                >
                  {dataSource.map((item) => (
                    <Select.Option key={item.id} value={item.horaires}>
                      {item.horaires}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="Placement">
              <Select
                  showSearch
                  value={filters.placement}
                  onChange={(value) => setFilters({ ...filters, placement: value })}
                  placeholder="Chercher par placement"
                  optionFilterProp="children"
                  onSelect={(e) => {
                    setFilters({ ...filters, placement: e });
                  }}
                >
                  {dataSource.map((item) => (
                    <Select.Option key={item.id} value={item.placement}>
                      {item.placement}
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
                onClick={showModal}
               
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
            <Form.Item label="Horaires">
              <Input
                value={newEntry.horaires} // changed from Horaires to horaires
                onChange={(e) => setNewEntry({ ...newEntry, horaires: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Placement">
              <Input
                value={newEntry.placement}
                onChange={(e) => setNewEntry({ ...newEntry, placement: e.target.value })}
              />
            </Form.Item>
           
           
           
          </Form>
        </Modal>
      </Card>
    </>
  );
};

export default TeamBuilding;
