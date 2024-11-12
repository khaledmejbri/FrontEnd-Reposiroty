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
import employeData from "../../data/employes.json";
import { Link, useNavigate } from "react-router-dom";

interface EmployeInterface {
  key: string;
  reference: string;
  nom: string;
  prenom: string;
  situationFamiliale: string;
  nationalite: string;
  dateNaissance: string;
  cin: string;
  tel: string;
  adresseOfficielle: string;
  email: string;
  profession: string;
}

const GestionCV: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<EmployeInterface[]>([]);

  const [filters, setFilters] = useState({
    reference: "",
    nom: "",
    prenom: "",
    situationFamiliale: "",
    profession: "",
    nationalite: "",
  });

  const columns = [
    {
      title: "Référence",
      dataIndex: "reference",
      key: "reference",
      render: (text: string, record: EmployeInterface) => (
        <Link to={`/documents/gestionCV/details/${record.reference}`}>{text}</Link>
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
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
    },
    {
      title: "Nationalité",
      dataIndex: "nationalite",
      key: "nationalite",
    },
    {
      title: "Situation Familiale",
      dataIndex: "situationFamiliale",
      key: "situationFamiliale",
    },
  ];

  const handleSearch = () => {
    const filteredData = employeData
      .map((employe) => ({
        ...employe,
        key: employe.reference,
      }))
      .filter((employe) => {
        const matchReference =
          !filters.reference || employe.reference.includes(filters.reference);
        const matchNom = !filters.nom || employe.nom.includes(filters.nom);
        const matchPrenom = !filters.prenom || employe.prenom.includes(filters.prenom);
        const matchProfession =
          !filters.profession || employe.profession.includes(filters.profession);
        const matchNationalite =
          !filters.nationalite || employe.nationalite.includes(filters.nationalite);
        const matchSituationFamiliale =
          !filters.situationFamiliale || employe.situationFamiliale === filters.situationFamiliale;
        return (
          matchReference &&
          matchNom &&
          matchPrenom &&
          matchProfession &&
          matchNationalite &&
          matchSituationFamiliale
        );
      });
    setDataSource(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({
      reference: "",
      nom: "",
      prenom: "",
      situationFamiliale: "",
      profession: "",
      nationalite: "",
    });
    setDataSource(
      employeData.map((employe) => ({
        ...employe,
        key: employe.reference,
      }))
    );
  };

  useEffect(() => {
    setDataSource(
      employeData.map((employe) => ({
        ...employe,
        key: employe.reference,
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
                Liste des Employés
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
                    <Select.Option key={item.reference} value={item.nom}>
                      {item.nom}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="Profession">
                <Select
                  value={filters.profession}
                  onChange={(value) => setFilters({ ...filters, profession: value })}
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Ingénieur Informatique">
                    Ingénieur Informatique
                  </Select.Option>
                  <Select.Option value="Data Analyst">
                    Data Analyst
                  </Select.Option>
                  <Select.Option value="Chef de Projet">
                    Chef de Projet
                  </Select.Option>
                  <Select.Option value="Responsable RH">
                    Responsable RH
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={5}>
              <Form.Item label="Nationalité">
                <Input
                  value={filters.nationalite}
                  onChange={(e) =>
                    setFilters({ ...filters, nationalite: e.target.value })
                  }
                  placeholder="Entrer nationalité"
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
              <Form.Item label="Situation Familiale">
                <Select
                  value={filters.situationFamiliale}
                  onChange={(value) => setFilters({ ...filters, situationFamiliale: value })}
                  placeholder="Sélectionner situation familiale"
                >
                  <Select.Option value="">Tous</Select.Option>
                  <Select.Option value="Marié">Marié</Select.Option>
                  <Select.Option value="Célibataire">Célibataire</Select.Option>
                  <Select.Option value="Divorcé">Divorcé</Select.Option>
                </Select>
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
