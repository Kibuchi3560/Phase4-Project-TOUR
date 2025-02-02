// Itineraries.jsx
import React, { useState, useEffect } from 'react';

const Itineraries = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    fetch('/api/itineraries')
      .then(res => res.json())
      .then(data => setItineraries(data))
      .catch(err => console.error('Error fetching itineraries:', err));
  }, []);

  return (
    <div className="itineraries" style={{ padding: '20px' }}>
      <h2>Itineraries</h2>
      <div className="itinerary-list">
        {itineraries.map(itinerary => (
          <div key={itinerary.id} className="itinerary-item" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{itinerary.title}</h3>
            <p>{itinerary.description}</p>
            <p><strong>Date:</strong> {itinerary.date}</p>
            {itinerary.travel_group && (
              <p><strong>Travel Group:</strong> {itinerary.travel_group.name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itineraries;
