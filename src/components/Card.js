import React from 'react';
import './Card.css';

const Card = ({ id, image, onClick, isFlipped }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => onClick(id)}>
      <div className="front">Flip me!</div>
      <div className="back">
        <img src={`${process.env.PUBLIC_URL}/cats/${image}.jpg`} alt={`Cat ${id}`} />
      </div>
    </div>
  );
};

export default Card;
