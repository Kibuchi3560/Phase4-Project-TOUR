import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

const GroupList = ({ groups }) => {
  return (
    <Container fluid className="mt-4">
      <h3>Available Travel Groups and Their Itineraries</h3>
      {groups.length === 0 ? (
        <p>No groups available.</p>
      ) : (
        // This div is a flex container that scrolls horizontally
        <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', padding: '1rem' }}>
          {groups.map(group => (
            <Card key={group.id} style={{ minWidth: '300px', flex: '0 0 auto' }}>
              <Card.Header as="h5">{group.name}</Card.Header>
              <Card.Body>
                <Card.Text>{group.description}</Card.Text>
                {group.itineraries && group.itineraries.length > 0 ? (
                  <>
                    <Card.Subtitle className="mb-2 text-muted">Itineraries:</Card.Subtitle>
                    <ListGroup variant="flush">
                      {group.itineraries.map(itinerary => (
                        <ListGroup.Item key={itinerary.id}>
                          <h6>{itinerary.title}</h6>
                          <p>{itinerary.description}</p>
                          <p>
                            <strong>Date:</strong> {itinerary.date}
                          </p>
                          <p>
                            <strong>Travel Group:</strong> {group.name}
                          </p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                ) : (
                  <Card.Text>No itineraries available.</Card.Text>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default GroupList;
