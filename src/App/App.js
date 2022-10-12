import styles from './styles.module.css';
import React, { useState } from 'react';
import { wait } from '../hooks/wait';

import Start from '../MenuStart/Start';
import SelectPokemons from '../MenuSelect/SelectPokemons';
import Battle from '../MenuBattle/battle';
import Loading from '../Loading/Loading';
import End from '../MenuEnd/end';

import { fetchingPokemonTeam } from '../functions/AppFunctions';


function App () {
  
  const [winner, setWinner] = useState('');
  const [appMode, setAppMode] = useState('start');
  const [username, setUsername] = useState('');
  const [player, setPlayer] = useState([]);
  const [opponent, setOpponent] = useState ([]);

  const onStartClick = (name) => {
    if (name.length !== 0){
      setAppMode('select');
      setUsername(name);
    }
    
  }

  const onSelectClick = async (pokemons) => {
    if (pokemons.length === 3){
      setPlayer(fetchingPokemonTeam("player", pokemons));
      setOpponent(fetchingPokemonTeam ("opponent", pokemons));
      setAppMode('loading');
      await wait (3000);
      setAppMode('battle');
    } 
  }

  const onBattleEnd =(winner) => {
    setAppMode('end');
    setWinner(winner);
  }

  const onEndClick = () => {
    setAppMode('start');
    setUsername('');
    setPlayer('');
    setOpponent('');
    setWinner('');
  }

  return (
    <div className={winner === "opponent" ?styles.lost :styles.main}>
      
      {appMode === "start" && (<Start onStartClick={onStartClick}/>)}

      {appMode === "select" && (<SelectPokemons username={username} onSelectClick={onSelectClick}/>)}

      {appMode === "loading" && (<Loading/>)}
      
      {appMode === "battle" && (<Battle onBattleEnd={onBattleEnd} player={player} opponent={opponent}/>)}

      {appMode === "end" && (<End winner={winner==="player" ? username : "opponent"} onEndClick={onEndClick}/>)}
    </div>
  );
  };

export default App;
