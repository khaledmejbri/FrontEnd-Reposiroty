import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import employeData from '../../data/employes.json'; // JSON data
import { Tabs, Input, Button, Col, Row, message } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import Editique from './Editique';

// Define the type for the employee details and additional sections
interface EmployeeDetails {
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
  diplomes: Diplome[];
  experiencesProfessionnelles: Experience[];
  stages: Stage[];
}

interface Stage {
  intitule: string;
  duree: number;
  entreprise: string;
}

interface Diplome {
  etablissement: string;
  dateObtention: string;
  mention: string;
}

interface Experience {
  poste: string;
  duree: number;
  entreprise: string;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the 'reference' from the URL

  // Find the employee data that matches the reference in the URL
  const selectedEmployee = employeData.find((employee) => employee.reference === id);

  // Initialize state for employee details, with empty lists for 'id' null
  const [details, setDetails] = useState<EmployeeDetails | null>(selectedEmployee || {
    reference: '',
    nom: '',
    prenom: '',
    situationFamiliale: '',
    nationalite: '',
    dateNaissance: '',
    cin: '',
    tel: '',
    adresseOfficielle: '',
    email: '',
    profession: '',
    diplomes: [{ etablissement: '', dateObtention: '', mention: '' }], // One empty Diplome
    experiencesProfessionnelles: [{ poste: '', duree: 0, entreprise: '' }], // One empty Experience
    stages: [{ intitule: '', duree: 0, entreprise: '' }], // One empty Stage
  });

  useEffect(() => {
    if (!selectedEmployee && id !== 'null') {
      setDetails({
        reference: '',
        nom: '',
        prenom: '',
        situationFamiliale: '',
        nationalite: '',
        dateNaissance: '',
        cin: '',
        tel: '',
        adresseOfficielle: '',
        email: '',
        profession: '',
        diplomes: [{ etablissement: '', dateObtention: '', mention: '' }],
        experiencesProfessionnelles: [{ poste: '', duree: 0, entreprise: '' }],
        stages: [{ intitule: '', duree: 0, entreprise: '' }],
      });
    } else if (selectedEmployee) {
      setDetails(selectedEmployee);
    }
  }, [id, selectedEmployee]);

  // Message API for displaying notifications
  const [messageApi, contextHolder] = message.useMessage();

