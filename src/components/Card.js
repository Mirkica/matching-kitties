import React from 'react';
import './Card.css';

function Card({ card, onClick }) {
  return (
    <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={() => onClick(card)}>
      <div className="card-front">
        <img src={card.image} alt="cat" />
      </div>
      <div className="card-back"></div>
    </div>
  );
}

export default Card;
