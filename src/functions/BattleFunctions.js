import { electric, element, fire, grass, normal, water } from "../shared/elements";

export const getPokemonElement = (pokemon) => {
    return element[pokemon];
}

export const getPokemonDamage = (pokemon) => {
    const pokeElement =  getPokemonElement (pokemon);

    if (pokeElement === "normal"){
        return normal;
    } else if (pokeElement === "fire"){
        return fire;
    } else if (pokeElement === "grass"){
        return grass;
    } else if (pokeElement === "water"){
        return water;
    } else if (pokeElement ==="electric"){
        return electric;
    }
}

export const attack = ( attacker,defender ) => {
    const attMultiplier = attacker.damage[defender.element];
    const defMultiplier = defender.damage[attacker.element];

    const finalDamage = attacker.attack*attMultiplier - defender.defense*defMultiplier;
    
    if (finalDamage < 0) {
        return 0
    } else {
        return finalDamage;
    }
}

export const specialAttack = ( attacker,defender ) => {
    const attMultiplier = attacker.damage[defender.element];
    const defMultiplier = defender.damage[attacker.element];

    const finalDamage = attacker.specialAttack*attMultiplier - defender.specialDefense*defMultiplier;

    if (finalDamage < 0) {
        return 0
    } else {
        return finalDamage;
    }
}
