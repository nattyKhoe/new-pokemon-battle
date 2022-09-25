import styles from './styles.module.css';
import logo from '../assets/pokemon-logo.png';
import React from 'react';

export default class Start extends React.Component{
constructor (props){
    super(props);
    this.state = {
        name:""
    }
};

onStartClick = (event) => {
    this.props.onStartClick(this.state.name);
}

onChangeName = (event) =>{
    this.setState({name: event.target.value});
}
render(){
return (
    <div className={styles.main}>
        <img className={styles.logo} src={logo} alt='pokemonlogo'/>
        <br/>
        <form>
            <label>Enter Username: </label>
            <br/>
            <input type='text' id='username' name='username' maxLength='10' placeholder='Username' onChange={this.onChangeName}/>
            <br/>
                <button className={styles.startButton} onClick={this.onStartClick}>
                    Start Game
                </button>
        </form>
    </div>

);
};
};
