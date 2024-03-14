import React from 'react';

const Modal = ({ isOpen, onClose, text }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <p>{text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;