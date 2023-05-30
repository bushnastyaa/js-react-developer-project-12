import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Login from '../pages/loginPage/Login.jsx';
import PageNotFound from '../pages/pageNotFound/PageNotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
