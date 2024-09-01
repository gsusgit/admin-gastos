<script setup>
  import iconoCerrarModal from '../assets/img/cerrar.svg'

  const emit = defineEmits([
      'ocultar-modal'
  ])
</script>

<template>
  <div class="modal">
    <div class="cerrar-modal">
      <img
          @click="emit('ocultar-modal')"
          :src="iconoCerrarModal"

          alt="Cerrar modal">
    </div>
    <div class="contenedor">
      <form class="nuevo-gasto">
        <h2 class="modal-title">Añadir gasto</h2>
        <div class="campo">
          <label for="nombre">Nombre gasto</label>
          <input
              type="number"
              id="nombre"
              placeholder="Añade el nombre del gasto"
          >
        </div>
        <div class="campo">
          <label for="cantidad">Nombre gasto</label>
          <input
              type="number"
              id="cantidad"
              placeholder="Añade la cantidad del gasto"
          >
        </div>
        <div class="campo">
          <label for="categoria">Categoría</label>
          <select
              id="categoria"
          >
            <option value="">Seleccionar</option>
            <option value="ahorro">Ahorro</option>
            <option value="casa">Casa</option>
            <option value="comida">Comida</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
            type="submit"
            value="Añadir Gasto">
      </form>
    </div>
  </div>
</template>

<style scoped>
  .modal {
    position: absolute;
    background-color: rgb(0 0 0 / 0.9);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .cerrar-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
  }
  .cerrar-modal img {
    width: 3rem;
    cursor: pointer;
  }
  .modal-title {
    color: var(--blanco);
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
  }
  .nuevo-gasto {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
  }
  .campo {
    display: grid;
    gap: 2rem;
  }
  .nuevo-gasto input,
  .nuevo-gasto select {
    background-color: var(--gris-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
  }
  .nuevo-gasto label {
    color: var(--blanco);
    font-size: 3rem;
  }
  .nuevo-gasto input[type="submit"] {
    color: var(--blanco);
    background-color: var(--azul);
    font-weight: 700;
    cursor: pointer;
  }
</style>
