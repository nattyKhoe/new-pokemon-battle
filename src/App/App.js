import styles from './styles.module.css';
import React from 'react';

import Start from '../MenuStart/Start';
import SelectPokemons from '../MenuSelect/SelectPokemons';
import Battle from '../MenuBattle/battle';

import { fetchingPokemonTeam } from '../functions/AppFunctions';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      mode: "start",
      username: "",
      player:[],
      opponent:[],
    }
  };

  onStartClick = (name) => {
    this.setState({
      mode: "select",
      username: name
    })
  }

  onSelectClick = (pokemons) => {
    if (pokemons.length === 3){
      this.setState({
        mode:"battle",
        player: fetchingPokemonTeam ("player", pokemons),
        opponent:fetchingPokemonTeam ("opponent", pokemons),
        isLoaded: true
      });
    } else {
      console.log("Please select three Pokemons")
    }
  }

  onBattleClick =() => {
    this.setState({mode:"end"})
  }

  onEndClick = () => {
    this.setState( {
      mode: "start",
      username: "",
      selectedPokemons: []
    })
  }
  render(){
  return (
    <div className={styles.main}>
      
      {this.state.mode === "start" && (<Start onStartClick={this.onStartClick}/>)}

      {this.state.mode === "select" && (<SelectPokemons username={this.state.username} onSelectClick={this.onSelectClick}/>)}
      {/* {this.state.mode === "battle" && console.log(this.state)} */}
      
      {this.state.mode === "battle" && this.state.isLoaded && (<Battle onBattleClick={this.onBattleClick} player={this.state.player} opponent={this.state.opponent}/>)}
     
    </div>
  );
  };
}

export default App;
