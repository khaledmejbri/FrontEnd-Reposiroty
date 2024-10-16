import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import templatedata from '../../data/GeneralData.json'; // JSON data
import { Tabs, Input, Button, Col, Row, message } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import Editique from './Editique';

// Define the type for the details
interface MissionDetails {
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

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the 'id' from the URL

  // Find the data that matches the id
  const selectedMission = templatedata.find((mission) => mission.id === Number(id));

  // Set up state for the editable fields
  const initialDetails: MissionDetails = selectedMission
    ? {
        reference: selectedMission.reference,
        nom: selectedMission.nom,
        prenom: selectedMission.prenom,
        stage: selectedMission.stage,
        entreprise: selectedMission.entreprise,
        poste: selectedMission.poste,
        diplome: selectedMission.diplome,
        etablissement: selectedMission.etablissement,
        dateobtenation: selectedMission.dateobtenation,
        niveau: selectedMission.niveau,
        description: selectedMission.description,
        duree: selectedMission.duree,
        horaires: selectedMission.horaires,
        placement: selectedMission.placement,
        theme: selectedMission.theme,
        titre: selectedMission.titre,
        nomFormation: selectedMission.nomFormation,
        niveauFR: selectedMission.niveauFR,
        niveauEN: selectedMission.niveauEN,
      }
    : {
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
      };

  const [details, setDetails] = useState<MissionDetails>(initialDetails);

  // If the mission is not found, display an error
  if (!selectedMission && !Object.keys(details).length) {
    return <div>Data not found. Please fill in the details below to add a new mission.</div>;
  }

  // Handler for updating the input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  // Message API for displaying notifications
  const [messageApi, contextHolder] = message.useMessage();

  // Handler for displaying the info message
  const handleSave = () => {
    messageApi.success('Details updated successfully!');
  };

  return (
    <>
      {contextHolder} {/* This renders the context for the message */}
      <div style={{ padding: '20px' }}>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="Données Générale" key="1">
            <div style={{ backgroundColor: "#ffff", padding: 20 }}>
              <Row>
                <Col span={22}>
                  <h2 style={{ color: "#6195d4" }}>
                    {selectedMission ? `${selectedMission.reference} - ${selectedMission.nom} ${selectedMission.prenom}` : "Nouveau Mission"}
                  </h2>
                </Col>
                <Col span={2}>
                  <Button onClick={handleSave} style={{ backgroundColor: "#79ba8a", color: "#ffff" }}>
                    Enregistrer
                  </Button>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                {Object.keys(details).map((key) => (
                  <Col span={4} key={key}>
                    <label style={{ color: "#1b5caa" }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                    <Input name={key} value={details[key as keyof MissionDetails]} onChange={handleInputChange} />
                  </Col>
                ))}
              </Row>
            </div>
          </TabPane>
          <TabPane tab="Edite Template" key="2">
            <Editique />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default DetailPage;
