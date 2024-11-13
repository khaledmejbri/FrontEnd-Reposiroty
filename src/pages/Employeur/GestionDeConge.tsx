import React from "react";
import {  Form,Tabs,  } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import MesCongs from "./MesConges";
import MesPresences from "./MesPointages";
import ListeDesConges from "./ListeDesConges";
import ListeDesPresences from "./ListeDesPresences";
import ListeMession from "./ListeDesMessions";
import ConditionRules from "./Condition&Rules";
import HistoriqueDesConges from "./HistoriqueDesConges";
import ListDesEmployeer from "./ListDesEmployées";



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
         <TabPane tab="List Des Employés" key={1}>
        <ListDesEmployeer/>
        </TabPane>
        <TabPane tab="Conditions" key={2}>
        <ConditionRules/>
        </TabPane>
        <TabPane tab="Pointage des employés" key={3}>
        <ListeDesPresences/>
        </TabPane>
     
        <TabPane tab="Les Demandes des employés" key={4} >
        <ListeDesConges/>
        </TabPane>
        <TabPane tab="Historique Des Congés" key={5} >
        <HistoriqueDesConges/>
        </TabPane>
        <TabPane tab="Mes pointages" key={6} >
         <MesPresences/> 
        </TabPane>
        <TabPane tab="Mes congés" key={7} >
        <MesCongs/>
        </TabPane>
       
      </Tabs>
      
        
      </Form>
    
    </>
  );
};

export default Conge;
