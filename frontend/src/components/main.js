import React, { useState } from 'react';

const MainSection = () => {
  const [isTextModalOpen, setTextModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const openTextModal = () => setTextModalOpen(true);
  const closeTextModal = () => setTextModalOpen(false);

  const openImageModal = () => setImageModalOpen(true);
  const closeImageModal = () => setImageModalOpen(false);

  return (
    <main style={mainStyle}>
      <h2 style={titleStyle}>Welcome to AI Blog Writing!</h2>
      <div style={optionsContainerStyle}>
        <button style={buttonStyle} onClick={openTextModal}>
          Generate Text
        </button>
        <button style={buttonStyle} onClick={openImageModal}>
          Generate Image
        </button>
      </div>

      {/* Text Generation Modal */}
      {isTextModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3 style={modalTitleStyle}>Generate Text</h3>
            <textarea style={textareaStyle} placeholder="Type your ideas here..."></textarea>
            <button style={modalButtonStyle}>Generate Text</button>
            <button style={closeButtonStyle} onClick={closeTextModal}>Close</button>
          </div>
        </div>
      )}

      {/* Image Generation Modal */}
      {isImageModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3 style={modalTitleStyle}>Generate Image</h3>
            <input type="text" style={inputStyle} placeholder="Describe the image you want to generate..." />
            <button style={modalButtonStyle}>Generate Image</button>
            <button style={closeButtonStyle} onClick={closeImageModal}>Close</button>
          </div>
        </div>
      )}
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

const optionsContainerStyle = {
  display: 'flex',
  gap: '20px'
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

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalStyle = {
  backgroundColor: '#FFF',
  padding: '20px',
  borderRadius: '10px',
  width: '90%',
  maxWidth: '500px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center'
};

const modalTitleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
  color: '#333'
};

const textareaStyle = {
  width: '100%',
  height: '100px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #D3CBC2',
  fontSize: '16px',
  marginBottom: '15px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #D3CBC2',
  fontSize: '16px',
  marginBottom: '15px'
};

const modalButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#F28A2E', 
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  margin: '10px 0'
};

const closeButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#F28A2E',
  fontSize: '14px',
  cursor: 'pointer'
};

export default MainSection;
