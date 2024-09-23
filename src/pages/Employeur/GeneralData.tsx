import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Upload,
  message,
  Modal,
  List,
  Typography
} from "antd";
import Title from "antd/es/typography/Title";
import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export type GeneralDataProps = {
  setFormData: (callback: (prev: any) => any) => void;
  formData: {
    generalData?: {
      nom?: string;
      prenom?: string;
      dateNaissance?: string;
      regimeSocial?: string;
      adresseOfficielle?: string;
      tel?: string;
      photo?: File;
      
    };
  };
  setEnfant?: any;
  enfant?: boolean;
  
};



const GeneralData : React.FC<GeneralDataProps> = ({ setFormData, formData,setEnfant,enfant }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [childrenList, setChildrenList] = useState<any[]>([]); // Store children's data
  const [isSchoolLevelDisabled, setIsSchoolLevelDisabled] = useState<boolean>(true); // Track school level field state// Track school level field state

  
    
  // Handle form submission
  const handleSubmit = async (values: any) => {
    const formData = new FormData();

    // Append the JSON fields as a string
    formData.append("employe", JSON.stringify({
      nom: values.nom,
      prenom: values.prenom,
      situationFamiliale: values.situationFamiliale,
      dateNaissance: values.dateNaissance.format('YYYY-MM-DD'),
      cin: values.cin,
      passeport: values.passeport,
      tel: values.tel,
      adresseOfficielle: values.adresseOfficielle,
      conjoint: values.conjoint,
      nationalite: values.nationalite,
      regimeSocial: values.regimeSocial,
      enfants: childrenList // Add children data to employee submission
    }));

    // Append the file (first file in the fileList array)
    if (fileList.length > 0) {
      formData.append("photoFile", fileList[0].originFileObj); 
    }

    try {
      const response = await fetch("/api/employe", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        message.success("Employee saved successfully");
      } else {
        message.error("Error saving employee");
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      message.error("Error submitting the form");
    }
  };

  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  // Handle file changes
  const handleFileChange = ({ file, fileList: newFileList }: any) => {
    if (file.status === 'removed') {
      setFileList([]);
    } else {
      setFileList(newFileList);
    }
  };

  // Handle switch change
  const handleSwitchChange = (checked: boolean) => {
    if (setEnfant) {
      setEnfant(checked);  // Use the passed function
    } else {
      console.warn("setEnfant is not provided");  // Log a warning if it's not passed
    }
    if (checked) {
      setIsModalVisible(true);  // Open modal if switch is toggled to true
    }
  };

  // Modal close handlers
  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEnfant(false);  // Reset switch if modal is canceled
  };

  // Add child to list
  const handleAddChild = () => {
    form
      .validateFields(['childName', 'childAge', 'childSchoolLevel'])
      .then((values) => {
        const newChild = {
          name: values.childName,
          age: values.childAge,
          schoolLevel: values.childSchoolLevel,
          key: Date.now(),
        };
        setChildrenList([...childrenList, newChild]);
        form.resetFields(['childName', 'childAge', 'childSchoolLevel']);
        setIsSchoolLevelDisabled(true); // Reset disabled state when the form is reset
      })
      .catch(() => {
        message.error("Please fill all child information fields.");
      });
  };

  // Delete child from list
  const handleDeleteChild = (key: number) => {
    setChildrenList(childrenList.filter((child) => child.key !== key));
  };

  // Monitor child age and enable/disable school level field
  const handleChildAgeChange = (value: string) => {
    if (parseInt(value) < 5) {
      setIsSchoolLevelDisabled(true); // Disable if age is less than 5
      form.setFieldsValue({ childSchoolLevel: undefined }); // Reset school level
    } else {
      setIsSchoolLevelDisabled(false); // Enable otherwise
    }
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        onFinish={onFinish}
        style={{ padding: "20px", backgroundColor: "#f0f2f5", borderRadius: "8px" }}
      >
        <Row justify="center">
          <Col xs={24}>
            <Title level={4} style={{ marginBottom: 20, color: "#214f87", textAlign: "center" }}>
              Données Générales
            </Title>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* Left column */}
          <Col xs={24} md={12}>
            <Form.Item label="Nom" name="nom" rules={[{ required: true, message: "Nom is required" }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Situation Familiale" name="situationFamiliale" rules={[{ required: true, message: "Situation Familiale is required" }]}>
              <Select>
                <Select.Option value="Célibataire">Célibataire</Select.Option>
                <Select.Option value="Marié">Marié(e)</Select.Option>
                <Select.Option value="Divorcé">Divorcé(e)</Select.Option>
                <Select.Option value="Veuf">Veuf</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Date de naissance" name="dateNaissance" rules={[{ required: true, message: "Date de naissance is required" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="CIN" name="cin" rules={[{ required: true, message: "CIN is required" }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Télécharger Photo" name="photo">
              <Upload 
                listType="picture" 
                fileList={fileList}  // Bind fileList state to Upload component
                beforeUpload={() => false}  // Prevent automatic upload
                onChange={handleFileChange}  // Handle file changes
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* Right column */}
          <Col xs={24} md={12}>
            <Form.Item label="Prénom" name="prenom" rules={[{ required: true, message: "Prénom is required" }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Régime Social" name="regimeSocial" rules={[{ required: true, message: "Régime Social is required" }]}>
              <Select>
                <Select.Option value="CNSS">CNSS</Select.Option>
                <Select.Option value="AMO">AMO</Select.Option>
                <Select.Option value="RAMED">RAMED</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Adresse Officielle" name="adresseOfficielle" rules={[{ required: true, message: "Adresse Officielle is required" }]}>
              <Input />
            </Form.Item>

            <Form.Item label="N° Passport" name="passeport">
              <Input />
            </Form.Item>

            <Form.Item label="N° Tel" name="tel" rules={[{ required: true, message: "N° Tel is required" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* Second row of form */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Conjoint" name="conjoint">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Nationalité" name="nationalite" rules={[{ required: true, message: "Nationalité is required" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} style={{ textAlign: "center" }}>
            <Form.Item label="Enfants" valuePropName="checked">
              <Switch onChange={handleSwitchChange} />
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
      
      </Form>

      {/* Modal for entering children information */}
      <Modal
        title="Enfants"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Annuler
          </Button>,
          <Button key="ok" type="primary" onClick={handleModalOk}>
            OK
          </Button>
        ]}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 20, color: '#214f87' }}>
                Données des Enfants
              </Title>
            </Col>
            <Col xs={12} md={6}>
              <Form.Item
                label="Nom de l'enfant"
                name="childName"
                rules={[{ required: true, message: "Veuillez entrer le nom de l'enfant" }]}
              >
                <Input placeholder="Nom de l'enfant" />
              </Form.Item>
            </Col>
            <Col xs={12} md={8}>
              <Form.Item
                label="Âge de l'enfant"
                name="childAge"
                rules={[{ required: true, message: "Veuillez entrer l'âge de l'enfant" }]}
              >
                <Input placeholder="Âge de l'enfant" onChange={(e) => handleChildAgeChange(e.target.value)} />
              </Form.Item>
            </Col>
            <Col xs={12} md={6}>
              <Form.Item
                label="Niveau scolaire"
                name="childSchoolLevel"
                rules={[{ required: !isSchoolLevelDisabled, message: "Veuillez sélectionner le niveau scolaire" }]}
              >
                <Select disabled={isSchoolLevelDisabled}>
                  <Select.Option value="1_primaire">1ère année primaire</Select.Option>
                  <Select.Option value="2_primaire">2ème année primaire</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Button type="primary" onClick={handleAddChild} icon={<PlusOutlined />}>
                Ajouter
              </Button>
            </Col>
          </Row>
        </Form>

        {/* List of added children */}
        <List
          header={<div>Liste des Enfants</div>}
          bordered
          dataSource={childrenList}
          renderItem={(child) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteChild(child.key)}
                >
                  Supprimer
                </Button>,
              ]}
            >
              <Typography.Text>{`${child.name} - ${child.age} ans - ${child.schoolLevel}`}</Typography.Text>
            </List.Item>
          )}
          style={{ marginTop: 20 }}
        />
      </Modal>
    </>
  );
};

export default GeneralData;
