import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
import GeneralData from 'C:/Sesame/PFE/frontend/sirh/src/pages/Employeur/GeneralData';
import EtatStatutaireForm from 'C:/Sesame/PFE/frontend/sirh/src/pages/Employeur/EtatStatutaireForm';
import AffectationForm from './AffectationForm';

const { Step } = Steps;

const MultiStepForm = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    generalData: {},
    etatStatutaire: {},
    affectation: {},
  });

  const steps = [
    {
      title: 'Données Générales',
      content: <GeneralData setFormData={setFormData} formData={formData} />,

    },
    {
        title: 'Affectation',
        content: <AffectationForm setFormData={setFormData} formData={formData} />,
      },
    {
      title: 'Etat Statutaire',
      content: <EtatStatutaireForm setFormData={setFormData} formData={formData} />,
    },
    
  ];

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const handleSubmit = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('employe', JSON.stringify({
         generalData:formData.generalData,
        etatStatutaire: formData.etatStatutaire,
        affectation: formData.affectation,
      }));
      console.log(formData,formDataObj);

      const response = await fetch('http://localhost:1000/api/employe', {
        method: 'POST',
        body: formDataObj,
      });
      
      if (response.ok) {
        message.success('Employee saved successfully!');
      } else {
        message.error('Error saving employee.');
      }
    } catch (error) {
      message.error('Error submitting the form');
    }
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ marginTop: 20 }}>{steps[current].content}</div>
      <div className="steps-action" style={{ marginTop: 20 }}>
        {current < steps.length - 1 && (
          <Button  type="primary" style={{marginTop:'20px' , marginLeft:'700px',width:'10%'}} onClick={next}>
            Next
          </Button>
        )}
        
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;