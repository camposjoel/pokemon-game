import pokemonApi from "../api/PokemonApi"

const getPokemons = () => {
  const pokemonsList = Array.from(Array(650))
  return pokemonsList.map((_, index) => index + 1)
}

const getPokemonsOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)

  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4))
  return pokemons
}

const getPokemonNames = async ([a, b, c, d]) => {
  const promiseFetch = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`)
  ]

  const responseData = await Promise.all(promiseFetch)
  return responseData.map(item => ({ id: item.data.id, name: item.data.name }))
}

export default getPokemonsOptions
