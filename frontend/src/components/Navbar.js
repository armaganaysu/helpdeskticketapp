import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const headerStyle = {
    backgroundColor: '#007bff',
    padding: '1rem 2rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    padding: '0.5rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <ul style={ulStyle}>
          <li>
            <Link to="/" style={linkStyle}>
              Tüm Talepler
            </Link>
          </li>
          <li>
            <Link to="/create" style={linkStyle}>
              Yeni Talep Oluştur
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
