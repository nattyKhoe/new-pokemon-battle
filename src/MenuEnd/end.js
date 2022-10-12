import React from 'react';
import BattleAnnouncer from '../BattleAnnouncers/BattleAnnouncers';
import styles from './styles.module.css';
import Confetti from 'react-confetti';

const End = ({winner, onEndClick})=>{
    const endMsg = winner === "opponent" ? `Sorry you've lost!` : `Congrats, ${winner}! You've won!`
    return (
        <div className={styles.main}>
            {winner === "player"
            ? (<Confetti/>)
            :null}
            <BattleAnnouncer message={endMsg}/>
            <div className={styles.container}>
            <button className={styles.restart} onClick={onEndClick}>Restart</button>
            </div>
            {console.log(endMsg)}
            {console.log(winner)}
        </div>
    )
};
export default End;