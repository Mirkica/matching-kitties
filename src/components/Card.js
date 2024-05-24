import React from 'react';
import './Card.css';

const Card = ({ id, image, onClick, isFlipped }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => onClick(id)}>
      <div className="card-content">
        <div className="front">?</div> {/* Front side content */}
        <div className="back">
          <img src={`/cats/${image}.jpg`} alt={`Cat ${image}`} /> {/* Back side content */}
        </div>
      </div>
    </div>
  );
};

export default Card;
