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

// export default class BattleAnnouncer extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             typedMessage:""}
//     }

//     componentDidMount(){
//         this.handleType();
//     }

//     handleType = () => {
//         const { message } = this.props;
//         const { typedMessage } = this.state;

//         if (typedMessage.length < message.length){
//             this.setState({
//                 typedMessage: (message.substring (0, typedMessage.length+1))
//             });
    
//             setTimeout(this.handleType, 200);
//         }  
//     }

//     render() {
//         return (
//             <div className={styles.main}>
//                 <span className={styles.message}>{this.state.typedMessage} <span className={styles.cursor}/></span>
//             </div>
//         )
//     }
// }