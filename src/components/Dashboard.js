import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate(); 
    
    

    return (
        <div>
            <h2>Welcome</h2>
            <button onClick={logout}>Logout</button>
            {/* Add Password Management Features Here */}
        </div>
    );
};

export default Dashboard;
