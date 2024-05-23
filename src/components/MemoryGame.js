import React, { useState, useEffect } from 'react';
import Card from './Card';
import Modal from './Modal'; // Import the Modal component
import './MemoryGame.css';

const MemoryGame = () => {
  const cardImages = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6'];
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  useEffect(() => {
    // Duplicate the card images and shuffle them
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, isFlipped: false }));
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (matchedCards.length === cardImages.length * 2) {
      setIsGameCompleted(true);
    }
  }, [cardImages.length, matchedCards]);

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

  const handleRestart = () => {
    setIsGameCompleted(false);
    setMatchedCards([]);
    setFlippedCards([]);
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, isFlipped: false }));
    setCards(shuffledCards);
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
      {isGameCompleted && <Modal onRestart={handleRestart} />}
    </div>
  );
};

export default MemoryGame;
