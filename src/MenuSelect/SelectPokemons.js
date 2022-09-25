import React from 'react';
import pokemons from '../shared/characters';
import styles from './styles.module.css';
import PokemonCard from './PokemonCard';

class SelectPokemons extends React.Component {
    constructor(props){
        super(props);
        this.state={
            tempSelections:[]
        }
    }
    
    // saveInput = (name) => {
    //     this.setState({pokemon: name});
    //     // console.log(name);
    // }

    addNewPokemon = (name) => {
        let { tempSelections } = this.state;
        tempSelections.push(name);
        this.setState({tempSelections: tempSelections});
    }

    removePokemon = (name) => {
        let {tempSelections} = this.state;
        let newArray = tempSelections.filter( pokemon => pokemon !== name);
        this.setState({tempSelections: newArray});
    }

    render (){
    return (
        <React.Fragment>
            <h1 className={styles.h1}>Welcome {this.props.username}</h1>
            <h1> Select Pokemons </h1>

            {pokemons.map(pokemon=>(
                <PokemonCard pokemon={pokemon} key={pokemon.name} addNewPokemon={this.addNewPokemon} removePokemon={this.removePokemon} tempSelections={this.state.tempSelections}/>
            ))}

            <button onClick={()=>this.props.onSelectClick(this.state.tempSelections)}>Battle</button>
            </React.Fragment>
        ) 
    }
}

export default SelectPokemons;