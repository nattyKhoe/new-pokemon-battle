import {attack, specialAttack} from '../functions/BattleFunctions';
import {wait} from '../hooks/wait';
import { useEffect, useState } from 'react';

export function useBattleSequence (sequence, player, opponent) {
    const [winner, setWinner]= useState ('');
    
    const [turn, setTurn] = useState(0);
    const [inSeq, setInSeq] = useState(false);

    const [playerTeam, setPlayerTeam] = useState (player);
    const [opponentTeam, setOpponentTeam] = useState (opponent);

    const [currentOpponent,setCurrentOpponent] = useState (opponent[0]);
    const [currentPlayer, setCurrentPlayer] = useState (player[0]);

    const [playerHealth, setPlayerHealth] = useState(currentPlayer.maxHp);
    const [opponentHealth, setOpponentHealth] = useState(currentOpponent.maxHp);

    const [announcerMessage, setAnnouncerMessage]= useState('');
    const [playerAnimation, setPlayerAnimation] = useState('');
    const [opponentAnimation, setOpponentAnimation] = useState('');
    
    const swapPokemon = (pokemonTeam, swappedPokemon) =>{
        let team = pokemonTeam.filter((pokemon)=>pokemon.name !== swappedPokemon.name);
        let dispatched = [];

        if (pokemonTeam.length === 1){
            dispatched = swappedPokemon;
        }
        if (pokemonTeam.length === 2){
            dispatched = team;
        };
        if (pokemonTeam.length === 3){
            let n = Math.floor(Math.random()*10) % 2;
            dispatched = team[n];
        };

        return dispatched;
    };


    const swapOpponent = async(attacker) =>{
        let tempCurrent = {... currentOpponent};
        tempCurrent.health = opponentHealth; //updating the health
        let tempTeam = opponentTeam.filter((pokemon)=>pokemon.name!==currentOpponent.name).concat(tempCurrent);
        setCurrentOpponent(swapPokemon(opponentTeam, attacker));
        setOpponentTeam(tempTeam);
        await wait (3000);
        setPlayerHealth(currentOpponent.health);
        console.log(opponentTeam);
    };

    const swapPlayer = async(attacker) =>{
        let tempCurrent = {...currentPlayer};
        tempCurrent.health = playerHealth;
        let tempTeam = playerTeam.filter((pokemon)=>pokemon.name!== currentPlayer.name).concat(tempCurrent);
        setCurrentPlayer(swapPokemon(playerTeam, attacker));
        setPlayerTeam(tempTeam);
        await wait (3000);
        setPlayerHealth(currentPlayer.health);
        console.log(playerTeam);
    };

    //when the mode or turn change    
    useEffect(()=>{
        const {mode, turn} = sequence;

        if (mode) {
            const attacker = turn === 0 ? currentPlayer : currentOpponent;
            const defender = turn === 0 ? currentOpponent : currentPlayer;
            // need to make sure when it is inseq the button is disabled
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

                        setAnnouncerMessage(playerHealth===0||opponentHealth===0?null:`Now it is ${defender.name}'s turn`);                        
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

                        setAnnouncerMessage(playerHealth===0||opponentHealth===0?null:`Now it is ${defender.name}'s turn`);
                        await wait (2500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSeq(false);
                    })();

                    break;
                };
                case 'swap':
                    (async()=>{
                        setInSeq(true);
                        setAnnouncerMessage(`${attacker.name} is recalled`);

                        turn === 0
                        ? swapPlayer(currentPlayer)
                        : swapOpponent(currentOpponent)
                        await wait (2500);

                        turn ===0 //swap animation
                        ? setPlayerAnimation ('specialAttack')
                        : setOpponentAnimation ('specialAttack');
                        await wait (100);

                        turn ===0 //stop animation
                        ? setPlayerAnimation ('static')
                        : setOpponentAnimation ('static');
                        await wait (500);

                        turn === 0
                        ? setAnnouncerMessage(`${currentPlayer.name} is dispatched`)
                        : setAnnouncerMessage(`${currentOpponent.name} is dispatched`)
                        await wait (2500);

                        turn === 0
                        ? setAnnouncerMessage(`Now it is ${currentOpponent.name}'s turn`)
                        : setAnnouncerMessage(`Now it is ${currentPlayer.name}'s turn`)
                        await wait (2500);
                       
                        setTurn(turn === 0 ? 1 : 0);
                        setInSeq(false);
                    })();
                    break;
                default: {
                    break;
                }   
            }
        }
    }, [sequence]);

    useEffect(()=>{
        (async () => {
            if (playerHealth===0){
                if (playerTeam.length > 1){
                await wait (2000);
                let tempCurrent = {...currentPlayer};
                let dispatched = await swapPokemon(playerTeam, tempCurrent)
                await wait (3000);
                setCurrentPlayer(dispatched);
                let tempTeam = await playerTeam.filter((pokemon)=>pokemon.name!==tempCurrent.name);
                console.log(opponentTeam);
                console.log(playerTeam);
                console.log(tempCurrent);
                console.log(dispatched);
                console.log(tempTeam);
                setPlayerTeam(tempTeam);
                setPlayerHealth(dispatched.health);
                setAnnouncerMessage(`${tempCurrent.name} is heavily injured, ${dispatched.name} is dispatched`)
                await wait (3000);
                setAnnouncerMessage(`It's ${dispatched.name}'s turn`)
                } else {
                    await wait (2000);
                    setWinner ('opponent');
                }
            }
            if (opponentHealth===0){
                if (opponentTeam.length > 1){
                await wait (2000);
                let tempCurrent = {...currentOpponent};
                let dispatched = swapPokemon(opponentTeam, tempCurrent);
                await wait (3000);
                setCurrentOpponent(dispatched);
                let tempTeam = opponentTeam.filter((pokemon)=>pokemon.name!==tempCurrent.name);
                console.log(opponentTeam);
                console.log(playerTeam);
                console.log(tempCurrent);
                console.log(dispatched);
                console.log(tempTeam);
                setOpponentTeam(tempTeam);
                setOpponentHealth(dispatched.health);
                setAnnouncerMessage(`${tempCurrent.name} is heavily injured, ${dispatched.name} is dispatched`)
                await wait (3000);
                setAnnouncerMessage(`It's ${dispatched.name}'s turn`)
                } else {
                    await wait (2000);
                    setWinner ('player');
                }
            }
        })() 
    }, [playerHealth, opponentHealth]);

    return {
        turn,
        inSeq,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
        currentPlayer,
        currentOpponent,
        winner
    }
}