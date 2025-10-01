const pokeApi = {};

async function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon(); 
    
    pokemon.name = pokeDetail.name;                     
    pokemon.order = pokeDetail.id;                      
    pokemon.sprite = pokeDetail.sprites.other.dream_world.front_default; 

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;                               
    pokemon.types = types;
    pokemon.type = type;

    const abilities = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name);
    const [ability] = abilities; 
    pokemon.abilities = abilities;

    const statistics = pokeDetail.stats;
    pokemon.stats = statistics;

    return pokemon; 
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = function (offset = 0, limit = 100) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}

pokeApi.getPokemon = function(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// Promise.all([
//     fetch('https://pokeapi.co/api/v2/pokemon/1'),
//     fetch('https://pokeapi.co/api/v2/pokemon/2'),
//     fetch('https://pokeapi.co/api/v2/pokemon/3'),
//     fetch('https://pokeapi.co/api/v2/pokemon/4')
// ]).then((results) => {
//     console.log(results)
// })