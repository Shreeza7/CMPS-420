import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>Blog Writer</div>
      <nav>
        <ul style={navStyle}>
          <li><a href="/" style={linkStyle}>Home</a></li>
          <li><a href="/blogs" style={linkStyle}>Blogs</a></li>
          <li><a href="/about" style={linkStyle}>About</a></li>
          <li><a href="/login" style={linkStyle}>Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#192169',
  color: 'white'
};

const logoStyle = {
  fontWeight: 'bold',
  fontSize: '24px'

};

const navStyle = {
  listStyleType: 'none',
  display: 'flex',
  gap: '20px',
  fontWeight: 'bold'
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px'
  };
export default Header;
