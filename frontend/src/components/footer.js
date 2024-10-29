import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Blog Writer. All Rights Reserved.</p>
    </footer>
  );
};

const footerStyle = {
  textAlign: 'center',
  padding: '10px',
  backgroundColor: '#192169',
  color: 'white',
  position: 'relative',
  bottom: 0,
  width: '100%'
};

export default Footer;