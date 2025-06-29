import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TicketList from './components/TicketList';
import CreateTicketForm from './components/CreateTicketForm';
import TicketDetail from './components/TicketDetail';

function App() {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  };

  return (
    <Router>
      <Navbar />
      <main style={containerStyle}>
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/create" element={<CreateTicketForm />} />
          <Route path="/ticket/:id" element={<TicketDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
