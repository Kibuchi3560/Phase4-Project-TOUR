// GroupReviewsManager.jsx
import React, { useState, useEffect } from 'react';
import GroupList from './GroupList';
import GroupMembership from './GroupMembership';
import ReviewForm from './ReviewForm';
import ContactCard from './ContactCard';

const GroupReviewsManager = ({ userId }) => {
  const [groups, setGroups] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch('/api/travelgroups');
        if (res.ok) {
          const data = await res.json();
          setGroups(data);
          if (data.length > 0) setSelectedGroupId(data[0].id);
        }
      } catch (err) { console.error(err); }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) setReviews(await res.json());
      } catch (err) { console.error(err); }
    };

    fetchGroups();
    fetchReviews();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Group and Review Manager</h2>
      <GroupList groups={groups} reviews={reviews} />
      <GroupMembership groups={groups} userId={userId} selectedGroupId={selectedGroupId} setSelectedGroupId={setSelectedGroupId} />
      <ReviewForm userId={userId} groups={groups} selectedGroupId={selectedGroupId} />
      <ContactCard />
    </div>
  );
};

export default GroupReviewsManager;
