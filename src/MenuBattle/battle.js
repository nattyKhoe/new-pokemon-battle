import React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
// import pokemons from '../shared/characters';

import PlayerSummary from '../PlayerSummary/PlayerSummary';
import ChoiceMenu from '../ChoiceMenu/ChoiceMenu';
import BattleAnnouncer from '../BattleAnnouncers/BattleAnnouncers';
import { getPokemonDamage, getPokemonElement } from '../functions/BattleFunctions';
import { useBattleSequence } from '../hooks/useBattleSequence';
import { opponentMove } from '../hooks/opponentMove';
// import { wait } from '../hooks/wait';


const Battle = ({onBattleClick, player, opponent}) => {
  // const [isLoaded, setIsLoaded] = useState(false);
  const [playerTeam, setPlayerTeam] = useState (player);
  const [opponentTeam, setOpponentTeam] = useState (opponent);
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
  const [currentOpponent,setCurrentOpponent] = useState ({
    ... opponent[0],
    element: getPokemonElement(opponent[0].name),
    damage: getPokemonDamage(opponent[0].name)
  });
  const [currentPlayer, setCurrentPlayer] = useState ({
    ... player[0],
    element: getPokemonElement(player[0].name),
    damage: getPokemonDamage(player[0].name)
  });
  const [specialAttack, setSpecialAttack] = useState(false);
  const [sequence, setSequence] = useState ({});

  const { turn,
    inSeq,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation
  } = useBattleSequence(sequence, currentPlayer, currentOpponent, player, opponent);

  console.log(currentPlayer)
 
 

  const aiChoice = opponentMove(turn);

  useEffect(()=>{
    if(aiChoice && turn === 1 && !inSeq){
      setSequence ( {turn, mode:aiChoice});
    }
  },[turn, aiChoice, inSeq])

  

  const activateSpecialAttack = () => {
    let n = Math.random() * 10;
    if (n > 8) {
        setSpecialAttack(true);
    }
    console.log(n)
  }

  const onSpecialAttack = () =>{
    console.log('specialAttack');
    setSpecialAttack(false);
    setSequence({turn, mode:'specialAttack'})
  }

    console.log(currentPlayer)
    return(
    <React.Fragment>
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

      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary player={false} pokemon={currentOpponent} health={opponentHealth}/>
        </div>
      </div>
      
      <div className={styles.player}>
        <div className={styles.summary}>
          <PlayerSummary player={true} pokemon={currentPlayer} health={playerHealth}/>
        </div>

        <div className={styles.hud}>

          <div className={styles.hudChild}>
            <BattleAnnouncer message={announcerMessage} />
          </div>
          <div className={styles.hudChild}>
            <ChoiceMenu
            onAttack={()=>setSequence({turn, mode:'attack'})}
            onSwitch={()=>console.log("Switch")}
            onSpecialAttack={onSpecialAttack}
            />
          </div>
        </div>
      </div>
  
    <button onClick={onBattleClick}>End</button>
    </React.Fragment>  
    );
};

export default Battle;
// export default class Battle extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       isLoaded: false,
//       player: {},
//       opponent: {},
//       specialAttack:false
//     }
//   }
//   componentDidMount(){
//     setTimeout(()=>this.setState({
//       isLoaded: true,
//       currentPlayer:{...this.props.player[0],
//         element: getPokemonElement(this.props.player[0].name),
//         damage: getPokemonDamage(this.props.player[0].name)
//       },
//       currentOpponent:{...this.props.opponent[0],
//         element: getPokemonElement(this.props.opponent[0].name),
//         damage: getPokemonDamage(this.props.opponent[0].name)
//       }
//     }), 3000);
//   }

//   activateSpecialAttack = () => {
//     let n = Math.random() * 10;
//     if (n > 8) {
//       this.setState({
//         specialAttack:true
//       })
//     }
//     console.log(n)
//   }

//   onSpecialAttack = () =>{
//     console.log('specialAttack');
//     this.setState({
//       specialAttack:false
//     })
//   }

//   render() {
//     this.activateSpecialAttack();
//     if (this.state.isLoaded){
//       console.log(this.state.currentPlayer);
//     return(
//     <React.Fragment>
//       <div className={styles.characters}>
//         <div className={styles.gameHeader}>
//           {this.state.currentPlayer.name} vs {this.state.currentOpponent.name}
//         </div>
//         <div className={styles.gameImages}>
//           <div className={styles.playerSprite}>
//             <img
//             src={this.state.currentPlayer.spriteBack}
//             alt={this.state.currentPlayer.name}
//             // className={styles.}
//             />
//           </div>
//           <div className={styles.opponentSprite}>
//           <img
//             src={this.state.currentOpponent.spriteFront}
//             alt={this.state.currentOpponent.name}
//             // className={styles.}
//             />
//           </div>
//         </div>
//       </div>

//       <div className={styles.opponent}>
//         <div className={styles.summary}>
//           <PlayerSummary player={false} pokemon={this.state.currentOpponent} />
//         </div>
//       </div>
      
//       <div className={styles.player}>
//         <div className={styles.summary}>
//           <PlayerSummary player={true} pokemon={this.state.currentPlayer} />
//         </div>

//         <div className={styles.hud}>

//           <div className={styles.hudChild}>
//             <BattleAnnouncer message={`What will you do?`} />
//           </div>
//           <div className={styles.hudChild}>
//             <ChoiceMenu
//             onAttack={()=>console.log("Attack")}
//             onSwitch={()=>console.log("Switch")}
//             onSpecialAttack={this.specialAttack}
//             />
//           </div>
//         </div>
//       </div>
  
//     <button onClick={this.props.onBattleClick}>End</button>
//     </React.Fragment>  
//     );
//     } else {
//       return (
//       <div>
//       <img className={styles.loading} src={loading} alt="Loading" />  
//       </div>
//       );  
//   }
// };
// }
