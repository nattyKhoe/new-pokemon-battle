import React from 'react';
import pokemons from '../shared/characters';
import styles from './styles.module.css';
import PokemonCard from './PokemonCard';
import { useState } from 'react';


const SelectPokemons = ( {username, onSelectClick}) => {
    const [tempSelections,setTempSelections] = useState ([]);

    const addNewPokemon = (name) => {
        let team = [...tempSelections];
        team.push(name);
        setTempSelections(team);
    }

    const removePokemon = (name) => {
        let newArray = tempSelections.filter( pokemon => pokemon !== name);
        setTempSelections(newArray);
    }

    return (
        <div className={styles.main}>
            <h1 className={styles.h1}>Welcome {username}</h1>
            <h2 className={styles.h1}> Please Select Three Pokemons </h2>
            <br />

            <div className={styles.selection}>

                {pokemons.map(pokemon=>(
                    <PokemonCard pokemon={pokemon} key={pokemon.name} addNewPokemon={addNewPokemon} removePokemon={removePokemon} tempSelections={tempSelections}/>
                ))}

            </div>
            
            <br />
            {(tempSelections.length === 3)
                ?(<button className={styles.button} onClick={()=>onSelectClick(tempSelections)}>Battle!</button>)
                :null
            }
        </div>
        ) 
    }

// class SelectPokemons extends React.Component {
//     constructor(props){
//         super(props);
//         this.state={
//             tempSelections:[]
//         }
//     }

//     addNewPokemon = (name) => {
//         let { tempSelections } = this.state;
//         tempSelections.push(name);
//         this.setState({tempSelections: tempSelections});
//     }

//     removePokemon = (name) => {
//         let {tempSelections} = this.state;
//         let newArray = tempSelections.filter( pokemon => pokemon !== name);
//         this.setState({tempSelections: newArray});
//     }

//     render (){
//     return (
//         <div className={styles.main}>
//             <h1 className={styles.h1}>Welcome {this.props.username}</h1>
//             <h2 className={styles.h1}> Please Select Three Pokemons </h2>
//             <br />

//             <div className={styles.selection}>
//                 {/* <label>Please Select Three Pokemons

//                 </label>
                
//                 <select>
//                     {pokemons.map(pokemon=>(
//                         <PokemonCard pokemon={pokemon} key={pokemon.name} addNewPokemon={this.addNewPokemon} removePokemon={this.removePokemon} tempSelections={this.state.tempSelections}/>
//                     ))}
//                 </select> */}

                
//                 {pokemons.map(pokemon=>(
//                     <PokemonCard pokemon={pokemon} key={pokemon.name} addNewPokemon={this.addNewPokemon} removePokemon={this.removePokemon} tempSelections={this.state.tempSelections}/>
//                 ))}

//             </div>
            
//             <br />
//             {(this.state.tempSelections.length === 3)
//                 ?(<button className={styles.button} onClick={()=>this.props.onSelectClick(this.state.tempSelections)}>Battle!</button>)
//                 :null
//             }
//         </div>
//         ) 
//     }
// }

export default SelectPokemons;