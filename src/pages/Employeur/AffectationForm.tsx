import React, { useEffect } from "react";
import { Form, Input, DatePicker } from "antd";
import { Moment } from "moment";

// Define types for the props
interface AffectationFormProps {
  setFormData: (callback: (prev: any) => any) => void;
  formData: {
    affectation?: {
      departement?: string;
      numeroAffaire?: string;
      dateAffectation?: string; // Use Moment type for DatePicker
    };
  };
}

// Define the structure for form values
interface AffectationValues {
  departement?: string;
  numeroAffaire?: string;
  dateAffectation?: string;
}

const AffectationForm: React.FC<AffectationFormProps> = ({ setFormData, formData }) => {
  const [form] = Form.useForm(); // Create form instance

  // Set initial form values from parent state (formData)
  useEffect(() => {
    if (formData.affectation) {
      form.setFieldsValue(formData.affectation);
    }
  }, [formData, form]);

  // Handle form value changes, only using 'allValues'
  const onValuesChange = (allValues: AffectationValues) => {
    setFormData((prev) => ({
      ...prev,
      affectation: allValues,
    }));
  };

  return (
    <Form
      layout="vertical"
      form={form} // Use form instance
      onValuesChange={(_, allValues) => onValuesChange(allValues)} // Handle changes
    >
      <Form.Item style={{width:"25%" ,marginLeft:"600px" }}
        label="Département"
        name="departement"
        rules={[{ required: true, message: "Veuillez entrer le département" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item style={{width:"25%" ,marginLeft:"600px" }}
        label="Numéro d'Affaire"
        name="numeroAffaire"
        rules={[{ required: true, message: "Veuillez entrer le numéro d'affaire" }]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item style={{ width: "70%",marginLeft:"600px" }}
        label="Date d'Affectation"
        name="dateAffectation"
        rules={[{ required: true, message: "Veuillez sélectionner une date d'affectation" }]}
      >
        <DatePicker style={{ width: "35%" }} />
      </Form.Item> */}
    </Form>
  );
};

export default AffectationForm;
