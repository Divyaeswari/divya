// AdminDashboard.js
import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';

const AdminDashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <Sidebar user={user} />
      <div className="main-content">
        {/* Main content of the admin dashboard */}
        <h1>Welcome, Admin!</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
