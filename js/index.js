const guardarDatosEnStorage = (email, nombre) => {
  const datosAnteriores = localStorage.getItem('datos')
  const datosNuevos = { email, nombre }

  if (datosAnteriores) {
    const datos = [...JSON.parse(datosAnteriores), datosNuevos]
    localStorage.setItem('datos', JSON.stringify(datos))
    
    return
  }
  
  localStorage.setItem('datos', JSON.stringify([datosNuevos]))
}

const obtenerDatosDeInputs = () => {
  const email = $('#email').val()
  const nombre = $('#nombre').val()
  const completados = email.length > 0 && nombre.length > 0

  return { email, completados, nombre }
}

const limpiarInputs = () => {
  $("#nombre").val("");
  $("#email").val("");
}

$(document).ready(function () {
  $('#boton-guardar').click(function () {
    const { email, completados, nombre } = obtenerDatosDeInputs()

    if (completados) {
      guardarDatosEnStorage(email, nombre)
      limpiarInputs()

      return
    }

    return alert('Necesitas rellenas todos los campos')
  });

  $('#boton-ver').click(function () {
    const datos = JSON.parse(localStorage.getItem('datos'))
    const elementoSalida = $('#salida')

    elementoSalida.empty()
    elementoSalida.append('<tr><th>Nombre</th><th>Correo electrónico</th></tr>')

    datos.forEach((dato) => {
      elementoSalida.append(`
        <tr>
          <td>${dato.nombre}</td>
          <td>${dato.email}</td>
        </tr>
      `)
    })
  });

  $("#boton-limpia").click(function () {
    limpiarInputs()
  });
});