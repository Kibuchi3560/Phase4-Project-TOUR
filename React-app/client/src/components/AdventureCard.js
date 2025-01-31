import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import placeholdertipsjpg from './placeholder-tips.jpg';

const AdventureCard = () => {
  const [sites, setSites] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch sites from the backend
  const fetchSites = async () => {
    try {
      const response = await axios.get('/api/sites');
      setSites(response.data);
    } catch (error) {
      console.error('Error fetching sites:', error);
    }
  };

  // Open modal and fetch data
  const handleShow = () => {
    setShowModal(true);
    fetchSites(); // Fetch data when modal opens
  };

  // Close modal
  const handleClose = () => setShowModal(false);

  return (
    <div className="card">
      <div className="card-header">
        <h3>EXPLORABLE ADVENTURE</h3>
        <img 
                      src={placeholdertipsjpg} 
                      alt="Travel Tips" 
                      style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }} 
                      />

                      <p>Do you want to see The available locations for Travel?</p>
      </div>
      <button className="card-button" onClick={handleShow}>
        CLICK
      </button>

      {/* Modal to display sites */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Available Destinations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {sites.length > 0 ? (
            <ul className="list-group">
              {sites.map(site => (
                <li key={site.id} className="list-group-item">
                  <h5>{site.name}</h5>
                  <p><strong>Location:</strong> {site.location}</p>
                  <p>{site.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No destinations available.</p>
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

export default AdventureCard;