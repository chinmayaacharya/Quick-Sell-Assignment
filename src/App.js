// Inside App.js

import React, { useState, useEffect } from 'react';
import Board from './Components/Board';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');
  const [displayOptionsVisible, setDisplayOptionsVisible] = useState(false);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => setTickets(data.tickets));
  }, []);

  const toggleDisplayOptions = () => {
    setDisplayOptionsVisible(!displayOptionsVisible);
  };

  return (
    <div className="app">
      <nav>
        <div className="navbar">
          <div className="display-options">
            <button onClick={toggleDisplayOptions}>Display Options</button>
            {displayOptionsVisible && (
              <div className="options-dropdown">
                <label>
                  Grouping:
                  <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </label>
                <label>
                  Ordering:
                  <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </label>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Board tickets={tickets} grouping={grouping} sorting={sorting} />
    </div>
  );
};

export default App;
