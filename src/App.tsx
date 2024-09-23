
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React, { Component } from 'react';
import TopBar from './pages/TopBar.tsx';
import MultiStepForm from './pages/Employeur/MultiStepForm.tsx';
import Documents from './pages/Employeur/Document.tsx';

class App extends Component {
   
  render() {
  return (
   
    <Router>
    <TopBar />
    <Routes>
      {/* <Route exact path='/' component={Index}/> */}
    
      <Route path="/Profile" element={<MultiStepForm />} />
      <Route path="/Documents" element={<Documents />} />
      
     </Routes>
     </Router>
    )}


}

export default App;
