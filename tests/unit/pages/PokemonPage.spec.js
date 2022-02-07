// @vitest-environment happy-dom
import { describe, expect, test, beforeEach, spyOn } from "vitest"
import { mount, shallowMount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage.vue'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage Component', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = shallowMount(PokemonPage)
  })
  
  test('Should match with snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Should call mixPokemonList in mount', () => {
    const mixPokemonArraySpy = spyOn(PokemonPage.methods, 'mixPokemonList')
    shallowMount(PokemonPage)
    expect(mixPokemonArraySpy).toHaveBeenCalled()
  })

  test('Should match with snapshot when pokemons are loaded', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonList: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Should show the PokemonPicture and PokemonOptions components', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonList: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    const pictureWrapper = wrapper.find('pokemon-picture-stub')
    const optionsWrapper = wrapper.find('pokemon-options-stub')
    expect(pictureWrapper.exists()).toBeTruthy()
    expect(optionsWrapper.exists()).toBeTruthy()
    expect(pictureWrapper.attributes('pokemonid')).toBe('1')
    expect(optionsWrapper.attributes('pokemons')).toBeTruthy()
  })

  test('CheckAnswer should work', async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonList: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    await wrapper.vm.checkAnswer(1)
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.vm.showPokemon).toBeTruthy()
    expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`)

    await wrapper.vm.checkAnswer(2)
    expect(wrapper.find('h2').text()).toBe(`Oops, era ${pokemons[0].name}`)
  })
  
})