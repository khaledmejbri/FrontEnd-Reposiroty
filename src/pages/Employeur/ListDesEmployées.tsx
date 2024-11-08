import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Input,
  Upload,
} from "antd";
import {
  ClearOutlined,
  SearchOutlined,
  UploadOutlined,
  
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Card from "antd/es/card/Card";

interface ListDesEmployeerInterface {

  id: number,
    nom: string,
    prenom: string,
    email: string,
    situationFamiliale: string,
    regimeSocial:string,
    modeRemuneration:string,
    nationalite: string,
    dateNaissance: string,
    cin:string,
    passeport: string,
    tel: string,
    adresseOfficielle: string,
    conjoint: string,
    photo: string,
    reference: string,
    performanceRating: number,
    teamSize:number,


}

const ListDesEmployeer: React.FC = () => {
  const [dataSource, setDataSource] = useState<ListDesEmployeerInterface[]>([]);
  const [newEntry, setNewEntry] = useState<ListDesEmployeerInterface>({
    id: 0,
    nom: "",
    prenom: "",
    email: "",
    situationFamiliale: "",
    regimeSocial:"",
    modeRemuneration:"",
    nationalite: "",
    dateNaissance: "",
    cin:"",
    passeport: "",
    tel: "",
    adresseOfficielle: "",
    conjoint: "",
    photo: "",
    reference: "",
    performanceRating:0,
    teamSize: 0
  });
  const [filters, setFilters] = useState({
  
    id: 0,
    nom: "",
    prenom: "",
    email: "",
    situationFamiliale: "",
    regimeSocial:"",
    modeRemuneration:"",
    nationalite: "",
    dateNaissance: "",
    cin:"",
    passeport: "",
    tel: "",
    adresseOfficielle: "",
    conjoint: "",
    photo: "",
    reference: "",
    performanceRating:0,
    teamSize: 0

  });

  useEffect(() => {
    setDataSource(dataSource);
  }, [dataSource]);



  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prenom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Situation Familiale",
      dataIndex: "situationFamiliale",
      key: "situationFamiliale",
    },
    {
      title: "Regime Social",
      dataIndex: "regimeSocial",
      key: "regimeSocial",
    },
    {
      title: "Mode Remuneration",
      dataIndex: "modeRemuneration",
      key: "modeRemuneration",
    },
    {
      title: "Nationalite",
      dataIndex: "nationalite",
      key: "nationalite",
    },
    {
      title: "Date Naissance",
      dataIndex: "dateNaissance",
      key: "dateNaissance",
    },
    {
      title: "CIN",
      dataIndex: "cin",
      key: "cin",
    },
    {
      title: "Passeport",
      dataIndex: "passeport",
      key: "passeport",
    },
    {
      title: "Tel",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "Adresse Officielle",
      dataIndex: "adresseOfficielle",
      key: "adresseOfficielle",
    },
    {
      title: "Conjoint",
      dataIndex: "conjoint",
      key: "conjoint",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
     
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Performance Rating",
      dataIndex: "performanceRating",
      key: "performanceRating",
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
          !filters.nom || leave.nom.includes(filters.nom);
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
      nom: "",
      prenom: "",
      email: "",
      situationFamiliale: "",
      regimeSocial:"",
      modeRemuneration:"",
      nationalite: "",
      dateNaissance: "",
      cin:"",
      passeport: "",
      tel: "",
      adresseOfficielle: "",
      conjoint: "",
      photo: "",
      reference: "",
      performanceRating:0,
      teamSize: 0

    });
    setDataSource(
      dataSource.map((leave) => ({ ...leave}))
    );
  };

  const handleAddEntry = () => {
    const newData = {
      ...newEntry,
      id: Number(dataSource.length+1),

    };
    setDataSource([newData, ...dataSource]); 
    setNewEntry({
     id: 0,
    nom: "",
    prenom: "",
    email: "",
    situationFamiliale: "",
    regimeSocial:"",
    modeRemuneration:"",
    nationalite: "",
    dateNaissance: "",
    cin:"",
    passeport: "",
    tel: "",
    adresseOfficielle: "",
    conjoint: "",
    photo: "",
    reference: "",
    performanceRating:0,
    teamSize: 0
    }); 
  };
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
    return false; // Prevents the upload action as we handle it manually
  };
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
              <Form.Item label="employename">
                <Input
                  value={filters.nom}
                  onChange={(e) =>
                    setFilters({ ...filters, nom: e.target.value })
                  }
                  placeholder="Chercher par Nom"
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
              <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra=""
              >
                <Upload accept=".json" showUploadList={false} beforeUpload={handleUpload}>
                  <Button icon={<UploadOutlined />} style={{width:'150px'}}/>
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

export default ListDesEmployeer;
