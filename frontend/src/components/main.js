import React from 'react';

const MainSection = () => {
  return (
    <main style={mainStyle}>
      <h2 style={titleStyle}>Welcome to AI Blog Writing!</h2>
      <div style={inputContainerStyle}>
        <textarea style={textareaStyle} placeholder="Let's turn your ideas into words!"></textarea>
        <button style={buttonStyle}>Generate</button>
      </div>
    </main>
  );
};

const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70vh',

  backgroundColor: '#F4F1DE', 
  color: '#333' 
};

const titleStyle = {
  fontSize: '28px',
  marginBottom: '20px',
  color: '#333' 
};

// Flexbox container to align the textarea and button horizontally
const inputContainerStyle = {

  backgroundColor: '#D9D2C5', 
  borderRadius: '15px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
  maxWidth: '600px',
  height: '400px',
  color: '#333'

};

const textareaStyle = {
  width: '100%',
  height: '10px',  // Adjusted height of the textarea
  borderRadius: '10px',
  padding: '15px',
  fontSize: '16px',
  border: '1px solid #D3CBC2', 
  marginBottom: '20px',
  color: '#333'

};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#F28A2E', 
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',

  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
};

export default MainSection;
