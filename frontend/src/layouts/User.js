// UserDashboard.js
import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';

const UserDashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <Sidebar user={user} />
      <div className="main-content">
        {/* Main content of the user dashboard */}
        <h1>Welcome, User!</h1>
      </div>
    </div>
  );
};

export default UserDashboard;
