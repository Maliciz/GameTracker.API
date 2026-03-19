import './Header.css';
import { useState } from 'react';
import Modal from '../Modal';
import GameForm from '../GameForm';


function Header({ onOpenModal, addGame }) {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleAddGame = async (game) => {
    await addGame(game); 
    setIsModalOpen(false); 
  };

  return (
    <header>
        <h1>Game Tracker</h1>
      <button className="add-main-btn" onClick={() => setIsModalOpen(true)}>
        Додати нову гру
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 id='Modal-text'>Додати нову гру</h2>
        <GameForm onAdd={handleAddGame} />
      </Modal>
    </header>
  );
}

export default Header;