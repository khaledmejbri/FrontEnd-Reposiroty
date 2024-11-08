import React, { useEffect, useState } from "react";
import { Table, Button, Form, Col, Row, Input, Modal, message } from "antd";
import {
  AppstoreAddOutlined,
  ClearOutlined,
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Card from "antd/es/card/Card";
import Questions from "../../data/Question.json";
import { useParams } from "react-router-dom";

interface ProposedAnswer {
  id: number;
  Answer: string;
}

interface ListDesQuestionsDetailsInterface {
  id: number;
  questionText: string;
  correctAnswers: string;
  candidateResponses: string;
  ProposedAnswers: ProposedAnswer[];
}

const ListDesQuestionsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState<ListDesQuestionsDetailsInterface[]>([]);
  const [filters, setFilters] = useState({
    questionText: "",
  });

  const [newEntry, setNewEntry] = useState<ListDesQuestionsDetailsInterface>({
    id: 0,
    questionText: "",
    correctAnswers: "",
    candidateResponses: "",
    ProposedAnswers: [{ id: 0, Answer: "" }],
  });

  useEffect(() => {
    const dataWithKeys = Questions.questionModels.find(
      (mission) => mission.id === Number(id)
    )?.questions;
    setDataSource(dataWithKeys ?? []);
  }, [id]);

  const columns = [
    {
      title: "Question Text",
      dataIndex: "questionText",
      key: "questionText",
    },
    {
      title: "Correct Answers",
      dataIndex: "correctAnswers",
      key: "correctAnswers",
    },
    {
      title: "Proposed Answers",
      dataIndex: "ProposedAnswers",
      key: "ProposedAnswers",
      render: (ProposedAnswers: ProposedAnswer[]) => (
        <ul>
          {ProposedAnswers.map((answer) => (
            <li key={answer.id}>{answer.Answer}</li>
          ))}
        </ul>
      ),
    },
  ];

  const handleSearch = () => {
    const filteredData = dataSource.filter((leave) =>
      leave.questionText.includes(filters.questionText)
    );
    setDataSource(filteredData);
  };

  const handleClearFilters = () => {
    setFilters({ questionText: "" });
    setDataSource(
      Questions.questionModels.find((mission) => mission.id === Number(id))?.questions ?? []
    );
  };

  const handleAddEntry = () => {
    const newData = {
      ...newEntry,
      id: dataSource.length + 1,
    };
    setDataSource([newData, ...dataSource]);
    setIsModalVisible(false);
    setNewEntry({
      id: 0,
      questionText: "",
      correctAnswers: "",
      candidateResponses: "",
      ProposedAnswers: [{ id: 0, Answer: "" }],
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...newEntry.ProposedAnswers];
    updatedAnswers[index] = { ...updatedAnswers[index], Answer: value };
    setNewEntry({ ...newEntry, ProposedAnswers: updatedAnswers });
  };

  const handleAddAnswer = () => {
    const newAnswer = { id: newEntry.ProposedAnswers.length + 1, Answer: "" };
    setNewEntry({
      ...newEntry,
      ProposedAnswers: [...newEntry.ProposedAnswers, newAnswer],
    });
  };

  const handleRemoveAnswer = (index: number) => {
    const updatedAnswers = newEntry.ProposedAnswers.filter((_, i) => i !== index);
    setNewEntry({ ...newEntry, ProposedAnswers: updatedAnswers });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const handleSave = () => {
    messageApi.success('Question Model updated successfully!');
  };
  return (
    <>
      {contextHolder}
      <Card>
        <Form layout="horizontal">
          <Row>
            <Col span={22}></Col>
          <Col span={2}>
          <Button
                type="primary"
                onClick={handleSave}
                style={{
                  backgroundColor: "#79ba8a",
                  marginRight: 20,
                  float: "right",
                }}
              >
                <AppstoreAddOutlined /> {Questions.questionModels?"Enregestrer" :"Ajouter"}
              </Button>
              </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 20, color: "#214f87" }}>
                {Questions.questionModels.find(
                  (mission) => mission.id === Number(id)
                )?.modelName ?? ""}
              </Title>
            </Col>
            <Col xs={12} md={8}>
              <Form.Item label="Model de Question ">
                <Input
                  value= {Questions.questionModels.find(
                    (mission) => mission.id === Number(id)
                  )?.modelName ?? ""}
                
                  placeholder="Search by question text"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
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
                <SearchOutlined /> Search
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
              <Button
                type="primary"
                onClick={showModal}
                style={{
                  backgroundColor: "#79ba8a",
                  marginRight: 20,
                  float: "right",
                }}
              >
                <AppstoreAddOutlined /> Add Questions 
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card>
        <Table
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: "max-content" }}
          rowKey="id"
          className="tableAnswers"
        />
      </Card>

      <Modal
        title="Add New Entry"
        open={isModalVisible}
        onOk={handleAddEntry}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Question Text">
            <Input
              value={newEntry.questionText}
              onChange={(e) =>
                setNewEntry({ ...newEntry, questionText: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Correct Answers">
            <Input
              value={newEntry.correctAnswers}
              onChange={(e) =>
                setNewEntry({ ...newEntry, correctAnswers: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Proposed Answers">
            {newEntry.ProposedAnswers.map((answer, index) => (
              <div key={answer.id} style={{ display: "flex", marginBottom: 8 }}>
                <Input
                  value={answer.Answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Answer ${index + 1}`}
                  style={{ marginRight: 8 }}
                />
                <Button
                  type="default"
                  onClick={() => handleRemoveAnswer(index)}
                  icon={<DeleteOutlined />}
                  danger
                />
              </div>
            ))}
            <Button
              type="dashed"
              onClick={handleAddAnswer}
              style={{ width: "100%", marginTop: 8 }}
              icon={<PlusOutlined />}
            >
              Add Answer
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListDesQuestionsDetails;
