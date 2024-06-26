import React from 'react';
import './Modal.css';

const Modal = ({ onRestart }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>You've matched all the cards!</p>
        <button onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
};

export default Modal;
