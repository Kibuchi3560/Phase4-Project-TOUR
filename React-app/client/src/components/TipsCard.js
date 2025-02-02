// TipsCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import placeholderherojpg from './placeholder-hero.jpg';

const TipsCard = () => {
  const [travelGroups, setTravelGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      fetchTravelGroups();
    }
  }, [showModal]);

  const fetchTravelGroups = async () => {
    try {
      const response = await axios.get('/api/travelgroups');
      setTravelGroups(response.data);
    } catch (error) {
      console.error('Error fetching travel groups:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>TRAVEL GROUP</h3>
        <img src={placeholderherojpg} alt="Travel Tips" className="img-fluid rounded" />
        <p>Want to see the available groups?</p>
        <p>Click the button below to view available groups for group travel.</p>
      </div>
      <Button onClick={() => setShowModal(true)}>CLICK</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TipsCard;