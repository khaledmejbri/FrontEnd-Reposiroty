
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React, { Component } from 'react';
import TopBar from './pages/TopBar.tsx';
import MultiStepForm from './pages/Employeur/MultiStepForm.tsx';
import Documents from './pages/Employeur/Document.tsx';
import GestionDeConge from './pages/Employeur/GestionDeConge.tsx';
import GestionCVDetails from './pages/Employeur/GestionDeCVDetails.tsx';
import WelcomePage from './pages/Employeur/BusinessChart.tsx';
import GestionActivite from './pages/Employeur/GestionActivite.tsx';
import DetailPage from './pages/Employeur/EntretienDetails.tsx';
import ListDesQuestions from './pages/Employeur/ParammetrageQuestionaire.tsx';
import ListDesQuestionsDetails from './pages/Employeur/ParammetrageQuestionaireDetails.tsx';
import DetailEntretienQuestionsPage from './pages/Employeur/EntretienQuestions.tsx';

class App extends Component {
   
  render() {
  return (
   
    <Router>
    <TopBar />
    <Routes>
       <Route  path='/' element={<WelcomePage />}/> 
      
   
    
      <Route path="/personnel" element={<MultiStepForm />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/conge" element={<GestionDeConge/>} />
      <Route path="/activite" element={<GestionActivite/>} />

      <Route path="documents/gestionCV/details/:id" element={<GestionCVDetails/>} />
      <Route path="activite/entretien/details/:id" element={<DetailEntretienQuestionsPage/>} />
      <Route path="/Parammetre" element={<ListDesQuestions/>} />
      <Route path="/Parammetre/details/:id" element={<ListDesQuestionsDetails/>} />


      
     </Routes>
     </Router>
    )}


}

export default App;
