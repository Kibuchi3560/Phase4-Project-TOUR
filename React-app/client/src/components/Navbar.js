import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', formData);
      console.log('User created:', response.data);
      handleClose();
      // You might want to add login logic here or redirect
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1 className="rayiguer">SAFARI ADVENTURE</h1>
      <nav className="nav nav-pills nav-fill">
        <Link className="nav-link active" to="/sites">Destinations</Link>
        <Link className="nav-link" to="/itineraries">Itineraries</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <Button variant="primary" onClick={handleShow}>
          SIGN IN/SIGN UP
        </Button>
      </nav>

      {/* Sign In/Up Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account / Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Navbar;