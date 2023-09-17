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
      <div class="newGameContainer">
        <h2 class="fade-in">{{message}}</h2>
        <button @click="newGame" class="newGameButton">
          Nuevo Juego
        </button>
      </div>
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
h1 {
  font-size: 3rem;
}

.newGameContainer {
  position: absolute;
  bottom: 25px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.newGameButton {
  border: none;
  height: 40px;
  width: 140px;
  background-color: lightgreen;
  color: #2c3e50;
  font-family: 'Josefin Sans';
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.newGameButton:hover {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

</style>
