import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// Optional: if using react-icons for social media icons:
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const ContactCard = () => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">Contact Us</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Location:</strong><br />
          254 Main Street,<br />
          Kanairo , Nai 12345
        </Card.Text>
        <Card.Text>
          <strong>Phone:</strong> (555) 123-4567<br />
          <strong>Email:</strong> SafariSafiriAdventure@yourfirm.com
        </Card.Text>
        <Card.Text>
          <strong>Follow Us:</strong>
        </Card.Text>
        <ListGroup variant="flush">
          <ListGroupItem>
            
            <p>Facebook - SafariSafiriAdventure</p>
         
            <p>Instagram - SafariSafiriAdventure</p>
        
            <p>TikTok - SafariSafiriAdventure</p>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ContactCard;
