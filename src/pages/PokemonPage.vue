<template>
  <h1 v-if="!pokemon">Espere por favor</h1>
  <div v-else>
    <h1>¿Quién es este pokemon?</h1>
    
    <PokemonPicture
      :pokemonId="pokemon.id"
      :showPokemon="showPokemon"
    />
    <PokemonOptions
      :pokemons="pokemonList"
      @selection="checkAnswer"  
    />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{message}}</h2>
      <button @click="newGame" class="newGameButton">
        Nuevo Juego
      </button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from "../components/PokemonOptions.vue"
import PokemonPicture from "../components/PokemonPicture.vue"
import getPokemonsOptions from "../helpers/getPokemonOptions"


export default {
  components: {
    PokemonOptions,
    PokemonPicture
  },
  data() {
    return {
      pokemonList: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonList() {
      this.pokemonList = await getPokemonsOptions()

      const rndInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonList[rndInt]
    },
    checkAnswer(selectedPokemonId) {
      this.showPokemon = true
      this.showAnswer = true

      if (selectedPokemonId === this.pokemon.id) {
        this.message = `Correcto, ${this.pokemon.name}`
      } else {
        this.message = `Oops, era ${this.pokemon.name}`
      }
    },
    newGame() {
      this.showPokemon = false
      this.showAnswer = false
      this.pokemon = null
      this.mixPokemonList()
    }
  },
  mounted() {
    this.mixPokemonList()
  }
}
</script>

<style scoped>
.newGameButton {
  border: none;
  height: 40px;
  width: 140px;
  background-color: limegreen;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

</style>
