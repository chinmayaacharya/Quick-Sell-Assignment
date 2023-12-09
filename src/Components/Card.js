// Inside Card.js

import React, { useState } from 'react';

const Card = ({ ticket }) => {
  const [completed, setCompleted] = useState(false);

  const getCheckboxStyle = () => {
    switch (ticket.status) {
      case 'todo':
        return {};
      case 'in progress':
        return { backgroundImage: 'linear-gradient(90deg, #ffcccc 50%, #fff 50%)' };
      case 'done':
        return { backgroundColor: '#2196f3', border: '2px solid #fff' };
      case 'cancelled':
        return { backgroundColor: '#ccc', border: 'none' };
      default:
        return {};
    }
  };

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };

  return (
    <div className={`card ${completed ? 'completed' : ''}`}>
      <div className="user-info">
        <div className="user-name">{ticket.userId}</div>
        <div className="user-photo"></div> {/* Add the user photo here */}
      </div>
      <div className="task-info">
        <label className="checkbox-container">
          <input type="checkbox" checked={completed} onChange={handleCheckboxChange} style={getCheckboxStyle()} />
          <span className="checkmark"></span>
        </label>
        <h3>{ticket.title}</h3>
      </div>
    </div>
  );
};

export default Card;
