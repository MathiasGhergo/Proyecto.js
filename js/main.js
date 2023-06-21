  let edad = parseInt(prompt("Por favor, ingrese su edad:"));
  if (edad >= 18)
  
  { alert("Bienvenido/a a la página."); }
   
  else { alert("Lo siento, debes ser mayor de 18 años para ingresar a esta página.");
  window.location.href = "https://proyecto-final-beta-ten.vercel.app/"; }
    
  function radarDeVelocidad() {
    const cantidadVehiculos = parseInt(prompt("Ingrese la cantidad de vehículos a verificar:"));
  
    for (let i = 0; i < cantidadVehiculos; i++) {
      const velocidad = parseInt(prompt(`Ingrese la velocidad del vehículo ${i + 1} (en km/h):`));
      let resultado;
  
      if (velocidad <= 60) {
        resultado = "Dentro del límite de velocidad en zonas urbanas";
      } else if (velocidad <= 80) {
        resultado = "Dentro del límite de velocidad en avenidas";
      } else if (velocidad <= 100) {
        resultado = "Dentro del límite de velocidad en carreteras";
      } else if (velocidad <= 120) {
        resultado = "Dentro del límite de velocidad en autopistas";
      } else if (velocidad <= 140) {
        resultado = "Dentro del límite de velocidad en vías rápidas";
      } else {
        resultado = "Exceso de velocidad";
      }
  
      alert(`Resultado para el vehículo ${i + 1}: ${resultado}`);
    }
  }
  
  radarDeVelocidad();
  