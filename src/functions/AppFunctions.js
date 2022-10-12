import pokemons from "../shared/characters";
import { getPokemonElement, getPokemonDamage } from "./BattleFunctions";

export const   fetchPokemons = (playerTeam)=>{
    let team = [];

    for (let i=0; i<3 ; i++){
      let pokemon = {};

      fetch(`https://pokeapi.co/api/v2/pokemon/${playerTeam[i]}`)
      .then(response=> response.json())
      .then(data => {
        pokemon.name = data.forms[0].name;
        pokemon.spriteFront = data.sprites.front_default;
        pokemon.spriteBack = data.sprites.back_default;
        pokemon.health = data.stats[0].base_stat;
        pokemon.maxHp = data.stats[0].base_stat;
        pokemon.attack = data.stats[1].base_stat;
        pokemon.defense = data.stats[2].base_stat;
        pokemon.specialAttack = data.stats[3].base_stat;
        pokemon.specialDefense = data.stats[4].base_stat;
        pokemon.element = getPokemonElement(data.forms[0].name);
        pokemon.damage = getPokemonDamage(data.forms[0].name);

        // pokemon.speed = data.stats[5].base_stat;
      })
      .then(()=>{
        team.push(pokemon);
      })
      .catch(console.error);
    }
    return team;
  };

export const getRandomPokemons=()=>{
    let team = [];
    let index = [];

    for (let i = 0; i < 3; i++) {
      let number = Math.floor(Math.random()*10);
      if(i === 0){
        index.push (number);
      } else {
        while (number === index [i-1]){
          number = Math.floor(Math.random()*10);
        }
        index.push(number);
      }

      team.push(pokemons[number].name);
    };

    return team;
  };

 export const  fetchingPokemonTeam= (playerTeam, selectedPokemons) =>{
    if (playerTeam === "player"){
      return fetchPokemons(selectedPokemons);
    } else {
      let opponents = getRandomPokemons ();
      return fetchPokemons(opponents);
      }
    };