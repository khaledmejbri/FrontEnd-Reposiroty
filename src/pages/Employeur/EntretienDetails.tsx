import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import templatedata from '../../data/GeneralData.json'; // JSON data
import { Tabs, Input, Button, Col, Row, message, Select, Form, Radio, Checkbox } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import TextArea from 'antd/es/input/TextArea';
import Questions from '../../data/Question.json'; // JSON data

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
  const [selectedQuestionModel, setSelectedQuestionModel] = useState<number>();
  const [dataSource, setDataSource] = useState<any[]>([]); // Added dataSource state for selected questions
  const [answers, setAnswers] = useState<any>({}); // To store the answers for the questions
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm(); // Form instance for managing form data

  // If the mission is not found, display an error
  if (!selectedMission && !Object.keys(details).length) {
    return <div>Data not found. Please fill in the details below to add a new mission.</div>;
  }

  // Handler for updating the input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  // Handler for displaying the info message
  const handleSave = () => {
    messageApi.success(selectedMission ? "La modification du candidat est réussie!" : "L'ajout du candidat est réussie!");
  };

  const handleQuestionModelSelect = (value: number) => {
    setSelectedQuestionModel(value);
    const selectedModel = Questions.questionModels.find((model) => model.id === value);
    setDataSource(selectedModel?.questions ?? []);
  };

  // Handler for form value change (to store answers)
  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prevAnswers:any) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
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
                    {selectedMission ? `${selectedMission.nom} ${selectedMission.prenom}` : "Nouveau Candidat"}
                  </h2>
                </Col>
                <Col span={2}>
                  <Button onClick={handleSave} style={{ backgroundColor: "#79ba8a", color: "#ffff" }}>
                    Enregistrer
                  </Button>
                </Col>
              </Row>
              <Form form={form} initialValues={details} onFinish={handleSave}>
                <Row gutter={[16, 16]}>
                  {Object.keys(details).map((key) => (
                    <Col span={4} key={key}>
                      <Form.Item
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        name={key}
                        rules={[{ required: true, message: `${key} is required` }]}
                      >
                        <Input
                          name={key}
                          value={details[key as keyof EntretienDetails]}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
                <Row>
                  {Object.keys(details).map((key) => (
                    <Col span={20} key={key}>
                      {key === "description" && (
                        <Form.Item
                          label="Description"
                          name="description"
                        >
                          <TextArea
                            name={key}
                            value={details[key as keyof EntretienDetails]}
                            onChange={handleInputChange}
                            rows={4} // Multiline support for TextArea
                          />
                        </Form.Item>
                      )}
                    </Col>
                  ))}
                </Row>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="Questions" key="2">
            <Form onFinish={handleSave}>
              <Row gutter={16}>
                <Col xs={24}>
                  <p style={{ marginBottom: 20, color: "#214f87" }}>
                    Select Question Model
                  </p>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Item label="Question Model" name="questionModel">
                    <Select
                      value={selectedQuestionModel}
                      onChange={handleQuestionModelSelect}
                      placeholder="Select a question model"
                      style={{ width: "100%" }}
                    >
                      {Questions.questionModels.map((model) => (
                        <Select.Option key={model.id} value={model.id}>
                          {model.modelName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Dynamically render questions */}
              {dataSource.length > 0 && (
                <div>
                  <h3>Questions:</h3>
                  {dataSource.map((question, index) => (
                    <Form.Item
                      key={question.id}
                      label={question.questionText}
                      name={`question_${question.id}`}
                    >
                      {/* Render based on question type */}
                      {question.type === 'text' && (
                        <Input
                          value={answers[question.id] || ''}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        />
                      )}
                      {question.type === 'textarea' && (
                        <TextArea
                          value={answers[question.id] || ''}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          rows={4}
                        />
                      )}
                      {question.type === 'radio' && (
                        <Radio.Group
                          value={answers[question.id]}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        >
                          {question.options.map((option: string) => (
                            <Radio key={option} value={option}>
                              {option}
                            </Radio>
                          ))}
                        </Radio.Group>
                      )}
                      {question.type === 'checkbox' && (
                        <Checkbox.Group
                          value={answers[question.id] || []}
                          onChange={(checkedValues) => handleAnswerChange(question.id, checkedValues)}
                        >
                          {question.options.map((option: string) => (
                            <Checkbox key={option} value={option}>
                              {option}
                            </Checkbox>
                          ))}
                        </Checkbox.Group>
                      )}
                    </Form.Item>
                  ))}
                </div>
              )}

              <Button type="primary" htmlType="submit" style={{ backgroundColor: "#79ba8a", color: "#ffff" }}>
                Enregistrer
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default DetailPage;
