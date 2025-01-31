import React, { useEffect, useState } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Travel Group ID:</strong> {user.travel_group_id}</p>
    </div>
  );
};

export default UserProfile;