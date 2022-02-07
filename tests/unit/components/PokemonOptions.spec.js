// @vitest-environment happy-dom

import { describe, expect, test, beforeEach, should } from "vitest"
import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions.vue'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonOptions Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons
      }
    })
  })

  test('Should match with snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Should show 4 pokemons', () => {
    const pokemonList = wrapper.findAll('li')
    expect(pokemonList.length).toBe(4)
    expect(pokemonList[0].text()).toBe('bulbasaur')
    expect(pokemonList[1].text()).toBe('ivysaur')
    expect(pokemonList[2].text()).toBe('venusaur')
    expect(pokemonList[3].text()).toBe('charmander')
  })

  test('Should emit -selection- with parameters', () => {
    const [ p1, p2, p3, p4 ] = wrapper.findAll('li')

    p1.trigger('click')
    p2.trigger('click')
    p3.trigger('click')
    p4.trigger('click')
    expect(wrapper.emitted('selection').length).toBe(4)
    expect(wrapper.emitted('selection')[0]).toEqual([1])
    expect(wrapper.emitted('selection')[1]).toEqual([2])
    expect(wrapper.emitted('selection')[2]).toEqual([3])
    expect(wrapper.emitted('selection')[3]).toEqual([4])
  })

})