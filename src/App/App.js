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
    setAppMode('select');
    setUsername(name);
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
  }

  return (
    <div className={styles.main}>
      
      {appMode === "start" && (<Start onStartClick={onStartClick}/>)}

      {appMode === "select" && (<SelectPokemons username={username} onSelectClick={onSelectClick}/>)}

      {appMode === "loading" && (<Loading/>)}
      
      {appMode === "battle" && (<Battle onBattleEnd={onBattleEnd} player={player} opponent={opponent}/>)}

      {/* {appMode === "end" && (<End winner={winner==="player" ? username : "opponent"} onEndClick={onEndClick}/>)} */}
    </div>
  );
  };
// class App extends React.Component {
//   constructor(){
//     super()
//     this.state = {
//       mode: "start",
//       username: "",
//       player:[],
//       opponent:[],
//     }
//   };

//   onStartClick = (name) => {
//     this.setState({
//       mode: "select",
//       username: name
//     })
//   }

//   onSelectClick = (pokemons) => {
//     if (pokemons.length === 3){
//       this.setState({
//         mode:"battle",
//         player: fetchingPokemonTeam ("player", pokemons),
//         opponent:fetchingPokemonTeam ("opponent", pokemons)
//       });
//     } else {
//       console.log("Please select three Pokemons")
//     }
//   }

//   onBattleClick =() => {
//     this.setState({mode:"end"})
//   }

//   onEndClick = () => {
//     this.setState( {
//       mode: "start",
//       username: "",
//       selectedPokemons: []
//     })
//   }
//   render(){
//   return (
//     <div className={styles.main}>
      
//       {this.state.mode === "start" && (<Start onStartClick={this.onStartClick}/>)}

//       {this.state.mode === "select" && (<SelectPokemons username={this.state.username} onSelectClick={this.onSelectClick}/>)}
//       {/* {this.state.mode === "battle" && console.log(this.state)} */}
      
//       {this.state.mode === "battle" && (<Battle onBattleClick={this.onBattleClick} player={this.state.player} opponent={this.state.opponent}/>)}
     
//     </div>
//   );
//   };
// }

export default App;
