import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './coponent/home';
import Signup from './coponent/singup';
import Login from './coponent/login';
import AddBook from './coponent/Add';
import EditBook from './coponent/Edit';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsAuth(true);  
    } else {
      setIsAuth(false); 
    }
    
    setLoading(false);
  }, []); 

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <Router>
    <Routes>

      <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
      <Route path="/signup" element={<Signup setIsAuth={setIsAuth} />} />
      <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      <Route path="/add" element={isAuth ? <AddBook /> : <Navigate to="/login" />} />
      <Route path="/edit/:id" element={isAuth ? <EditBook /> : <Navigate to="/login" />} />
    </Routes>
  </Router>
  );
};

export default App;








