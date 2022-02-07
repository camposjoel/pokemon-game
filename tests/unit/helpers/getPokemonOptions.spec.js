import { describe, expect, test } from "vitest"
import getPokemonsOptions, { getPokemons, getPokemonNames } from '@/helpers/getPokemonOptions.js'

describe('getPokemonOptions Helper', () => {
  test('should return a number array', () => {
    const pokemons = getPokemons()
    
    expect(pokemons.length).toBe(650)
    expect(pokemons[0]).toBe(1)
    expect(pokemons[500]).toBe(501)
    expect(pokemons[649]).toBe(650)
  })

  test('should return an array with 4 pokemon names', async () => {
    const pokemons = await getPokemonNames([1, 2, 3, 4])
    const pokemonsObject = [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' },
      { id: 3, name: 'venusaur' },
      { id: 4, name: 'charmander' }
    ]
    expect(pokemons).toStrictEqual(pokemonsObject)   
  })

  test('[getPokemonOptions] Should return a mixed array', async () => {
    const pokemons = await getPokemonsOptions()

    expect(pokemons.length).toBe(4)
    expect(pokemons).toEqual([
      {
        id: expect.any(Number),
        name: expect.any(String)
      },
      {
        id: expect.any(Number),
        name: expect.any(String)
      },
      {
        id: expect.any(Number),
        name: expect.any(String)
      },
      {
        id: expect.any(Number),
        name: expect.any(String)
      }
    ])
  })
})