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
  backgroundColor: '#242F94',
  color: 'white'
  
};

const titleStyle = {
  fontSize: '28px',
  marginBottom: '20px'
};

// Flexbox container to align the textarea and button horizontally
const inputContainerStyle = {
  display: 'flex',
  alignItems: 'center',  // Vertically align items
  justifyContent: 'flex-end',  // Align items to the bottom inside the box
  gap: '10px',  // Add space between textarea and button
  backgroundColor: '#BDC3C7',
  borderRadius: '15px',
  padding: '20px',
  width: '100%',
  maxWidth: '1000px',
  height: '400px',
  flexDirection: 'column',  // Column layout so the button is below textarea
};

const textareaStyle = {
  width: '100%',
  height: '10px',  // Adjusted height of the textarea
  borderRadius: '10px',
  padding: '15px',
  fontSize: '16px',
  border: 'none',
  marginBottom: '10px',  // Space between the textarea and button
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#E67E22',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  height: 'fit-content',
  alignSelf: 'center'  // Center align the button horizontally
};

export default MainSection;
