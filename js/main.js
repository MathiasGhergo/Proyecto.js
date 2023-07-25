class Piloto {
  constructor(nombre, equipo, nacionalidad, edad, campeonatos, carrerasGanadas, añosEnDeporte) {
    this.nombre = nombre;
    this.equipo = equipo;
    this.nacionalidad = nacionalidad;
    this.edad = edad;
    this.campeonatos = campeonatos;
    this.carrerasGanadas = carrerasGanadas;
    this.añosEnDeporte = añosEnDeporte;
  }
}

// Creación del array de objetos de pilotos
const pilotos = [
  new Piloto("Lewis Hamilton", "Mercedes", "Reino Unido", 36, 7, 100, 15),
  new Piloto("Max Verstappen", "Red Bull Racing", "Países Bajos", 23, 2, 10, 6),
  new Piloto("Charles Leclerc", "Ferrari", "Mónaco", 24, 0, 2, 4),
  new Piloto("Lando Norris", "McLaren", "Reino Unido", 22, 0, 1, 3),
  new Piloto("Valtteri Bottas", "Mercedes", "Finlandia", 32, 0, 9, 10),
  new Piloto("Sergio Perez", "Red Bull Racing", "Mexico", 33, 0, 9, 8),
  new Piloto("Fernando Alonso", "Aston Martin", "España", 41, 2, 32, 10),
  new Piloto("Lance Stroll", "Aston Martin", "Canada", 24 , 0, 0, 2),
  new Piloto("George Rusell", "Aston Martin", "Reino Unido", 25 , 0, 1, 5),
];

async function guardarPilotosEnLocalStorage() {
  try {
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

function buscarPiloto() {
  const input = document.getElementById("piloto-input");
  const nombrePiloto = input.value.trim();

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
}

window.onload = async function() {
  await guardarPilotosEnLocalStorage();
  mostrarNombresPilotos();
};