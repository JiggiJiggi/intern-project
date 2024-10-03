// src/components/ExternalModal.jsx

import React, { useState } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root'); // For accessibility

const CalendarModal = ({ isOpen, onRequestClose }) => {
  return (
   <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="External Content"
      style={{
        content: {
          width: '60%',
          height: '80%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Center the modal
          borderRadius: '10px',
          padding: '20px',
          backgroundColor: '#fff',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <button onClick={onRequestClose}>Close</button>
      <iframe
        src="http://localhost:3000"
        title="External Content"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </Modal>
  );
};

export default CalendarModal;
