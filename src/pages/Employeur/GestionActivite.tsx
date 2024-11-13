import React from "react";
import {  Form,Tabs,  } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import TeamBuilding from "./TeamBuilding";
import Formation from "./Formation";
import Entretien from "./Entretien";
import ListeMession from "./ListeDesMessions";




const GestionActivite: React.FC = () => {
  
  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        layout="horizontal"
        initialValues={{ size: "default" }}
      >
        
        <Tabs
        defaultActiveKey="1"
        style={{ width: "100%",marginTop:"50px" }}
        tabPosition="left"
      >
        <TabPane tab="Team Building" key={1} >
        <TeamBuilding/>
        </TabPane>
        <TabPane tab="Formation" key={2} >
        <Formation/>
        </TabPane>
        <TabPane tab="Entretien" key={3} >
        <Entretien/>
        </TabPane>
        <TabPane tab="Order De Mission" key={4} >
        <ListeMession/>
        </TabPane>

      </Tabs>
      
        
      </Form>
    
    </>
  );
};

export default GestionActivite;
