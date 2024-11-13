import React, { useState, useEffect } from "react";
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
  Typography,
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
    children?: { name: string; age: number; schoolLevel: string }[];
    enfant?: boolean;
  };
  setEnfant?: any;
  enfant?: boolean;
};

const GeneralData: React.FC<GeneralDataProps> = ({
  setFormData,
  formData,
  setEnfant,
  enfant,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [childrenList, setChildrenList] = useState<any[]>(formData.children || []);
  const [isSchoolLevelDisabled, setIsSchoolLevelDisabled] = useState<boolean>(true);

  useEffect(() => {
    form.setFieldsValue({
      ...formData.generalData,
      enfant: formData.enfant,
    });
  }, [formData, form]);

  const handleSubmit = async (values: any) => {
    const dataToSubmit = {
      ...values,
      //dateNaissance: values.dateNaissance.format("YYYY-MM-DD"),
      photo: fileList[0]?.originFileObj || null,
      children: childrenList,
    };
    
    const response = await fetch("/api/employe", {
      method: "POST",
      body: JSON.stringify(dataToSubmit),
      headers: { "Content-Type": "application/json" },
    });

    response.ok ? message.success("Employee saved successfully") : message.error("Error saving employee");
  };

  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  const handleFileChange = ({ file, fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const handleSwitchChange = (checked: boolean) => {
    setEnfant?.(checked);
    checked && setIsModalVisible(true);
  };

  const handleModalOk = () => setIsModalVisible(false);
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEnfant(false);
  };

  const handleAddChild = () => {
    form.validateFields(["childName", "childAge", "childSchoolLevel"]).then((values) => {
      const newChild = {
        name: values.childName,
        age: values.childAge,
        schoolLevel: values.childSchoolLevel,
        key:1,
      };
      setChildrenList([...childrenList, newChild]);
      form.resetFields(["childName", "childAge", "childSchoolLevel"]);
      setIsSchoolLevelDisabled(true);
    });
  };

  const handleDeleteChild = (key: number) => {
    setChildrenList(childrenList.filter((child) => child.key !== key));
  };

  const handleChildAgeChange = (value: string) => {
    const age = parseInt(value);
    setIsSchoolLevelDisabled(age < 5);
    age < 5 && form.setFieldsValue({ childSchoolLevel: undefined });
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
            {/* <Form.Item label="Date de naissance" name="dateNaissance" rules={[{ required: true, message: "Date de naissance is required" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item> */}
            <Form.Item label="CIN" name="cin" rules={[{ required: true, message: "CIN is required" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Télécharger Photo" name="photo">
              <Upload listType="picture" fileList={fileList} beforeUpload={() => false} onChange={handleFileChange}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

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

        <Row>
          <Col xs={24} style={{ textAlign: "center" }}>
            <Form.Item label="Enfants" valuePropName="checked">
              <Switch checked={enfant} onChange={handleSwitchChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Modal
        title="Enfants"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>Annuler</Button>,
          <Button key="ok" type="primary" onClick={handleModalOk}>OK</Button>
        ]}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col xs={24}>
              <Title level={4} style={{ color: "#214f87" }}>Données des Enfants</Title>
            </Col>
            <Col xs={12}>
              <Form.Item label="Nom de l'enfant" name="childName" rules={[{ required: true, message: "Veuillez entrer le nom de l'enfant" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label="Âge de l'enfant" name="childAge" rules={[{ required: true, message: "Veuillez entrer l'âge de l'enfant" }]}>
                <Input onChange={(e) => handleChildAgeChange(e.target.value)} />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label="Niveau scolaire" name="childSchoolLevel" rules={[{ required: !isSchoolLevelDisabled, message: "Veuillez sélectionner le niveau scolaire" }]}>
                <Select disabled={isSchoolLevelDisabled}>
                  <Select.Option value="1_primaire">1ère année primaire</Select.Option>
                  <Select.Option value="2_primaire">2ème année primaire</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddChild}>Ajouter enfant</Button>
            </Col>
          </Row>
        </Form>

        <List
          dataSource={childrenList}
          renderItem={(child) => (
            <List.Item actions={[<Button icon={<DeleteOutlined />} onClick={() => handleDeleteChild(child.key)}>Supprimer</Button>]}>
              <List.Item.Meta title={child.name} description={`Age: ${child.age}, Niveau scolaire: ${child.schoolLevel}`} />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default GeneralData;
