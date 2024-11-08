import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import templatedata from '../../data/GeneralData.json'; // JSON data
import { Tabs, Button, Col, Row, message, Select, Form, Radio } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import Questions from '../../data/Question.json'; // JSON data

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the 'id' from the URL
  const [selectedQuestionModel, setSelectedQuestionModel] = useState<number>();
  const [dataSource, setDataSource] = useState<any[]>([]); // Selected questions
  const [answers, setAnswers] = useState<any>({}); // Store answers for questions
  const [messageApi, contextHolder] = message.useMessage();

  const handleQuestionModelSelect = (value: number) => {
    setSelectedQuestionModel(value);
    const selectedModel = Questions.questionModels.find((model) => model.id === value);
    console.log("Selected Model:", selectedModel);
    setDataSource(selectedModel?.questions ?? []);
  };

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prevAnswers:{}) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <>
      {contextHolder}
      <div style={{ padding: '20px' }}>
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="Questions" key="2">
            <Form>
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
                  {dataSource.map((question) => (
                    <Form.Item
                      key={question.id}
                      label={question.questionText}
                      name={`question_${question.id}`}
                    >
                      <Radio.Group
                        value={answers[question.id]}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      >
                        {question.ProposedAnswers.map((answer: { id: number; Answer: string }) => (
                          <Radio key={answer.id} value={answer.Answer}>
                            {answer.Answer}
                          </Radio>
                        ))}
                      </Radio.Group>
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
