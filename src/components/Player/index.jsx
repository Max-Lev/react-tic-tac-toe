import React, { useState, useEffect } from 'react';
import css from './index.module.css';

const Player = ({ initialName, symbol, children, isActive, onNameChange, ...props }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  useEffect(() => { setName(initialName); }, [initialName]);

  const handleEditClick = (event) => {
    console.log('handleEditClick', event);
    setIsEditing(isEditing => !isEditing);
    if (isEditing) {
      onNameChange(symbol, name);
    }
  }

  const handleChange = (event) => setName(event.target.value)

  const onBlurHandler = (event) => {
    console.log('onBlurHandler', event);
    setIsEditing(isEditing => !isEditing);
  }

  let playerName = <span className="player-name">{name}</span>;
  if (isEditing) {
    playerName = (
      <input
        required
        type="text"
        // onBlur={onBlurHandler}
        value={name}
        onChange={handleChange}
        autoFocus
      />
    );
  }

  return <>

    <li className={isActive ? 'active' : undefined} id="player1" {...props}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button data-role="save-btn" onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>

  </>


}

export default Player;