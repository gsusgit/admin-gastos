<script setup>
import { ref } from 'vue'
import Alerta from './Alerta.vue'

const emit = defineEmits([
    'definir-presupuesto'
])

const presupuesto = ref(0)
const error = ref('')

const definirPresupuesto = () => {
  if (presupuesto.value <= 0) {
    error.value = 'Presupuesto no válido'
    setTimeout(() => {
      error.value = ''
    }, 2000)
  } else {
    emit('definir-presupuesto', presupuesto.value)
  }
}
</script>

<template>
  <form
      class="presupuesto"
      @submit.prevent="definirPresupuesto">
    <Alerta v-if="error">
      {{ error }}
    </Alerta>
    <div class="campo">
      <label for="presupuesto">Definir presupuesto</label>
      <input
          type="number"
          id="presupuesto"
          placeholder="Añade tu presupuesto"
          min="0"
          v-model.number="presupuesto"
      />
    </div>
    <input
        type="submit"
        value="Definir presupuesto"
    />
  </form>
</template>

<style scoped>
  .presupuesto {
    width: 100%;
  }
  .campo {
    display: grid;
    gap: 2rem;
  }
  .presupuesto input {
    padding: 1rem;
    border: none;
    text-align: center;
    border-radius: 1rem;
    width: 100%;
  }
  .presupuesto input[type="number"] {
    background-color: var(--gris-claro) !important;
    font-size: 2.3rem;
  }
  .presupuesto input[type="submit"] {
    color: var(--blanco);
    background-color: var(--azul);
    font-size: 2rem;
    margin-top: 2rem;
    font-weight: 900;
  }
  .presupuesto input[type="submit"]:hover {
    background-color: #1048A4;
    cursor: pointer;
    transition: background-color 300ms ease;
  }
  .presupuesto label {
    text-align: center;
    font-size: 2.2rem;
    color: var(--azul);
  }
</style>
