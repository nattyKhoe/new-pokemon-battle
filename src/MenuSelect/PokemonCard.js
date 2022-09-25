import React from 'react';
import styles from './styles.module.css';

class PokemonCard extends React.Component {
    constructor (props){
        super(props);
        this.state ={
            isSelected: false
        }
    }

    onSelectingPokemons = () => {
        let { isSelected } = this.state;

        if (isSelected === true){
            this.props.removePokemon(this.props.pokemon.name);
            this.setState({isSelected:false})
            
        } else {
            if (this.props.tempSelections.length <3){
                this.props.addNewPokemon(this.props.pokemon.name);
                this.setState({isSelected:true})
            }

        };

    }

    render(){
    return(
        <div className={styles.container} onClick={this.onSelectingPokemons}>
            <h3 className={styles.h3}>{this.props.pokemon.name.toUpperCase()}</h3>
            <img className={styles.image} src={this.props.pokemon.url} alt={this.props.pokemon.name}/>
            {this.state.isSelected ? (<h3 className='check'>✔</h3>) : null}
        </div> 
    );
    };
}

export default PokemonCard;