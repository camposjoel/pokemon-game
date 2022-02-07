import { describe, expect, test } from "vitest"
import pokemonApi from '@/api/PokemonApi'


describe('PokemonApi', () => {
  test('Axios should contain pokemon url api', () => {
    expect(pokemonApi.defaults.baseURL)
      .toBe('https://pokeapi.co/api/v2/pokemon')
  })
})
