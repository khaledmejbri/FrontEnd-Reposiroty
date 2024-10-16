import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Select,
  Input,
  Card,
} from "antd";
import {
  AppstoreAddOutlined,
  ClearOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import moment from "moment";
import templatedata from "../../data/GeneralData.json";
import { Link, useNavigate } from "react-router-dom";

interface GestionCVInterface {
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
  horaires: string;
  placement: string;
  theme: string;
  titre: string;
  nomFormation: string;
  niveauFR: string;
  niveauEN: string;
}

const GestionCV: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [dataSource, setDataSource] = useState<GestionCVInterface[]>([]);


  const [filters, setFilters] = useState({
    reference: "",
    poste: "",
    stage: "",
    startDate: null as moment.Moment | null,
    endDate: null as moment.Moment | null,
    nom: "",
    placement: "",
    diplome: "",
    entreprise:""
  });

  const columns = [
    {
      title: "Référence",
      dataIndex: "reference",
      key: "reference",
      render: (text: string, record: GestionCVInterface) => (
        <Link to={`/documents/gestionCV/details/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Poste",
      dataIndex: "poste",
      key: "poste",
    },
    {
      title: "Entreprise",
      dataIndex: "entreprise",
      key: "entreprise",
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
    },
    {
      title: "Diplome",
      dataIndex: "diplome",
      key: "diplome",
    },
  ];

  const handleSearch = () => {
  const filteredData = templatedata
    .map((missionOrder) => ({
      ...missionOrder,
      key: missionOrder.id.toString(),
      Horaires: missionOrder.horaires || "", // Ensure Horaires is set
      NiveauFR: missionOrder.niveauFR || "", // Ensure NiveauFR is set
      NiveauEN: missionOrder.niveauEN || "", // Ensure NiveauEN is set
    }))
    .filter((missionOrder) => {
      const matchReference =
        !filters.reference ||
        missionOrder.reference.includes(filters.reference);
      const matchposte =
        !filters.poste || missionOrder.poste === filters.poste;
      const matchstage =
        !filters.stage || missionOrder.stage === filters.stage;
      const matchdiplome =
        !filters.diplome || missionOrder.diplome === filters.diplome;
      const matchNom = !filters.nom || missionOrder.nom === filters.nom;
      const matchplacement =
        !filters.placement || missionOrder.placement === filters.placement;
      return (
        matchReference &&
        matchposte &&
        matchstage &&
        matchNom &&
        matchplacement &&
        matchdiplome
      );
    });
  setDataSource(filteredData);
};
  const handleClearFilters = () => {
  setFilters({
    reference: "",
    poste: "",
    stage: "",
    startDate: null,
    endDate: null,
    nom: "",
    placement: "",
    diplome: "",
    entreprise: ""
  });
  setDataSource(
    templatedata.map((missionOrder) => ({
      ...missionOrder,
      key: missionOrder.id.toString(),
      horaires: missionOrder.horaires || "", 
      niveauFR: missionOrder.niveauFR || "", 
      niveauEN: missionOrder.niveauEN || "", 
    }))
  );
};


 


  useEffect(() => {
  setDataSource(
    templatedata.map((missionOrder) => ({
      ...missionOrder,
      key: missionOrder.id.toString(),
      horaires: missionOrder.horaires || "", // Ensure Horaires is set
      niveauFR: missionOrder.niveauFR || "", // Ensure NiveauFR is set
      niveauEN: missionOrder.niveauEN || "", // Ensure NiveauEN is set
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
                Liste des CVs
              </Title>
            </Col>

            <Col xs={12} md={5}>
              <Form.Item label="Nom">
                <Select
                  showSearch
                  value={filters.nom}
                  onChange={(value) => setFilters({ ...filters, nom: value })}
                  placeholder="Chercher par nom"
                  optionFilterProp="children"
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
              <Form.Item label="Poste">
                <Select
                  value={filters.poste}
                  onChange={(value) => setFilters({ ...filters, poste: value })}
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Développeur stagiaire">
                    Développeur stagiaire
                  </Select.Option>
                  <Select.Option value="Chef de projet">
                    Chef de projet
                  </Select.Option>
                  <Select.Option value="Développeur Web Junior">
                    Développeur Web Junior
                  </Select.Option>
                  <Select.Option value="Analyste">Analyste</Select.Option>
                
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="entreprise">
                <Input
                  value={filters.entreprise}
                  onChange={(e) =>
                    setFilters({ ...filters, entreprise: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#79ba8a",
                  marginRight: 20,
                  float: "right",
                }}
                onClick={() => navigate(`/documents/gestionCV/details/${null}`)}
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
            <Col xs={12} md={5}>
              <Form.Item label="diplome">
                <Input
                  value={filters.diplome}
                  onChange={(e) =>
                    setFilters({ ...filters, diplome: e.target.value })
                  }
                  placeholder="Entrer diplome"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
      />

     
    </>
  );
};

export default GestionCV;
