<script setup>
  import { ref, reactive } from 'vue'
  import Presupuesto from './components/Presupuesto.vue'
  import ControlPresupuesto from './components/ControlPresupuesto.vue'
  import Modal from './components/Modal.vue'
  import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'

  const presupuesto = ref(0)
  const disponible = ref(0)

  const modal = reactive({
    mostrar: false,
    animar: false
  })

  const definirPresupuesto = (cantidad) => {
    presupuesto.value = cantidad
    disponible.value = cantidad
  }

  const mostrarModal = () => {
    modal.mostrar = true
    modal.animar = true
  }

  const ocultarModal = () => {
    modal.mostrar = false
    modal.animar = false
  }
</script>

<template>
  <div>
    <header>
      <h1>Planificador de gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto v-if="presupuesto === 0"
          @definir-presupuesto="definirPresupuesto"
        />
        <ControlPresupuesto v-else
          :presupuesto="presupuesto"
          :disponible="disponible"
        />
      </div>
    </header>
    <main v-if="presupuesto > 0">
      <div
          class="crear-gasto"
          @click="mostrarModal">
        <img
            :src="iconoNuevoGasto"
            alt="Crear gasto">
      </div>
      <Modal
          v-if="modal.mostrar"
          @ocultar-modal="ocultarModal"/>
    </main>
  </div>
</template>

<style>
  :root {
    --azul: #3B82F6;
    --blanco: #FFFFFF;
    --gris-claro: #F5F5F5;
    --gris: #94A3B8;
    --gris-oscuro: #64748B;
    --negro: #000000;
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *,
  *:before,
  a:after {
    box-sizing: inherit;
  }
  body {
    font-size: 1.6rem;
    font-family: "Inter", sans-serif;
    background-color: var(--gris-claro);
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 3rem;
  }
  header {
    background-color: var(--azul);
  }
  header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }
  .contenedor {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }
  .contenedor-header {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }
  .sombra {
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    background-color: var(--blanco);
    border-radius: 1.2rem;
    padding: 5rem;
  }
  .crear-gasto {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }
  .crear-gasto img {
    width: 5rem;
    cursor: pointer;
  }
  .crear-gasto img:hover {

  }
</style>
