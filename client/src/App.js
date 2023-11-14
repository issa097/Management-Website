
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Home'
import LoginForm from '../src/Components/Login';
import RegisterForm from '../src/Components/Register';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path="/home" element={<Homepage />} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/Register' element={<RegisterForm/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
