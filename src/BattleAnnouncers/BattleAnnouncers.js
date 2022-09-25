import React from 'react';
import styles from './styles.module.css';

export default class BattleAnnouncer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={styles.main}>
                <div className={styles.message}>{typedMessage}</div>
            </div>
        )
    }
}