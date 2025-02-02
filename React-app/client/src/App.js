// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Sites from './components/Sites';
import Itineraries from './components/Itineraries';
import UserProfile from './components/UserProfile';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './components/ProtectedRoute';
import GroupReviewsManager from './components/GroupReviewsManager';
import './App.css';

function App() {
  // In a production app, get the current user ID from your authentication state/context
  const currentUserId = 1;

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/groups" element={<GroupReviewsManager userId={currentUserId} />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
