import React from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import

const Home = () => {
  const navigate = useNavigate();  // Replaced useHistory with useNavigate

  // Navigate to Create Text page
  const goToCreateText = () => {
    navigate('/create-text');  // Replaced history.push with navigate
  };

  // Navigate to Create Image page
  const goToCreateImage = () => {
    navigate('/create-image');  // Replaced history.push with navigate
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Choose an Option</h2>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={goToCreateText}>Create Text</button>
        <button style={buttonStyle} onClick={goToCreateImage}>Create Image</button>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#242F94',
  color: 'white'
};

const titleStyle = {
  fontSize: '28px',
  marginBottom: '20px'
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px'
};

const buttonStyle = {
  padding: '15px 30px',
  backgroundColor: '#E67E22',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '18px',
  cursor: 'pointer'
};

export default Home;
