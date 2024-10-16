import React from "react";
import {  Form,Tabs,  } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import TeamBuilding from "./TeamBuilding";



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
        <TabPane tab="Order De Mession" key={5} >
        <TeamBuilding/>
        </TabPane>
      </Tabs>
      
        
      </Form>
    
    </>
  );
};

export default GestionActivite;
