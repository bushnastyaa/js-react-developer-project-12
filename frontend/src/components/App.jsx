import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import useAuth from '../hooks/useAuth';
import { AuthProvider } from '../contexts/AuthContext.jsx';
import { ChatProvider } from '../contexts/ChatContext.jsx';
import NavBar from './navigation/NavBar.jsx';
import HomePage from '../pages/homePage/HomePage.jsx';
import LoginPage from '../pages/loginPage/LoginPage.jsx';
import SignUpPage from '../pages/signUpPage/SignUpPage.jsx';
import PageNotFound from '../pages/pageNotFound/PageNotFound.jsx';

const Login = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const App = ({ socket }) => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={(
              <ChatProvider socket={socket}>
                <Login>
                  <HomePage />
                </Login>
              </ChatProvider>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </div>
    </BrowserRouter>
    <ToastContainer />
  </AuthProvider>
);

export default App;
