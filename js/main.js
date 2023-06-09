let edad = parseInt(prompt("Por favor, ingrese su edad:"));

  if (edad >= 18) {
    alert("Bienvenido/a a la página.");
  } else {
    alert("Lo siento, debes ser mayor de 18 años para ingresar a esta página.");
  }
  function checkSpeed() {
    let speedInput = document.getElementById('speed-input').value;
    let resultElement = document.getElementById('result');
  
    if (speedInput >= 0 && speedInput <= 20) {
      resultElement.innerHTML = "Baja velocidad";
    } else if (speedInput > 20 && speedInput <= 60) {
      resultElement.innerHTML = "Estás bien";
    } else if (speedInput > 60 && speedInput <= 80) {
      resultElement.innerHTML = "Velocidad permitida en avenidas";
    } else if (speedInput > 80 && speedInput <= 119) {
      resultElement.innerHTML = "Velocidad permitida en autopistas";
    } else if (speedInput === 120) {
      resultElement.innerHTML = "Velocidad permitida en rutas";
    } else {
      resultElement.innerHTML = "Excedido de velocidad";
    }
  }
  
  