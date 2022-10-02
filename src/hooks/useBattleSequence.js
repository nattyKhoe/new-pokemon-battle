import {attack, specialAttack} from '../functions/BattleFunctions';
import {wait} from '../hooks/wait';
import { useEffect, useState } from 'react';

export function useBattleSequence (sequence, currentPlayer, currentOpponent, player, opponent) {
    
    const [turn, setTurn] = useState(0);
    const [inSeq, setInSeq] = useState(false);

    const [playerHealth, setPlayerHealth] = useState(currentPlayer.maxHp);
    const [opponentHealth, setOpponentHealth] = useState(currentOpponent.maxHp);

    const [announcerMessage, setAnnouncerMessage]= useState('');
    const [playerAnimation, setPlayerAnimation] = useState('');
    const [opponentAnimation, setOpponentAnimation] = useState('');
    console.log(currentPlayer)
        
    useEffect(()=>{
        const {mode, turn} = sequence;

        if (mode) {
            const attacker = turn === 0 ? currentPlayer : currentOpponent;
            const defender = turn === 0 ? currentOpponent : currentPlayer;

            switch (mode){
                case 'attack':{
                    const damage = attack(attacker, defender);

                    (async()=>{
                        setInSeq(true);
                        setAnnouncerMessage(`${attacker.name} is attacking!`);

                        await wait (1000);

                        turn ===0 //attack animation
                        ? setPlayerAnimation ('attack')
                        : setOpponentAnimation ('attack');
                        await wait (100);

                        turn ===0 //stop attack animation
                        ? setPlayerAnimation ('static')
                        : setOpponentAnimation ('static');
                        await wait (500);

                        turn ===0 //damage animation
                        ? setOpponentAnimation ('damage')
                        : setPlayerAnimation ('damage');
                        await wait (750);

                        turn ===0 //stop damage animation
                        ? setOpponentAnimation ('static')
                        : setPlayerAnimation ('static');
                        setAnnouncerMessage(`${defender.name} got attacked!`);
                        turn ===0 //update health
                        ? setOpponentHealth (hp=>(hp-damage>0 ? hp-damage :0))
                        : setPlayerHealth (hp=>(hp-damage>0 ? hp-damage :0));
                        await wait (3000);

                        setAnnouncerMessage(`Now it is ${defender.name}'s turn`)
                        await wait (2500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSeq(false);
                    })();

                    break;
                };
                case 'specialAttack':{
                    const damage = specialAttack(attacker, defender);

                    (async()=>{
                        setInSeq(true);
                        setAnnouncerMessage(`${attacker.name} is using Special Attack!`);

                        await wait (1000);

                        turn ===0 //attack animation
                        ? setPlayerAnimation ('specialAttack')
                        : setOpponentAnimation ('specialAttack');
                        await wait (100);

                        turn ===0 //stop attack animation
                        ? setPlayerAnimation ('static')
                        : setOpponentAnimation ('static');
                        await wait (500);

                        turn ===0 //damage animation
                        ? setOpponentAnimation ('damage')
                        : setPlayerAnimation ('damage');
                        await wait (750);

                        turn ===0 //stop damage animation
                        ? setOpponentAnimation ('static')
                        : setPlayerAnimation ('static');
                        setAnnouncerMessage(`${defender.name} got attacked!`);
                        turn ===0 //update health
                        ? setOpponentHealth (hp=>(hp-damage>0 ? hp-damage :0))
                        : setPlayerHealth (hp=>(hp-damage>0 ? hp-damage :0));
                        await wait (3000);

                        setAnnouncerMessage(`Now it is ${defender.name}'s turn`)
                        await wait (2500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSeq(false);
                    })();

                    break;
                };
                case 'swap':{
                    (async()=>{
                        setInSeq(true);
                        setAnnouncerMessage(`${attacker.name} is attacking!`);

                        await wait (1000);

                        turn ===0 //attack animation
                        ? setPlayerAnimation ('attack')
                        : setOpponentAnimation ('attack');
                        await wait (100);

                        turn ===0 //stop attack animation
                        ? setPlayerAnimation ('static')
                        : setOpponentAnimation ('static');
                        await wait (500);

                        turn ===0 //damage animation
                        ? setOpponentAnimation ('damage')
                        : setPlayerAnimation ('damage');
                        await wait (750);

                        turn ===0 //stop damage animation
                        ? setOpponentAnimation ('static')
                        : setPlayerAnimation ('static');
                        setAnnouncerMessage(`${defender.name} got attacked!`);
                        turn ===0 //update health
                        ? setOpponentHealth (hp=>(hp-damage>0 ? hp-damage :0))
                        : setPlayerHealth (hp=>(hp-damage>0 ? hp-damage :0));
                        await wait (3000);

                        setAnnouncerMessage(`Now it is ${defender.name}'s turn`)
                        await wait (2500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSeq(false);
                    })();

                    break;
                };

                default: {
                    break;
                }
                
                  
                
               
            }
        }
    }, [sequence]);


    return {
        turn,
        inSeq,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation
    }
}