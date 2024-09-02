<script setup>
  import { ref } from 'vue'
  import iconoCerrarModal from '../assets/img/cerrar.svg'
  import Alerta from './Alerta.vue'

  const error = ref('')

  const emit = defineEmits([
      'ocultar-modal',
      'update:nombre',
      'update:cantidad',
      'update:categoria',
      'agregar-gasto',
      'eliminar-gasto'
  ])

  const props = defineProps({
    modal: {
      type: Object,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    cantidad: {
      type: [String, Number],
      required: true
    },
    categoria: {
      type: String,
      required: true
    },
    disponible: {
      type: Number,
      required: true
    },
    gastado: {
      type: Number,
      required: true
    },
    id: {
      type: [String, null],
      required: true
    }
  })

  const old = props.cantidad

  const agregarGasto = () => {
    let { id, nombre, cantidad, categoria } = props
    const campos = [nombre, cantidad, categoria]
    if (Object.values(campos).includes('')) {
      mostrarError('Hay campos sin rellenar')
      return
    }
    if (cantidad <= 0) {
      mostrarError('La cantidad no es correcta')
      return
    }
    if (id) {
      if( cantidad > old + props.disponible) {
        mostrarError('Has excedido el Presupuesto')
        return
      }
    } else {
      if(cantidad > props.disponible) {
        mostrarError('Has excedido el Presupuesto')
        return
      }
    }
    emit('agregar-gasto')
  }

  const mostrarError = (mensaje) => {
    error.value = mensaje
    setTimeout(() => {
      error.value = ''
    }, 2000)
  }
</script>

<template>
  <div class="modal">
    <div class="cerrar-modal">
      <img
          @click="emit('ocultar-modal')"
          :src="iconoCerrarModal"
          alt="Cerrar modal">
    </div>
    <div
        class="contenedor contenedor-formulario"
        :class="[modal.animar ? 'animar' : 'cerrar']"
    >
      <form
          class="nuevo-gasto"
          @submit.prevent="agregarGasto">
        <Alerta v-if="error">
          {{ error }}
        </Alerta>
        <h2 class="modal-title">{{ props.id === null ? 'Nuevo gasto' : 'Editar gasto' }}</h2>
        <div class="campo">
          <label for="nombre">Nombre gasto</label>
          <input
              type="text"
              id="nombre"
              placeholder="Añade el nombre del gasto"
              :value="nombre"
              @input="$emit('update:nombre', $event.target.value)"
          >
        </div>
        <div class="campo">
          <label for="cantidad">Cantidad</label>
          <input
              type="number"
              id="cantidad"
              placeholder="Añade la cantidad del gasto"
              min="0"
              :value="cantidad"
              @input="$emit('update:cantidad', +$event.target.value)"
          >
        </div>
        <div class="campo">
          <label for="categoria">Categoría</label>
          <select
              id="categoria"
              :value="categoria"
              @change="$emit('update:categoria', $event.target.value)"
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
            :value="[props.id === null ? 'Añadir gasto' : 'Guardar cambios']"/>
        <button
            @click="$emit('eliminar-gasto', props.id)"
            class="boton-borrar"
            v-if="props.id !== null">
          Eliminar gasto
        </button>
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
  .contenedor-formulario {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
  }
  .contenedor-formulario.animar {
    opacity: 1;
  }
  .contenedor-formulario.cerrar {
    opacity: 0;
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
    transition: 300ms all;
  }
  .nuevo-gasto input[type="submit"]:hover {
    background-color: #2f4f85 !important;
    transition: 300ms all;
  }
  .boton-borrar {
    color: var(--blanco);
    background-color: #dc3b3b;
    font-weight: 700;
    cursor: pointer;
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    transition: 300ms all;
    margin-top: 3rem;
  }
  .boton-borrar:hover {
    background-color: #6e1b1b;
  }
</style>
