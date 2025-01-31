import React, { useEffect, useState } from 'react';

const Sites = () => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetch('/api/sites')
      .then(res => res.json())
      .then(data => setSites(data));
  }, []);

  return (
    <div className="sites">
      <h2>Destinations</h2>
      <div className="site-list">
        {sites.map(site => (
          <div key={site.id} className="site-item">
            <h3>{site.name}</h3>
            <p><strong>Location:</strong> {site.location}</p>
            <p>{site.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sites;