import React, { useEffect } from "react";
import { Form, Input, DatePicker } from "antd";
import { Moment } from "moment";

// Define types for the props
interface EtatStatutaireFormProps {
  setFormData: (callback: (prev: any) => any) => void; // Explicitly typing setFormData
  formData: {
    etatStatutaire?: {
      dateRecrutement?: Moment;
      grade?: string;
      salaire_annuelle?: string;
    };
  };
}

// Define the structure for form values
interface EtatStatutaireValues {
  dateRecrutement?: Moment;
  grade?: string;
  salaire_annuelle?: string;
}

const EtatStatutaireForm: React.FC<EtatStatutaireFormProps> = ({ setFormData, formData }) => {
  const [form] = Form.useForm(); // Create form instance

  // Set initial form values from parent state (formData)
  useEffect(() => {
    if (formData.etatStatutaire) {
      form.setFieldsValue(formData.etatStatutaire);
    }
  }, [formData, form]);

  // Handle form value changes, only using 'allValues'
  const onValuesChange = (allValues: EtatStatutaireValues) => {
    setFormData((prev: any) => ({
      ...prev,
      etatStatutaire: allValues,
    }));
  };

  return (
    <Form
      layout="vertical"
      form={form} // Use form instance
      onValuesChange={(_, allValues) => onValuesChange(allValues)} // Handle changes
    >
      <Form.Item
        label="Date de Recrutement"
        name="dateRecrutement"
        rules={[{ required: true, message: "Veuillez entrer la date de recrutement" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Grade"
        name="grade"
        rules={[{ required: true, message: "Veuillez entrer le grade" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Salaire Annuelle"
        name="salaire_annuelle"
        rules={[{ required: true, message: "Veuillez entrer le salaire annuel" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default EtatStatutaireForm;
