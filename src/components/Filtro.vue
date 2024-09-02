<script setup>
  defineProps({
    filtro: {
      type: String,
      required: true
    }
  })
  defineEmits([
      'update:filtro'
  ])
</script>

<template>
  <div class="sombra filtros contenedor">
    <form>
      <div class="campo">
        <label for="categoria">Filtrar gastos</label>
        <select
            id="categoria"
            :value="filtro"
            @change="$emit('update:filtro', $event.target.value)"
        >
          <option value="">Todo</option>
          <option value="ahorro">Ahorro</option>
          <option value="casa">Casa</option>
          <option value="comida">Comida</option>
          <option value="gastos">Gastos</option>
          <option value="ocio">Ocio</option>
          <option value="salud">Salud</option>
          <option value="suscripciones">Suscripciones</option>
        </select>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .filtros {
    margin-top: 10rem;
  }
  .filtros .campo {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
  .filtros label {
    font-size: 3rem;
    font-weight: 900;
    color: var(--gris-oscuro)
  }
  .filtros select {
    flex: 1;
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    background-color: var(--gris-claro);
    text-align: center;
  }
</style>
