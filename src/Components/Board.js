// Inside Board.js

import React from 'react';
import Card from './Card';

const groupTickets = (tickets, grouping) => {
  switch (grouping) {
    case 'status':
      return tickets.reduce((grouped, ticket) => {
        const status = ticket.status;
        if (!grouped[status]) grouped[status] = [];
        grouped[status].push(ticket);
        return grouped;
      }, {});

    case 'user':
      return tickets.reduce((grouped, ticket) => {
        const userId = ticket.userId;
        if (!grouped[userId]) grouped[userId] = [];
        grouped[userId].push(ticket);
        return grouped;
      }, {});

    case 'priority':
      return tickets.reduce((grouped, ticket) => {
        const priority = ticket.priority;
        if (!grouped[priority]) grouped[priority] = [];
        grouped[priority].push(ticket);
        return grouped;
      }, {});

    default:
      return { ungrouped: tickets };
  }
};

const sortTickets = (tickets, sorting) => {
  switch (sorting) {
    case 'priority':
      return tickets.sort((a, b) => b.priority - a.priority);

    case 'title':
      return tickets.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return tickets;
  }
};

const Board = ({ tickets, grouping, sorting }) => {
  const groupedTickets = groupTickets(tickets, grouping);
  const sortedTickets = sortTickets(groupedTickets[grouping] || tickets, sorting);

  const renderSections = () => {
    switch (grouping) {
      case 'status':
        return Object.keys(groupedTickets).map((status) => (
          <div key={status} className="section">
            <h2>{status}</h2>
            {sortedTickets.map((ticket) =>
              ticket.status === status ? <Card key={ticket.id} ticket={ticket} /> : null
            )}
          </div>
        ));

      case 'user':
        return Object.keys(groupedTickets).map((userId) => (
          <div key={userId} className="section">
            <h2>{userId}</h2>
            {sortedTickets.map((ticket) =>
              ticket.userId === userId ? <Card key={ticket.id} ticket={ticket} /> : null
            )}
          </div>
        ));

      case 'priority':
        return Object.keys(groupedTickets).map((priority) => (
          <div key={priority} className="section">
            <h2>Priority: {priority}</h2>
            {sortedTickets.map((ticket) =>
              ticket.priority.toString() === priority ? (
                <Card key={ticket.id} ticket={ticket} />
              ) : null
            )}
          </div>
        ));

      default:
        return (
          <div className="section">
            {sortedTickets.map((ticket) => (
              <Card key={ticket.id} ticket={ticket} />
            ))}
          </div>
        );
    }
  };

  return <div className="board">{renderSections()}</div>;
};

export default Board;
