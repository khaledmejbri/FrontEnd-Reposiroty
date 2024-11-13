import React, { useEffect, useState } from "react";
import { Table, Button, Form, Col, Row, Input, Upload } from "antd";
import { ClearOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Card from "antd/es/card/Card";
import Personnels from "../../data/Personnels.json";
import { Link, useNavigate } from "react-router-dom";

interface Enfant {
  nom: string;
  prenom: string;
  dateNaissance: string;
}

interface EtatStatutaire {
  statut: string;
  dateDebut: string;
  dateFin: string | null;
}

interface Affectation {
  departement: string;
  poste: string;
  dateAffectation: string;
  responsable: string;
}

interface ListDesPersonnelsInterface {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  situationFamiliale: string;
  regimeSocial: string;
  modeRemuneration: string;
  nationalite: string;
  dateNaissance: string;
  cin: string;
  passeport: string;
  tel: string;
  adresseOfficielle: string;
  conjoint: string | null;
  photo: string;
  reference: string;
  performanceRating: number;
  teamSize: number;
  enfants: Enfant[];
  etatStatutaire: EtatStatutaire;
  affectation: Affectation;
  affectationHistory: Affectation[];
}

const ListDesPersonnels: React.FC = () => {
  const [dataSource, setDataSource] = useState<ListDesPersonnelsInterface[]>([]);
  const [newEntry, setNewEntry] = useState<ListDesPersonnelsInterface>({
    id: 0,
    nom: "",
    prenom: "",
    email: "",
    situationFamiliale: "",
    regimeSocial: "",
    modeRemuneration: "",
    nationalite: "",
    dateNaissance: "",
    cin: "",
    passeport: "",
    tel: "",
    adresseOfficielle: "",
    conjoint: "",
    photo: "",
    reference: "",
    performanceRating: 0,
    teamSize: 0,
    enfants: [],
    etatStatutaire: { statut: "", dateDebut: "", dateFin: null },
    affectation: { departement: "", poste: "", dateAffectation: "", responsable: "" },
    affectationHistory: [],
  });

  const [filters, setFilters] = useState({
    nom: "",
  });

  useEffect(() => {
    // Ensures Personnels data matches ListDesPersonnelsInterface before setting it as state
    const validatedData = Personnels.map((personnel: any) => ({
      ...newEntry, // Use default structure from newEntry to ensure all fields are present
      ...personnel,
    }));
    setDataSource(validatedData);
  }, [newEntry]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nom", dataIndex: "nom", key: "nom" ,
    render: (text: string, record: ListDesPersonnelsInterface) => (
      <Link to={`/personnel/details/${record.id}`}>{text}</Link>
    ),},
    { title: "Prenom", dataIndex: "prenom", key: "prenom" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Situation Familiale", dataIndex: "situationFamiliale", key: "situationFamiliale" },
    { title: "Regime Social", dataIndex: "regimeSocial", key: "regimeSocial" },
    { title: "Mode Remuneration", dataIndex: "modeRemuneration", key: "modeRemuneration" },
    { title: "Nationalite", dataIndex: "nationalite", key: "nationalite" },
    { title: "Date Naissance", dataIndex: "dateNaissance", key: "dateNaissance" },
    { title: "CIN", dataIndex: "cin", key: "cin" },
    { title: "Passeport", dataIndex: "passeport", key: "passeport" },
    { title: "Tel", dataIndex: "tel", key: "tel" },
    { title: "Adresse Officielle", dataIndex: "adresseOfficielle", key: "adresseOfficielle" },
    { title: "Conjoint", dataIndex: "conjoint", key: "conjoint" },
    { title: "Photo", dataIndex: "photo", key: "photo" },
    { title: "Reference", dataIndex: "reference", key: "reference" },
    { title: "Performance Rating", dataIndex: "performanceRating", key: "performanceRating" },
    {
      title: "Enfants",
      dataIndex: "enfants",
      key: "enfants",
      render: (enfants: Enfant[]) => enfants.map((enfant, index) => (
        <div key={index}>{`${enfant.nom} ${enfant.prenom}`}</div>
      )),
    },
    {
      title: "État Statutaire",
      dataIndex: "etatStatutaire",
      key: "etatStatutaire",
      render: (etatStatutaire: EtatStatutaire) =>
        etatStatutaire
          ? `${etatStatutaire.statut} (du ${etatStatutaire.dateDebut} ${etatStatutaire.dateFin ? `au ${etatStatutaire.dateFin}` : "à présent"})`
          : "Non défini",
    },
    {
      title: "Affectation Actuelle",
      dataIndex: "affectation",
      key: "affectation",
      render: (affectation: Affectation) =>
        affectation
          ? `${affectation.poste} - ${affectation.departement} (depuis ${affectation.dateAffectation})`
          : "Non affecté",
    },
    {
      title: "Historique d'Affectation",
      dataIndex: "affectationHistory",
      key: "affectationHistory",
      render: (affectationHistory: Affectation[]) =>
        affectationHistory.length > 0
          ? affectationHistory.map((affectation, index) => (
              <div key={index}>
                {`${affectation.poste} - ${affectation.departement} (à partir de ${affectation.dateAffectation})`}
              </div>
            ))
          : "Aucun historique",
    },
  ];

  const handleSearch = () => {
    const filteredData = dataSource.filter((leave) =>
      leave.nom.includes(filters.nom)
    );
    setDataSource(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({ nom: "" });
    setDataSource(Personnels.map((personnel: any) => ({
      ...newEntry,
      ...personnel,
    })));
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        setDataSource(jsonData);
      } catch (error) {
        console.error("Invalid JSON file:", error);
      }
    };
    reader.readAsText(file);
    return false;
  };
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <>
      <Card>
        <Form layout="horizontal" initialValues={{ size: "default" }}>
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 20, color: "#214f87" }}>
                List Des Employeer
              </Title>
            </Col>
            <Col xs={12} md={6}>
              <Form.Item label="Employe Name">
                <Input
                  value={filters.nom}
                  onChange={(e) => setFilters({ ...filters, nom: e.target.value })}
                  placeholder="Chercher par Nom"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Button
                type="primary"
                onClick={handleSearch}
                style={{ backgroundColor: "#6195d4", marginRight: 20, float: 'right', marginLeft: 20 }}
              >
                <SearchOutlined /> Recherche
              </Button>
              <Button
                type="default"
                onClick={handleClearFilters}
                style={{ backgroundColor: "orange", marginRight: 20, float: 'right' }}
              >
                <ClearOutlined /> Clear
              </Button>
              <Button
                type="default"
                onClick={() => navigate("/personnel/details/new")}
                 style={{ backgroundColor: "orange", marginRight: 20, float: 'right' }}
              >
                <ClearOutlined /> Ajouter
              </Button>
              <Form.Item name="upload" label="Upload" valuePropName="fileList" extra="">
                <Upload accept=".json" showUploadList={false} beforeUpload={handleUpload}>
                  <Button icon={<UploadOutlined />} style={{ width: '150px' }} />
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 'max-content' }} />
      </Card>
    </>
  );
};

export default ListDesPersonnels;
