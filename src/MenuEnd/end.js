import React from 'react';
import BattleAnnouncer from '../BattleAnnouncers/BattleAnnouncers';
import styles from './styles.module.css';

const End = ({winner, onEndClick})=>{
    const endMsg = (winner === "opponent") ? `Sorry you've lost!` : `Congrats, ${winner}! You've won!`
    return (
        <React.Fragment>
            <BattleAnnouncer message={endMsg}/>
            <button style={styles.button} onClick={onEndClick}>Restart</button>
        </React.Fragment>
    )
};
export default End;