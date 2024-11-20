import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import TopBar from './pages/TopBar.tsx';
import MultiStepForm from './pages/Employeur/MultiStepForm.tsx';
import Documents from './pages/Employeur/Document.tsx';
import GestionDeConge from './pages/Employeur/GestionDeConge.tsx';
import GestionCVDetails from './pages/Employeur/GestionDeCVDetails.tsx';
import WelcomePage from './pages/Employeur/BusinessChart.tsx';
import GestionActivite from './pages/Employeur/GestionActivite.tsx';
import ListDesQuestions from './pages/Employeur/ParammetrageQuestionaire.tsx';
import ListDesQuestionsDetails from './pages/Employeur/ParammetrageQuestionaireDetails.tsx';
import DetailEntretienQuestionsPage from './pages/Employeur/EntretienQuestions.tsx';
import ListDesPersonnels from './pages/Employeur/ListDesPersonnel.tsx';
import SignIn from './pages/Employeur/SignIn.tsx';

// Define the state type
type AppState = {
  isAuthenticated: boolean;
};

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isAuthenticated: !!localStorage.getItem('isAuthenticated'), // Initial auth state
    };
  }

  handleLogin = () => {
    this.setState({ isAuthenticated: true }); // Update authentication state
  };

  handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear authentication
    this.setState({ isAuthenticated: false });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router>
        {/* Conditionally render TopBar */}
        {isAuthenticated && <TopBar onLogout={this.handleLogout} />}
        <Routes>
          {/* Public route for sign-in */}
          <Route
            path="/signin"
            element={<SignIn onLogin={this.handleLogin} />}
          />

          {/* Redirect to sign-in if not authenticated */}
          {!isAuthenticated ? (
            <Route path="*" element={<SignIn onLogin={this.handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/personnel" element={<ListDesPersonnels />} />
              <Route path="/personnel/details/:id" element={<MultiStepForm />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/conge" element={<GestionDeConge />} />
              <Route path="/activite" element={<GestionActivite />} />
              <Route
                path="documents/gestionCV/details/:id"
                element={<GestionCVDetails />}
              />
              <Route
                path="activite/entretien/details/:id"
                element={<DetailEntretienQuestionsPage />}
              />
              <Route path="/Parammetre" element={<ListDesQuestions />} />
              <Route
                path="/Parammetre/details/:id"
                element={<ListDesQuestionsDetails />}
              />
            </>
          )}
        </Routes>
      </Router>
    );
  }
}

export default App;
