// Función para realizar la solicitud al servidor de la NASA
function buscarImagenesNASA(consulta) {
    // Construir la URL de la solicitud
    const apiUrl = `https://images-api.nasa.gov/search?q=${consulta}`;
  
    // Realizar la solicitud HTTP usando fetch
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la información de la NASA.');
        }
        return response.json();
      })
      .then((data) => {
        // Llamar a la función para mostrar los resultados
        mostrarResultados(data.collection.items);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Función para mostrar los resultados en el HTML
  function mostrarResultados(resultados) {
    const contenedor = document.getElementById('contenedor');
  
    // Limpiar el contenido existente en el contenedor
    contenedor.innerHTML = '';
  
    // Iterar a través de los resultados y mostrar la información
    resultados.forEach((item) => {
      const imagen = item.links[0].href;
      const titulo = item.data[0].title;
      const descripcion = item.data[0].description;
      const fecha = item.data[0].date_created;
  
      // Crear elementos HTML para mostrar la información
      const divImagen = document.createElement('div');
      divImagen.innerHTML = `<img src="${imagen}" alt="${titulo}" class="img-thumbnail"><h2>${titulo}</h2><p>${descripcion}</p><p>Fecha: ${fecha}</p>`;
   // Agregar el elemento al contenedor
   contenedor.appendChild(divImagen);
});
}

// Event listener para el botón de búsqueda
const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', () => {
const inputBuscar = document.getElementById('inputBuscar');
const consulta = inputBuscar.value.trim();

if (consulta !== '') {
  buscarImagenesNASA(consulta);
}
});