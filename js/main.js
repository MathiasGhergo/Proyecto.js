async function cargarPilotosDesdeJSON() {
  try {
    const response = await fetch('../json/data.json');
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    const pilotos = await response.json();
    return pilotos;
  } catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
    return [];
  }
}

async function guardarPilotosEnLocalStorage() {
  try {
    const pilotos = await cargarPilotosDesdeJSON();
    const jsonData = JSON.stringify(pilotos);
    localStorage.setItem("pilotos", jsonData);
    console.log("Datos de pilotos almacenados en el Local Storage.");
  } catch (error) {
    console.error("Error al guardar datos en el Local Storage:", error);
  }
}

async function obtenerPilotosDelLocalStorage() {
  try {
    const jsonData = localStorage.getItem("pilotos");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error al obtener datos del Local Storage:", error);
    return [];
  }
}

async function mostrarNombresPilotos() {
  const table = document.getElementById("pilots-table");

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  const pilotos = await obtenerPilotosDelLocalStorage();

  pilotos.forEach(piloto => {
    const row = table.insertRow();
    const nombreCell = row.insertCell();

    nombreCell.textContent = piloto.nombre;

    nombreCell.addEventListener("click", function() {
      mostrarInfoPiloto(piloto);
    });
  });
}

function mostrarInfoPiloto(piloto) {
  const infoDiv = document.getElementById("piloto-info");
  infoDiv.innerHTML = `
    <h2>${piloto.nombre}</h2>
    <p><strong>Equipo:</strong> ${piloto.equipo}</p>
    <p><strong>Nacionalidad:</strong> ${piloto.nacionalidad}</p>
    <p><strong>Edad:</strong> ${piloto.edad}</p>
    <p><strong>Campeonatos Mundiales:</strong> ${piloto.campeonatos}</p>
    <p><strong>Carreras Ganadas:</strong> ${piloto.carrerasGanadas}</p>
    <p><strong>Años en el Deporte:</strong> ${piloto.añosEnDeporte}</p>
  `;
}

async function buscarPiloto() {
  const input = document.getElementById("piloto-input");
  const nombrePiloto = input.value.trim();

  try {
    const pilotos = await obtenerPilotosDelLocalStorage();

    const pilotoEncontrado = pilotos.find(piloto => piloto.nombre.toLowerCase() === nombrePiloto.toLowerCase());

    const infoDiv = document.getElementById("piloto-info");
    if (pilotoEncontrado) {
      infoDiv.innerHTML = `
        <h2>${pilotoEncontrado.nombre}</h2>
        <p><strong>Equipo:</strong> ${pilotoEncontrado.equipo}</p>
        <p><strong>Nacionalidad:</strong> ${pilotoEncontrado.nacionalidad}</p>
        <p><strong>Edad:</strong> ${pilotoEncontrado.edad}</p>
        <p><strong>Campeonatos Mundiales:</strong> ${pilotoEncontrado.campeonatos}</p>
        <p><strong>Carreras Ganadas:</strong> ${pilotoEncontrado.carrerasGanadas}</p>
        <p><strong>Años en el Deporte:</strong> ${pilotoEncontrado.añosEnDeporte}</p>
      `;
    } else {
      infoDiv.innerHTML = "<p>Piloto no encontrado</p>";
    }
  } catch (error) {
    console.error("Error al buscar piloto:", error);
  }
}

window.onload = async function() {
  await guardarPilotosEnLocalStorage();
  mostrarNombresPilotos();
};