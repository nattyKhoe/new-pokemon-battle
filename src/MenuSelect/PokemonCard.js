import React, { useState } from 'react';
import styles from './styles.module.css';

const PokemonCard = ({addNewPokemon, removePokemon, tempSelections, pokemon}) => {
    const [isSelected, setIsSelected] = useState (false);

    const onSelectingPokemons = () => {

        if (isSelected){
            removePokemon(pokemon.name);
            setIsSelected(false);
        } else {
            if (tempSelections.length <3){
                addNewPokemon(pokemon.name);
                setIsSelected(true);
            }

        };

    };

    return(
        <div className={isSelected?styles.selected:styles.container} onClick={onSelectingPokemons}>
            <h3 className={styles.h1}>{pokemon.name}</h3>
            <img className={styles.image} src={pokemon.url} alt={pokemon.name}/>
            {isSelected ? (<h2 className={styles.h1}>✔</h2>) : null}
        </div> 
        );
    };

// class PokemonCard extends React.Component {
//     constructor (props){
//         super(props);
//         this.state ={
//             isSelected: false
//         }
//     }

//     onSelectingPokemons = () => {
//         let { isSelected } = this.state;

//         if (isSelected === true){
//             this.props.removePokemon(this.props.pokemon.name);
//             this.setState({isSelected:false})
            
//         } else {
//             if (this.props.tempSelections.length <3){
//                 this.props.addNewPokemon(this.props.pokemon.name);
//                 this.setState({isSelected:true})
//             }

//         };

//     }

//     render(){
//     return(
//         <div className={this.state.isSelected?styles.selected:styles.container} onClick={this.onSelectingPokemons}>
//             <h3 className={styles.h1}>{this.props.pokemon.name}</h3>
//             <img className={styles.image} src={this.props.pokemon.url} alt={this.props.pokemon.name}/>
//             {this.state.isSelected ? (<h2 className={styles.h1}>✔</h2>) : null}
//         </div> 
//     );
//     };
// }

export default PokemonCard;