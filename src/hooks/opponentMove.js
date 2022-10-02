import { useEffect, useState } from "react";


export const opponentMove = (turn) => {

    const [aiChoice, setAIChoice] = useState ('')

    useEffect(()=>{
        if (turn === 1){
            const options = ['attack', 'specialAttack', 'swap'];
            const randomNumber = Math.random()*10;
            
            if (randomNumber < 5){
                setAIChoice(options[0])
            } else if (randomNumber < 8){
                setAIChoice(options[1])
            } else {
                setAIChoice(options[2])
            }
            
        }
    }, [turn]);

    return aiChoice;
   
}