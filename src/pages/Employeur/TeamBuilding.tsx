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
  key: string;
  id: number;
  reference: string;
  nom: string;
  prenom: string;
  stage: string;
  entreprise: string;
  poste: string;
  diplome: string;
  etablissement: string;
  dateobtenation: string;
  niveau: string;
  description: string;
  duree: string;
  horaires: string; // changed from Horaires to horaires
  placement: string;
  theme: string;
  titre: string;
  nomFormation: string;
  niveauFR: string; // changed from NiveauFR to niveauFR
  niveauEN: string; // changed from NiveauEN to niveauEN
}

const TeamBuilding: React.FC = () => {
  const [dataSource, setDataSource] = useState<TeamBuildingInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState<TeamBuildingInterface>({
    key: "",
    id: 0,
    reference: "",
    nom: "",
    prenom: "",
    stage: "",
    entreprise: "",
    poste: "",
    diplome: "",
    etablissement: "",
    dateobtenation: "",
    niveau: "",
    description: "",
    duree: "",
    horaires: "", // changed from Horaires to horaires
    placement: "",
    theme: "",
    titre: "",
    nomFormation: "",
    niveauFR: "", // changed from NiveauFR to niveauFR
    niveauEN: "", // changed from NiveauEN to niveauEN
  });

  const [filters, setFilters] = useState({
    horaire: "",
    placement: "",
    titre: "",
    theme: "",
  });

  const columns = [
   
    {
      title: "Horaire",
      dataIndex: "horaires", // changed from Horaires to horaires
      key: "horaires",
    },
    {
      title: "Placement",
      dataIndex: "placement",
      key: "placement",
    },
    {
      title: "Thème",
      dataIndex: "theme",
      key: "theme",
    },
    {
      title: "Titre",
      dataIndex: "titre",
      key: "titre",
    },
  ];

  const handleSearch = () => {
    const filteredData = templatedata
      .map((building) => ({
        ...building,
        key: building.id.toString(),
      }))
      .filter((building) => {
        const matchHoraire = !filters.horaire || building.horaires === filters.horaire; // changed from Horaires to horaires
        const matchPlacement = !filters.placement || building.placement === filters.placement;
        const matchTheme = !filters.theme || building.theme === filters.theme;
        const matchTitre = !filters.titre || building.titre === filters.titre;
        return (
          matchPlacement &&
          matchTheme &&
          matchTitre &&
          matchHoraire
        );
      });

    setDataSource(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({
      horaire: "",
      placement: "",
      titre: "",
      theme: "",
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
      key: "",
      id: 0,
      reference: "",
      nom: "",
      prenom: "",
      stage: "",
      entreprise: "",
      poste: "",
      diplome: "",
      etablissement: "",
      dateobtenation: "",
      niveau: "",
      description: "",
      duree: "",
      horaires: "",
      placement: "",
      theme: "",
      titre: "",
      nomFormation: "",
      niveauFR: "", 
      niveauEN: "", 
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
                Liste des ordres de mission
              </Title>
            </Col>

            <Col xs={12} md={5}>
              <Form.Item label="Nom">
                <Select
                  showSearch
                  value={filters.titre}
                  onChange={(value) => setFilters({ ...filters, titre: value })}
                  placeholder="Chercher par nom"
                  optionFilterProp="children"
                  onSelect={(e) => {
                    setFilters({ ...filters, titre: e });
                  }}
                >
                  {dataSource.map((item) => (
                    <Select.Option key={item.id} value={item.nom}>
                      {item.nom}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
           
            <Col xs={12} md={5}>
              <Form.Item label="Horaires">
                <Select
                  value={filters.horaire}
                  onChange={(value) => setFilters({ ...filters, horaire: value })}
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Horaire 1">Horaire 1</Select.Option>
                  <Select.Option value="Horaire 2">Horaire 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="Placement">
                <Select
                  value={filters.placement}
                  onChange={(value) => setFilters({ ...filters, placement: value })}
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Placement 1">Placement 1</Select.Option>
                  <Select.Option value="Placement 2">Placement 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="Thème">
                <Select
                  value={filters.theme}
                  onChange={(value) => setFilters({ ...filters, theme: value })}
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Thème 1">Thème 1</Select.Option>
                  <Select.Option value="Thème 2">Thème 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="Titre">
                <Select
                  value={filters.titre}
                  onChange={(value) => setFilters({ ...filters, titre: value })}
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Titre 1">Titre 1</Select.Option>
                  <Select.Option value="Titre 2">Titre 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                Chercher
              </Button>
            </Col>
            <Col xs={12} md={5}>
              <Button
                type="default"
                icon={<ClearOutlined />}
                onClick={handleClearFilters}
              >
                Effacer
              </Button>
            </Col>
            <Col xs={24}>
              <Button
                type="primary"
                icon={<AppstoreAddOutlined />}
                onClick={showModal}
              >
                Ajouter une mission
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
          <Form.Item label="Titre">
              <Input
                value={newEntry.titre}
                onChange={(e) => setNewEntry({ ...newEntry, titre: e.target.value })}
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
            <Form.Item label="Thème">
              <Input
                value={newEntry.theme}
                onChange={(e) => setNewEntry({ ...newEntry, theme: e.target.value })}
              />
            </Form.Item>
           
           
          </Form>
        </Modal>
      </Card>
    </>
  );
};

export default TeamBuilding;
