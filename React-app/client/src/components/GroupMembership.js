import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GroupMembership = ({ groups, userId, selectedGroupId, setSelectedGroupId, refreshData }) => {
  const [wishlistInput, setWishlistInput] = useState('');

  // Join group
  const handleJoinGroup = async (groupId) => {
    try {
      const res = await fetch(`/api/users/${userId}/groups/${groupId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        alert('Joined group successfully! We will communicate via your email.');
        refreshData();
      } else {
        const errorData = await res.json();
        alert('Error joining group: ' + (errorData.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error joining group: ' + err.message);
    }
  };

  // Leave group
  const handleLeaveGroup = async (groupId) => {
    try {
      const res = await fetch(`/api/users/${userId}/groups/${groupId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert('Left group successfully.');
        refreshData();
      } else {
        const errorData = await res.json();
        alert('Error leaving group: ' + (errorData.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error leaving group: ' + err.message);
    }
  };

  // Update wishlist
  const handleWishlistUpdate = async (e) => {
    e.preventDefault();
    const wishlistArray = wishlistInput.split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wishlist: wishlistArray })
      });
      if (res.ok) {
        alert('Wishlist updated successfully.');
      } else {
        const errorData = await res.json();
        alert('Error updating wishlist: ' + (errorData.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error updating wishlist: ' + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center">Manage Your Group Membership</h3>

          {/* Join Group Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleJoinGroup(selectedGroupId); }}>
            <div className="mb-3">
              <label htmlFor="groupSelect" className="form-label">Select Group to Join:</label>
              <select
                id="groupSelect"
                className="form-select"
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                required
              >
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Join Group</button>
          </form>

          {/* Leave Group Button */}
          <button 
            onClick={() => handleLeaveGroup(selectedGroupId)} 
            className="btn btn-outline-danger w-100 mt-3"
          >
            Leave Selected Group
          </button>

          {/* Wishlist Update Form */}
          <form onSubmit={handleWishlistUpdate} className="mt-4">
            <div className="mb-3">
              <label htmlFor="wishlistInput" className="form-label">
                Update Wishlist (comma-separated Group IDs):
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="wishlistInput"
                  className="form-control"
                  value={wishlistInput}
                  onChange={(e) => setWishlistInput(e.target.value)}
                  placeholder="e.g., 1,2,3"
                  required
                />
                <button type="submit" className="btn btn-success">Update Wishlist</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupMembership;
