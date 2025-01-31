import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Sites from './components/Sites';
import Itineraries from './components/Itineraries';
import UserProfile from './components/UserProfile';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;