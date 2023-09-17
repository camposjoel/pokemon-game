<template>
  <div class="options-container">
    <ul>
      <li v-for="pokemon in pokemons"
        :key="pokemon.id"
        @click="$emit('selection', pokemon.id)">
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
}
li {
  background-color: lightsalmon;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin: 15px 10px 0;
  padding: 10px 0;
  width: 250px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  font-weight: 700;
}

li:hover {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>
