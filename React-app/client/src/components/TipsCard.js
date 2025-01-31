import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import placeholderherojpg from './placeholder-hero.jpg';

const TipsCard = () => {
  const [travelGroups, setTravelGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch travel groups from the backend
  const fetchTravelGroups = async () => {
    try {
      const response = await axios.get('/api/travelgroups');
      setTravelGroups(response.data);
    } catch (error) {
      console.error('Error fetching travel groups:', error);
    }
  };

  // Open modal and fetch data
  const handleShow = () => {
    setShowModal(true);
    fetchTravelGroups(); // Fetch data when modal opens
  };

  // Close modal
  const handleClose = () => setShowModal(false);

  return (
    <div className="card">
      <div className="card-header">
        <h3>TRAVEL GROUP</h3>
        
        <img 
              src={placeholderherojpg} 
              alt="Travel Tips" 
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '8px',
              }} 
              />
              <p>Want to see The Available groups??</p>
              <p>Available Groups for a group travel CLICK The Button</p>
      </div>
      <button className="card-button" onClick={handleShow}>
        CLICK
      </button>

      {/* Modal to display travel groups */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Available Travel Groups</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {travelGroups.length > 0 ? (
            <ul className="list-group">
              {travelGroups.map(group => (
                <li key={group.id} className="list-group-item">
                  <h5>{group.name}</h5>
                  <p>{group.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No travel groups available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TipsCard;