import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import templatedata from '../../data/GeneralData.json'; // JSON data
import { Tabs, Input, Button, Col, Row, message } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import Editique from './Editique';
import TextArea from 'antd/es/input/TextArea';

// Define the type for the details
interface EntretienDetails {
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
  const initialDetails: EntretienDetails = selectedMission
    ? {
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
        titre: selectedMission.titre,
        nomFormation: selectedMission.nomFormation,
        niveauFR: selectedMission.niveauFR,
        niveauEN: selectedMission.niveauEN,
      }
    : {
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
        titre: "",
        nomFormation: "",
        niveauFR: "",
        niveauEN: "",
      };

  const [details, setDetails] = useState<EntretienDetails>(initialDetails);

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
    messageApi.success(selectedMission?"la modification de condidat est réussit!":"l'ajout de condidat est réussit!");
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
                    {selectedMission ? `${selectedMission.nom} ${selectedMission.prenom}` : "Nouveau Condidat"}
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
                    <Input name={key} value={details[key as keyof EntretienDetails]} onChange={handleInputChange} />
                  </Col>
                 
                ))}
               
              </Row>
              <Row >
                {Object.keys(details).map((key) => (
                  <Col span={20} key={key}>
                    {key === "description" && (
                      <TextArea
                        name={key}
                        value={details[key as keyof EntretienDetails]}
                        onChange={handleInputChange}
                        rows={4} // Multiline support for TextArea
                      />
                    ) }
                  </Col>
                ))}
              </Row>
            </div>
          </TabPane>
          
        </Tabs>
      </div>
    </>
  );
};

export default DetailPage;
