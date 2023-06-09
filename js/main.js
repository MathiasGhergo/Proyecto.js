    let edad = prompt("Por favor, ingresa tu edad:");

    if (parseInt(edad) >= 18) {
      alert("¡Bienvenido/a! Puedes ingresar a la página.");
    } else {
      alert("Lo siento, debes ser mayor de 18 años para acceder a la página.");
      
      // Redireccionar a otra página si el usuario no cumple con la edad mínima
      window.location.href = "https://www.otra-pagina.com";
    }


let numero1 = parseInt(prompt("Ingresa el primer número y te diré los que son pares:"));
let numero2 = parseInt(prompt("Ingresa el segundo número y te diré los que son pares:"));

let paresEncontrados = 0;

for (let i = numero1; i <= numero2; i++) {
  if (i % 2 === 0) {
    paresEncontrados++;
  }
}

console.log("Se encontraron " + paresEncontrados + " números pares entre " + numero1 + " y " + numero2 + ".");