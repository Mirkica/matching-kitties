import React from 'react';
import './App.css';
import MemoryGame from './components/MemoryGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Matching Kitties</h1>
        <p>Match all 😸 to win the game!</p>
      </header>
      <MemoryGame />
    </div>
  );
}

export default App;
