// @vitest-environment happy-dom

import { describe, expect, test } from "vitest"
import { render } from '@testing-library/vue'
import { shallowMount } from '@vue/test-utils'
import PokemonPicture from '@/components/PokemonPicture.vue'

describe('PokemonPicture Component', () => {

  test('Should match with snapshot', () => {
    const wrapper = render(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: false
      }
    })

    expect(wrapper.html()).matchSnapshot()
  })

  test('Should show the hidden picture & the pokemon 100', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: false
      }
    })

    const [ img1, img2 ] = wrapper.findAll('img')
    
    expect(img1.exists()).toBeTruthy()
    expect(img2).toBe(undefined)

    expect(img1.attributes('class')).toBe('hidden-pokemon')
    expect(img1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
  })

  test('Should show the pokemon if showPokemon:true', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: true
      }
    })

    const img1 = wrapper.find('img')
    
    expect(img1.exists()).toBeTruthy()

    expect(img1.classes('hidden-pokemon')).toBe(false)
    //expect(img1.classes('fade-in')).toBe(true)
  })
})