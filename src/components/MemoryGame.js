import React, { useState, useEffect, useMemo } from 'react';
import Card from './Card';
import Modal from './Modal';
import './MemoryGame.css';

const MemoryGame = () => {
  const cardImages = useMemo(() => ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6'], []);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, [cardImages]);

  useEffect(() => {
    console.log('matchedCards:', matchedCards);
    console.log('cardImages length:', cardImages.length);
    console.log('matchedCards length:', matchedCards.length);
    if (matchedCards.length === cardImages.length * 2) {
      setShowModal(true);
    }
  }, [matchedCards, cardImages.length]);

  const [clickCount, setClickCount] = useState(0);

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;

    setFlippedCards((prev) => {
      const newFlippedCards = [...prev, id];
      if (newFlippedCards.length === 2) {
        const [firstIndex, secondIndex] = newFlippedCards;
        if (cards[firstIndex] === cards[secondIndex]) {
          setMatchedCards((prev) => {
            if (!prev.includes(firstIndex) && !prev.includes(secondIndex)) {
              return [...prev, firstIndex, secondIndex];
            }
            return prev;
          });
        }
        setTimeout(() => setFlippedCards([]), 1000);
      }
      return newFlippedCards;
    });
    setClickCount(prevCount => prevCount + 1);
  };


  const handleRestart = () => {
    const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setShowModal(false);

    setClickCount(0);
  };

  return (
    <><div>Click Count: {clickCount}</div>
    <div className="memory-game">
      {cards.map((image, index) => (
        <Card
          key={index}
          id={index}
          image={image}
          onClick={handleCardClick}
          isFlipped={flippedCards.includes(index) || matchedCards.includes(index)} />
      ))}
      {showModal && <Modal onRestart={handleRestart} />}
    </div></>
  );
};

export default MemoryGame;
