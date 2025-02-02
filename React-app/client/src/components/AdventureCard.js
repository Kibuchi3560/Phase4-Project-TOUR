// AdventureCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import placeholdertipsjpg from './placeholder-tips.jpg';

const AdventureCard = () => {
  const [sites, setSites] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      fetchSites();
    }
  }, [showModal]);

  const fetchSites = async () => {
    try {
      const response = await axios.get('/api/sites');
      setSites(response.data);
    } catch (error) {
      console.error('Error fetching sites:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>EXPLORABLE ADVENTURE</h3>
        <img src={placeholdertipsjpg} alt="Travel Tips" className="img-fluid rounded" />
        <p>Do you want to see the available locations for travel?</p>
      </div>
      <Button onClick={() => setShowModal(true)}>CLICK</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdventureCard;

