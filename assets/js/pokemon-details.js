const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

const pokemonName = document.getElementById('pokemon-name')
const pokemonNumber = document.getElementById('pokemon-number')
const pokemonImage = document.getElementById('pokemon-image')
const typeBadge = document.getElementById('type-badge')
const abilitiesBadges = document.getElementById('abilities-badges')
const statsGrid = document.getElementById('stats-grid')
const evolutionItem = document.getElementById('evolution-item')

loadPokemonDetails(pokemonId);

function loadPokemonDetails(pokemonId) {
  pokeApi.getPokemon(pokemonId).then((pokemon) => {
    pokemonName.textContent = pokemon.name
    if(pokemon.order > 0 && pokemon.order < 10){
      pokemonNumber.textContent = 'Nº00' + pokemon.order
    }else if(pokemon.order >= 10 && pokemon.order < 100) {
      pokemonNumber.textContent = 'Nº0' + pokemon.order
    }else{
      pokemonNumber.textContent = pokemon.order
    }
    
    pokemonImage.src = pokemon.sprite
    typeBadge.textContent = pokemon.type
    document.getElementById('header').classList.add(pokemon.type)
    typeBadge.classList.add(pokemon.type)
    const statsHtml = 
    `
      ${pokemon.stats.map((stat) => 
        `<div class="stat-item">
          <div class="stat-label">${stat.stat.name}</div>
          <div class="stat-value">${stat.base_stat}</div>
        </div>
      `).join('')}
    `
    statsGrid.innerHTML += statsHtml

    const abilitiesHtml = `
        ${pokemon.abilities.map((ability) => 
          `<div class="abilities-badge ${pokemon.type}">${ability}</div>`
        ).join('')}
    `
    abilitiesBadges.innerHTML += abilitiesHtml
  })
}

function flattenEvolutionPath(evolutionTree) {
  const result = [];

  while (Array.isArray(evolutionTree)) {
    const [first, second] = evolutionTree;
    evolutionTree = first;
    result.unshift(second);
  }

  return result;
}