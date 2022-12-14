import React from 'react';
import styles from './styles.module.css';
import HealthBar from '../HealthBar/HealthBar';

const red = "#821200";
const blue = "#1953cb";

const PlayerSummary = ({player, name, maxHp, health}) => {
    return (<div
        style={{backgroundColor: player ? red :blue}}
        className = {styles.main}>
            <div className={styles.info}>
                <div className={styles.name}>{name}</div>
            </div>

            <div className={styles.health}>
                <HealthBar label="HP" health= {health} maxHealth={maxHp}/>
            </div>
        </div>);
}

export default PlayerSummary;

// export default class PlayerSummary extends React.Component {
//     // constructor (props){
//     //     super(props);
//     // }

//     render () {
//         return (<div
//         style={{backgroundColor: this.props.player ? red :blue}}
//         className = {styles.main}>
//             <div className={styles.info}>
//                 <div className={styles.name}>{this.props.pokemon.name.toUpperCase()}</div>
//             </div>

//             <div className={styles.health}>
//                 <HealthBar label="HP" health= {this.props.pokemon.health} maxHealth={this.props.pokemon.maxHp}/>
//             </div>
//         </div>)
//    }
// }
