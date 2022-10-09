import React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
// import pokemons from '../shared/characters';

import PlayerSummary from '../PlayerSummary/PlayerSummary';
import ChoiceMenu from '../ChoiceMenu/ChoiceMenu';
import BattleAnnouncer from '../BattleAnnouncers/BattleAnnouncers';
import { useBattleSequence } from '../hooks/useBattleSequence';
import { opponentMove } from '../hooks/opponentMove';
// import { wait } from '../hooks/wait';


const Battle = ({onBattleEnd, player, opponent}) => {
  // const [isLoaded, setIsLoaded] = useState(false);
 
  // const [currentPlayer,setCurrentPlayer] = useState ({
  //   name: "pikachu",
  //   spriteBack: pokemons[6].url,
  //   spriteFront: pokemons[1].url,
  //   health:100,
  //   maxHp:100,
  //   attack:20,
  //   defense:10,
  //   specialAttack:30,
  //   specialDefense:20,
  //   speed:10,
  //   element: getPokemonElement("pikachu"),
  //   damage: getPokemonDamage("pikachu")
  // })
  
  // const [currentOpponent, setCurrentOpponent] = useState({
  //   name: "clefairy",
  //   spriteBack: pokemons[6].url,
  //   spriteFront: pokemons[1].url,
  //   health:80,
  //   maxHp:80,
  //   attack:30,
  //   defense:20,
  //   specialAttack:40,
  //   specialDefense:20,
  //   speed:50,
  //   element: getPokemonElement("clefairy"),
  //   damage: getPokemonDamage("clefairy")
  // })
  
  // const [specialAttack, setSpecialAttack] = useState(false);
  const [sequence, setSequence] = useState ({});

  const { turn,
    inSeq,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
    currentPlayer,
    currentOpponent,
    winner
  } = useBattleSequence(sequence, player, opponent);

  const aiChoice = opponentMove(turn);

  useEffect(()=>{
    if(aiChoice && turn === 1 && !inSeq){
      setSequence ( {turn, mode:aiChoice});
    }
  },[turn, aiChoice, inSeq])

  // useEffect(()=>{
  //   onBattleEnd(winner);
  //   }
  // , [winner, onBattleEnd]);

    return(
    <React.Fragment>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary player={false} name={currentOpponent.name} maxHp={currentOpponent.maxHp} health={opponentHealth}/>
        </div>
      </div>
      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          {currentPlayer.name} vs {currentOpponent.name}
        </div>
        <div className={styles.gameImages}>
          <div className={styles.playerSprite}>
            <img
            src={currentPlayer.spriteBack}
            alt={currentPlayer.name}
            className={styles[playerAnimation]}
            />
          </div>
          <div className={styles.opponentSprite}>
          <img
            src={currentOpponent.spriteFront}
            alt={currentOpponent.name}
            className={styles[opponentAnimation]}
            />
          </div>
        </div>
      </div>
      
      <div className={styles.player}>
        <div className={styles.summary}>
          <PlayerSummary player={true} name={currentPlayer.name} maxHp={currentPlayer.maxHp} health={playerHealth}/>
        </div>

        <div className={styles.hud}>

          <div className={styles.hudChild}>
            <BattleAnnouncer message={announcerMessage} />
          </div>
          <div className={styles.hudChild}>
            <ChoiceMenu
            onAttack={()=>setSequence({turn, mode:'attack'})}
            onSwitch={()=>setSequence({turn, mode:'swap'})}
            onSpecialAttack={() =>setSequence({turn, mode:'specialAttack'})}
            />
          </div>
        </div>
      </div>
    </React.Fragment>  
    );
};

export default Battle;