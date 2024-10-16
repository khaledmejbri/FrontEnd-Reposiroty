import React from "react";
import {  Form,Tabs,  } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import MesCongs from "./MesConges";
import MesPresences from "./MesPointages";
import ListeDesConges from "./ListeDesConges";
import ListeDesPresences from "./ListeDesPresences";
import ListeMession from "./ListeDesMessions";



const Conge: React.FC = () => {
  
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
        <TabPane tab="Pointage des employers" key={1}>
        <ListeDesPresences/>
        </TabPane>
     
        <TabPane tab="Congés des employers" key={2} >
        <ListeDesConges/>
        </TabPane>
        <TabPane tab="Mes pointages" key={3} >
        <MesPresences/>
        </TabPane>
        <TabPane tab="Mes congés" key={4} >
        <MesCongs/>
        </TabPane>
        <TabPane tab="Order De Mession" key={5} >
        <ListeMession/>
        </TabPane>
      </Tabs>
      
        
      </Form>
    
    </>
  );
};

export default Conge;
