import React, { useEffect, useState } from 'react';

const Itineraries = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    fetch('/api/itineraries')
      .then(res => res.json())
      .then(data => setItineraries(data));
  }, []);

  return (
    <div className="itineraries">
      <h2>Itineraries</h2>
      <div className="itinerary-list">
        {itineraries.map(itinerary => (
          <div key={itinerary.id} className="itinerary-item">
            <h3>{itinerary.title}</h3>
            <p>{itinerary.description}</p>
            <p><strong>Date:</strong> {itinerary.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itineraries;