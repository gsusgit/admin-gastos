<script setup>
  import { ref, reactive, watch, computed, onMounted } from 'vue'
  import { generarId } from './helpers/index.js'
  import Presupuesto from './components/Presupuesto.vue'
  import ControlPresupuesto from './components/ControlPresupuesto.vue'
  import Modal from './components/Modal.vue'
  import Gasto from './components/Gasto.vue'
  import Filtro from './components/Filtro.vue'
  import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'

  const presupuesto = ref(0)
  const disponible = ref(0)
  const gastado = ref(0)
  const gastos = ref([])
  const filtro = ref('')

  const gasto = reactive({
    id: null,
    nombre: '',
    cantidad: '',
    categoria: '',
    fecha: Date.now()
  })

  const modal = reactive({
    mostrar: false,
    animar: false
  })

  watch(gastos, () => {
    const totalGastado = gastos.value.reduce((total, gasto) => gasto.cantidad + total, 0)
    gastado.value = totalGastado
    disponible.value = presupuesto.value - totalGastado
    localStorage.setItem('gastos', JSON.stringify(gastos.value))
  }, {
    deep: true
  })

  watch(presupuesto, () => {
    localStorage.setItem('presupuesto', presupuesto.value)
  })

  onMounted(() => {
    const storageGastos = localStorage.getItem('gastos')
    if (storageGastos) {
      gastos.value = JSON.parse(storageGastos)
    }
    const storagePresupuesto = localStorage.getItem('presupuesto')
    if (storagePresupuesto) {
      presupuesto.value = JSON.parse(storagePresupuesto)
    }
  })

  const definirPresupuesto = (cantidad) => {
    presupuesto.value = cantidad
    disponible.value = cantidad
  }

  const mostrarModal = () => {
    modal.mostrar = true
    setTimeout(() => {
      modal.animar = true
    }, 100)
  }

  const ocultarModal = () => {
    Object.assign(gasto, {
      id: null,
      nombre: '',
      cantidad: '',
      categoria: '',
      fecha: Date.now()
    })
    modal.animar = false
    setTimeout(() => {
      modal.mostrar = false
    }, 100)
  }

  const agregarGasto = () => {
    if (gasto.id) {
      const { id } = gasto
      const i = gastos.value.findIndex(gasto => gasto.id === id)
      gastos.value[i] = {...gasto}
    } else {
      gastos.value.push({
            ...gasto,
            id: generarId()
          }
      )
    }
    ocultarModal()
  }

  const seleccionarGasto = (id) => {
    const buscarGasto = gastos.value.filter((gasto) => gasto.id === id)[0]
    Object.assign(gasto, buscarGasto)
    mostrarModal()
  }

  const eliminarGasto = (id) => {
    const i = gastos.value.findIndex(gasto => gasto.id === id)
    gastos.value.splice(i, 1)
  }

  const resetGastos = () => {
    const confirmarBorrado = confirm('¿Estás seguro de borrar todos los gastos?')
    if (confirmarBorrado) {
      presupuesto.value = 0
      gastos.value = []
    }
  }

  const gastosFiltrados = computed(() => {
    if (filtro.value) {
      return gastos.value.filter(gasto => gasto.categoria === filtro.value)
    }
    return gastos.value
  })
</script>

<template>
  <div
    :class="{fijar: modal.mostrar}"
  >
    <header>
      <h1>Planificador de gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto v-if="presupuesto === 0"
          @definir-presupuesto="definirPresupuesto"
        />
        <ControlPresupuesto v-else
          :presupuesto="presupuesto"
          :disponible="disponible"
          :gastado="gastado"
          @reset-gastos="resetGastos"
        />
      </div>
    </header>
    <main v-if="presupuesto > 0">
      <div class="contenedor listado-gastos">
        <Filtro
            v-if="gastos.length > 0"
            v-model:filtro="filtro"
        />
        <h2>{{ gastosFiltrados.length > 0 ? 'Mis gastos' : 'No hay gastos' }}</h2>
        <div v-if="gastos.length > 0" class="contenedor">
          <Gasto
              v-for="gasto in gastosFiltrados"
              :gasto="gasto"
              :key="gasto.id"
              @seleccionar-gasto="seleccionarGasto"
          />
        </div>
      </div>
      <div
          v-if="disponible > 0"
          class="crear-gasto"
          @click="mostrarModal">
        <img
            :src="iconoNuevoGasto"
            alt="Crear gasto">
      </div>
      <Modal
          v-if="modal.mostrar"
          :modal="modal"
          :disponible="disponible"
          :gastado="gastado"
          :id="gasto.id"
          v-model:nombre="gasto.nombre"
          v-model:cantidad="gasto.cantidad"
          v-model:categoria="gasto.categoria"
          @ocultar-modal="ocultarModal"
          @agregar-gasto="agregarGasto"
          @eliminar-gasto="eliminarGasto"/>
    </main>
  </div>
</template>

<style>
  :root {
    --azul: #2457a9;
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
  .listado-gastos {
    margin-top: 10rem;
    font-weight: 900;
    color: var(--gris-oscuro);
  }
  .listado-gastos h2 {
    text-align: center;
  }
  .fijar {
    overflow: hidden;
    height: 100vh;
  }
</style>
