import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { AuthProvider } from '../contexts/AuthContext.jsx';
import LoginPage from '../pages/loginPage/LoginPage.jsx';
import PageNotFound from '../pages/pageNotFound/PageNotFound.jsx';

function Login({ children }) {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
