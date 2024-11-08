import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Input,
} from "antd";
import {
  AppstoreAddOutlined,
  ClearOutlined,
  SearchOutlined,
  
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Card from "antd/es/card/Card";
import Questions from "../../data/Question.json";
import { Link, useNavigate } from "react-router-dom";


interface ListDesQuestionsInterface {
  id: number,
  modelName: string,
  questions:[
    {
      id: number,
      questionText: string,
      correctAnswers: [],
      candidateResponses: []
    }]

}

const ListDesQuestions: React.FC = () => {
  const [dataSource, setDataSource] = useState<ListDesQuestionsInterface[]>([]);
  const navigate = useNavigate(); 
  const [filters, setFilters] = useState({
    
    id: 0,
    modelName: "",
    questions:[] as any

  });

  useEffect(() => {
    const dataWithKeys = Questions.questionModels.map((model: any) => ({
      ...model,
      key: model.id.toString(), // Assign key to each model
      questions: model.questions.map((question: any) => ({
        ...question,
        key: question.id.toString() // Add key to each question
      }))
    }));
  
    setDataSource(dataWithKeys);
  }, []); // Use Questions as a dependency



  const columns = [
 
    {
      title: "modelName",
      dataIndex: "modelName",
      key: "modelName",
      render: (text: string, record: ListDesQuestionsInterface) => (
        <Link to={`/Parammetre/details/${record.id}`}>{text}</Link>
      ),
    },
   
  
  ];
                                                                                                                  


  // Filter the data based on search inputs
  const handleSearch = () => {
    const filteredData = dataSource
      .map((leave) => ({
        ...leave,
      }))
      .filter((leave) => {
        const matchNom =
          !filters.modelName || leave.modelName.includes(filters.modelName);
        return (
          matchNom 
        );
      });
    setDataSource(filteredData);
  };

  // Clear filters and reset table
  const handleClearFilters = () => {
    setFilters({ 
      id: 0,
      modelName: "",
      questions:[]
    });
    setDataSource(
      dataSource.map((leave) => ({ ...leave}))
    );
  };

  return (
    <>
      <Card>
        <Form layout="horizontal" initialValues={{ size: "default" }}>
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 20, color: "#214f87" }}>
              Parameter de liste des modeles des  questions
              </Title>
            </Col>

            <Col xs={12} md={6}>
              <Form.Item label="modelName">
                <Input
                  value={filters.modelName}
                  onChange={(e) =>
                    setFilters({ ...filters, modelName: e.target.value})
                  }
                  placeholder="Chercher par nom de modele "
                />
              </Form.Item>
            </Col>
          
            <Col xs={24} md={12}>
           
              <Button
                type="primary"
                onClick={handleSearch}
                style={{
                  backgroundColor: "#6195d4"
                 ,marginRight:20,float:'right',marginLeft:20,
                }}
              >
                <SearchOutlined /> Recherche
              </Button>
                      
            
              <Button
                type="default"
                onClick={handleClearFilters}
                style={{
                  backgroundColor: "orange",marginRight:20,float:'right'
                }}
              >
                <ClearOutlined /> Clear
              </Button>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#79ba8a",
                  marginRight: 20,
                  float: "right",
                }}
                onClick={() => navigate(`/Parammetre/details/${null}`)}
              >
                <AppstoreAddOutlined /> Ajouter
              </Button>
             
 
             
            
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

export default ListDesQuestions;
