// Definición de la clase Piloto
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

// Almacenar el array de pilotos en el Local Storage
localStorage.setItem("pilotos", JSON.stringify(pilotos));

// Función para mostrar los nombres de los pilotos en la tabla
function mostrarNombresPilotos() {
  const table = document.getElementById("pilots-table");

  // Limpiar la tabla antes de añadir los nombres de los pilotos
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Añadir los nombres de los pilotos a la tabla
  pilotos.forEach(piloto => {
    const row = table.insertRow();
    const nombreCell = row.insertCell();

    nombreCell.textContent = piloto.nombre;

    nombreCell.addEventListener("click", function() {
      mostrarInfoPiloto(piloto);
    });
  });
}

// Función para mostrar la información del piloto buscado
function buscarPiloto() {
  const input = document.getElementById("piloto-input");
  const nombrePiloto = input.value.trim();

  // Buscar el piloto en el array
  const pilotoEncontrado = pilotos.find(piloto => piloto.nombre.toLowerCase() === nombrePiloto.toLowerCase());

  // Mostrar la información del piloto o un mensaje de error
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

// Llamar a la función para mostrar los nombres de los pilotos al cargar la página
window.onload = mostrarNombresPilotos;