  // Handlers to update input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => (prevDetails ? { ...prevDetails, [name]: value } : null));
  };

  // Add new Diplôme
  const addDiplome = () => {
    setDetails((prevDetails) => {
      if (prevDetails) {
        const updatedDiplomes = [...prevDetails.diplomes, { etablissement: '', dateObtention: '', mention: '' }];
        return { ...prevDetails, diplomes: updatedDiplomes };
      }
      return prevDetails;
    });
  };

  // Add new Experience
  const addExperience = () => {
    setDetails((prevDetails) => {
      if (prevDetails) {
        const updatedExperiences = [...prevDetails.experiencesProfessionnelles, { poste: '', duree: 0, entreprise: '' }];
        return { ...prevDetails, experiencesProfessionnelles: updatedExperiences };
      }
      return prevDetails;
    });
  };

  // Add new Stage
  const addStage = () => {
    setDetails((prevDetails) => {
      if (prevDetails) {
        const updatedStages = [...prevDetails.stages, { intitule: '', duree: 0, entreprise: '' }];
        return { ...prevDetails, stages: updatedStages };
      }
      return prevDetails;
    });
  };

  const handleSave = () => {
    messageApi.success('Details updated successfully!');
  };

  if (!details) {
    return <div>Loading employee data...</div>;
  }

  return (
    <>
      {contextHolder}
      <div style={{ padding: '20px' }}>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="Données Générales" key="1">
            <div style={{ backgroundColor: "#ffff", padding: 20 }}>
              <Row>
                <Col span={22}>
                  <h2 style={{ color: "#6195d4" }}>
                    {id === 'null' ? 'Add New Employee' : `${details.reference} - ${details.nom} ${details.prenom}`}
                  </h2>
                </Col>
                <Col span={2}>
                  <Button onClick={handleSave} style={{ backgroundColor: "#79ba8a", color: "#ffff" }}>
                    Enregistrer
                  </Button>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                {Object.keys(details).filter(key => typeof details[key as keyof EmployeeDetails] !== 'object').map((key) => (
                  <Col span={8} key={key}>
                    <label style={{ color: "#1b5caa" }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </label>
                    <Input name={key} value={details[key as keyof EmployeeDetails] as string} onChange={handleInputChange} />
                  </Col>
                ))}
              </Row>

              {/* Diplômes Section */}
              <h3>Diplômes</h3>
              {details.diplomes.map((diplome, index) => (
                <Row gutter={[16, 16]} key={index} style={{marginBottom:'20px'}}>
                  <Col span={8}>
                    <Input
                      placeholder="Etablissement"
                      value={diplome.etablissement}
                      onChange={(e) => {
                        const updatedDiplomes = [...details.diplomes];
                        updatedDiplomes[index].etablissement = e.target.value;
                        setDetails({ ...details, diplomes: updatedDiplomes });
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="Date d'Obtention"
                      type="date"
                      value={diplome.dateObtention}
                      onChange={(e) => {
                        const updatedDiplomes = [...details.diplomes];
                        updatedDiplomes[index].dateObtention = e.target.value;
                        setDetails({ ...details, diplomes: updatedDiplomes });
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="Mention"
                      value={diplome.mention}
                      onChange={(e) => {
                        const updatedDiplomes = [...details.diplomes];
                        updatedDiplomes[index].mention = e.target.value;
                        setDetails({ ...details, diplomes: updatedDiplomes });
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Button onClick={addDiplome} style={{ marginTop: '10px' }}>Add New Diplome</Button>

              {/* Experiences Section */}
              <h3>Expériences Professionnelles</h3>
              {details.experiencesProfessionnelles.map((experience, index) => (
                <Row gutter={[16, 16]} key={index} style={{marginBottom:'20px'}}>
                  <Col span={8}>
                    <Input
                      placeholder="Poste"
                      value={experience.poste}
                      onChange={(e) => {
                        const updatedExperiences = [...details.experiencesProfessionnelles];
                        updatedExperiences[index].poste = e.target.value;
                        setDetails({ ...details, experiencesProfessionnelles: updatedExperiences });
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="Durée"
                      type="number"
                      value={experience.duree}
                      onChange={(e) => {
                        const updatedExperiences = [...details.experiencesProfessionnelles];
                        updatedExperiences[index].duree = parseInt(e.target.value);
                        setDetails({ ...details, experiencesProfessionnelles: updatedExperiences });
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="Entreprise"
                      value={experience.entreprise}
                      onChange={(e) => {
                        const updatedExperiences = [...details.experiencesProfessionnelles];
                        updatedExperiences[index].entreprise = e.target.value;
                        setDetails({ ...details, experiencesProfessionnelles: updatedExperiences });
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Button onClick={addExperience} style={{ marginTop: '10px' }}>Add New Experience</Button>

              {/* Stages Section */}
              <h3>Stages</h3>
              {details.stages.map((stage, index) => (
                <Row gutter={[16, 16]} key={index} style={{marginBottom:'20px'}}>
                  <Col span={8}>
                    <Input
                      placeholder="Intitulé"
                      value={stage.intitule}
                      onChange={(e) => {
                        const updatedStages = [...details.stages];
                        updatedStages[index].intitule = e.target.value;
                        setDetails({ ...details, stages: updatedStages });
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="Durée"
                      type="number"
                      value={stage.duree}
                      onChange={(e) => {
                        const updatedStages = [...details.stages];
                        updatedStages[index].duree = parseInt(e.target.value);
                        setDetails({ ...details, stages: updatedStages });
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="Entreprise"
                      value={stage.entreprise}
                      onChange={(e) => {
                        const updatedStages = [...details.stages];
                        updatedStages[index].entreprise = e.target.value;
                        setDetails({ ...details, stages: updatedStages });
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Button onClick={addStage} style={{ marginTop: '10px' }}>Add New Stage</Button>
            </div>
          </TabPane>

          {/* Tab for Editing Template */}
          <TabPane tab="Édite Template" key="2">
            <Editique />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default DetailPage;
