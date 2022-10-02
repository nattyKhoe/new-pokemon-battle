import styles from './styles.module.css';
import React, { useState } from 'react';
import { wait } from '../hooks/wait';

import Start from '../MenuStart/Start';
import SelectPokemons from '../MenuSelect/SelectPokemons';
import Battle from '../MenuBattle/battle';
import Loading from '../Loading/Loading';

import { fetchingPokemonTeam } from '../functions/AppFunctions';


function App () {
  
  const [mode, setMode] = useState('start');
  const [username, setUsername] = useState('');
  const [player, setPlayer] = useState('');
  const [opponent, setOpponent] = useState ('');

  const onStartClick = (name) => {
    setMode('select');
    setUsername(name);
  }

  const onSelectClick = async (pokemons) => {
    if (pokemons.length === 3){
      setPlayer(fetchingPokemonTeam("player", pokemons));
      setOpponent(fetchingPokemonTeam ("opponent", pokemons));
      setMode('loading');
      await wait (3000);
      setMode('battle');
    } 
  }

  const onBattleClick =() => {
    setMode('end')
  }

  const onEndClick = () => {
    setMode('start');
    setUsername('');
    setPlayer('');
    setOpponent('');
  }

  return (
    <div className={styles.main}>
      
      {mode === "start" && (<Start onStartClick={onStartClick}/>)}

      {console.log (mode, username)}

      {mode === "select" && (<SelectPokemons username={username} onSelectClick={onSelectClick}/>)}

      {mode === "loading" && (<Loading/>)}
      
      {mode === "battle" && (<Battle onBattleClick={onBattleClick} player={player} opponent={opponent}/>)}
     
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
