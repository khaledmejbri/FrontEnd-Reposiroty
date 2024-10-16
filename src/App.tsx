
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React, { Component } from 'react';
import TopBar from './pages/TopBar.tsx';
import MultiStepForm from './pages/Employeur/MultiStepForm.tsx';
import Documents from './pages/Employeur/Document.tsx';
import GestionDeConge from './pages/Employeur/GestionDeConge.tsx';
import GestionCVDetails from './pages/Employeur/GestionDeCVDetails.tsx';
import AdvancedBusinessChart from './pages/Employeur/AdvancedBusinessChart.tsx';
import WelcomePage from './pages/Employeur/BusinessChart.tsx';
import GestionActivite from './pages/Employeur/GestionActivite.tsx';

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

      
     </Routes>
     </Router>
    )}


}

export default App;
