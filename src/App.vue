<script setup>

</script>

<template>
  <div>
    <header>
      <h1>Planificador de gastos</h1>
    </header>
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
    font-family: "Lato", sans-serif;
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
</style>
