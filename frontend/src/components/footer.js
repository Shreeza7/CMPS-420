import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p style={footerTextStyle}>&copy; 2024 Blog Writer. All Rights Reserved.</p>
    </footer>
  );
};

const footerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#8A7967',
  color: '#F4F1DE',
  position: 'relative',
  bottom: 0,
  maxWidth: '100%', 
  overflow: 'hidden', 
  textAlign: 'center',
};

const footerTextStyle = {
  fontSize: '16px',
  margin: 0,
};

footerStyle['@media (max-width: 600px)'] = {
  padding: '15px 10px',
};

footerTextStyle['@media (max-width: 600px)'] = {
  fontSize: '14px',
};

export default Footer;
