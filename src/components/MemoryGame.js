import React, { useState, useEffect } from 'react';
import Card from './Card';
import './MemoryGame.css';

const MemoryGame = () => {
  const cardImages = ['cat1', 'cat2', 'cat3'];
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    // Duplicate the card images and shuffle them
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, isFlipped: false }));
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (id) => {
    const flippedCard = cards.find(card => card.id === id);
    if (flippedCard.isFlipped || flippedCards.length === 2) return;

    const newFlippedCards = [...flippedCards, id];
    const newCards = cards.map(card =>
      card.id === id ? { ...card, isFlipped: true } : card
    );

    setCards(newCards);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(card => card.id === firstId);
      const secondCard = newCards.find(card => card.id === secondId);

      if (firstCard.image === secondCard.image) {
        setMatchedCards([...matchedCards, firstId, secondId]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(newCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="memory-game">
      {cards.map((card) => (
        <Card
        key={card.id}
        id={card.id}
        image={card.image}
        onClick={handleCardClick}
        isFlipped={card.isFlipped || matchedCards.includes(card.id)}
      />
    ))}
  </div>
);
};

export default MemoryGame;
