<template>
  <div class="alerta">
    <slot></slot>
  </div>
</template>

<style scoped>
  .alerta {
    padding: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 1.6rem;
    text-align: center;
    border-left: .5rem solid #B91C1C;
    color: #B91C1C;
    margin-bottom: 2rem;
    background-color: #f8eeee;
  }
</style>
