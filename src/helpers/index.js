export const formatearCantidad = cantidad => {
    return Number(cantidad).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}
