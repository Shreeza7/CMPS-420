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

const inputContainerStyle = {
  backgroundColor: '#BDC3C7',
  borderRadius: '15px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '80%',
  maxWidth: '600px',
  height: '200px'
};

const textareaStyle = {
  width: '100%',
  height: '10px',
  borderRadius: '10px',
  padding: '15px',
  fontSize: '16px',
  border: 'none',
  marginBottom: '20px'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#E67E22',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default MainSection;
