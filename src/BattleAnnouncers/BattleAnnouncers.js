import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { wait } from '../hooks/wait';
import { useState } from 'react';

const BattleAnnouncer = ({message}) => {
    const [typedMessage, setTypedMessage]= useState ('');

    useEffect(()=>{
        setTypedMessage('');
        
        if (message.length){
            (async()=>{
                for (let i = 0; i <= message.length; i++){
                    await wait (100);
                    setTypedMessage(message.substring(0,i));
                }
            }) ();
        }
    }, [message]);

    return (
        <div className={styles.main}>
            <span className={styles.message}>{typedMessage} <span className={styles.cursor}/></span>
        </div>
    );
}

export default BattleAnnouncer;
