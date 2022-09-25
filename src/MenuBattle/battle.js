import React from 'react';
import pokemons from '../shared/characters';
import styles from './styles.module.css';

import PlayerSummary from '../PlayerSummary/PlayerSummary';
import ChoiceMenu from '../ChoiceMenu/ChoiceMenu';

const playerPokemon = {
  name: "pikachu",
  spriteBack: pokemons[6].url,
  spriteFront: pokemons[1].url,
  health:100,
  maxHp:100,
  attack:20,
  defense:10,
  specialAttack:30,
  specialDefense:20,
  speed:10
}

const opponentPokemon ={
  name: "opponent",
  spriteBack: pokemons[6].url,
  spriteFront: pokemons[1].url,
  health:80,
  maxHp:80,
  attack:30,
  defense:20,
  specialAttack:40,
  specialDefense:20,
  speed:50
}
export default class Battle extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      player: playerPokemon,
      opponent: opponentPokemon
    }
  }

  render() {
    return(
    <React.Fragment>

      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary player={false} pokemon={this.state.opponent} />
        </div>
      </div>

      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          {this.state.player.name} vs {this.state.opponent.name}
        </div>
        <div className={styles.gameImages}>
          <div className={styles.playerSprite}>
            <img
            src={this.state.player.spriteBack}
            alt={this.state.player.name}
            // className={styles.}
            />
          </div>
          <div className={styles.opponentSprite}>
          <img
            src={this.state.opponent.spriteFront}
            alt={this.state.opponent.name}
            // className={styles.}
            />
          </div>
        </div>
      </div>
      <div className={styles.player}>
        <div className={styles.summary}>
          <PlayerSummary player={true} pokemon={this.state.player} />
        </div>

        <div className={styles.hud}>
        <div className={styles.hudChild}>
          <ChoiceMenu
          onAttack={()=>console.log("Attack")}
          onSwitch={()=>console.log("Switch")}
          />
        </div>
      </div>
      </div>
      
    <button onClick={this.props.onBattleClick}>End</button>
    </React.Fragment>  
    );
  };
}
