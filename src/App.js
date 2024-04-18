import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signup from '../components/Signup43';
import Login from '../components/Login';
import Consola from '../components/Consola';
import PrivateRoute from '../components/PrivateRoute';

const App = () => {
  return (
    <div>

      <Router>
       
          <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/consola" element={<PrivateRoute><Consola/></PrivateRoute>} />
          <Route path="/login" element={<Login/>} />
         
          </Routes>
       
      </Router>
    </div>
  );
};

export default App;

