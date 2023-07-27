let cartItems = [];
async function obtenerCartItemsDelLocalStorage() {
  try {
    const storedCartItems = await fetchCartItemsFromLocalStorage();
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  } catch (error) {
    console.error("Error al obtener datos del Local Storage:", error);
    return [];
  }
}

async function guardarCartItemsEnLocalStorage() {
  try {
    await saveCartItemsToLocalStorage(cartItems);
    console.log("Datos del carrito de compras almacenados en el Local Storage.");
  } catch (error) {
    console.error("Error al guardar datos en el Local Storage:", error);
  }
}

async function fetchCartItemsFromLocalStorage() {
  return new Promise((resolve, reject) => {
    const storedCartItems = localStorage.getItem('cartItems');
    resolve(storedCartItems);
  });
}

async function saveCartItemsToLocalStorage(cartItems) {
  return new Promise((resolve, reject) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    resolve();
  });
}

async function addToCart(productName, price) {
  const item = {
    name: productName,
    price: price
  };
  
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Producto agregado',
    showConfirmButton: false,
    timer: 1500
  });

  cartItems.push(item);
  await guardarCartItemsEnLocalStorage();
  displayCartItems();
}

function displayCartItems() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';

  cartItems.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');

    const nameElement = document.createElement('p');
    nameElement.textContent = `${item.name} - Precio: U$D${item.price}`;
    itemElement.appendChild(nameElement);

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Limpiar Producto';
    clearButton.addEventListener('click', function() {
      removeCartItem(index);
    });
    itemElement.appendChild(clearButton);

    cartItemsElement.appendChild(itemElement);
  });
}

async function removeCartItem(index) {
  cartItems.splice(index, 1);
  await guardarCartItemsEnLocalStorage();
  displayCartItems();
}

function saveCartItemsToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
window.onload = async function() {
  cartItems = await obtenerCartItemsDelLocalStorage();
}

window.onload = function() { const addToCartButtons = document.getElementsByClassName('add-to-cart');
for (let i = 0; i < addToCartButtons.length; i++) {
  const button = addToCartButtons[i];
  button.addEventListener('click', async function() {
    const productName = button.parentNode.querySelector('h3').textContent;
    const price = parseInt(button.parentNode.querySelector('p').textContent.split(' ')[1]);
    await addToCart(productName, price);
  });
}

const cartContainer = document.createElement('div');
cartContainer.id = 'cart-container';

const cartItemsElement = document.createElement('div');
cartItemsElement.id = 'cart-items';
cartContainer.appendChild(cartItemsElement);

document.body.appendChild(cartContainer);

displayCartItems();
}

function calculateTotal() {
  totalPrice = 0;

  cartItems.forEach(item => {
    totalPrice += item.price;
  });

  const resultElement = document.getElementById('result');
  resultElement.textContent = `Total: U$D${totalPrice}`;
}
function finishShopping() {
  Swal.fire({
    title: 'Confirmar compra',
    text: '¿Estás seguro de que deseas finalizar la compra?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Agregar tarjeta de Debito/crédito',
        html: `
        <div>
        <img src="https://lh5.googleusercontent.com/-3DOjz5tMZPI/URP2PBvRU-I/AAAAAAAAjzI/vBzQ1U2_xz8/s640/tarjetas-de-creditos.jpg" alt="Imagen de tarjeta de crédito" width="50px">
      </div>
          <input type="text" id="card-number" placeholder="Número de tarjeta">
          <input type="text" id="card-name" placeholder="Nombre del titular">
          <input type="text" id="card-expiry" placeholder="Fecha de vencimiento">
          <input type="text" id="card-cvv" placeholder="CVV">
        `,
        showCancelButton: true,
        confirmButtonText: 'Finalizar compra',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const cardNumber = document.getElementById('card-number').value;
          const cardName = document.getElementById('card-name').value;
          const cardExpiry = document.getElementById('card-expiry').value;
          const cardCVV = document.getElementById('card-cvv').value;

          if (!isValidCardNumber(cardNumber)) {
            Swal.showValidationMessage('El número de tarjeta no es válido');
          }
          if (!isValidCardName(cardName)) {
            Swal.showValidationMessage('El nombre del titular no es válido');
          }
          if (!isValidCardExpiry(cardExpiry)) {
            Swal.showValidationMessage('La fecha de vencimiento no es válida');
          }
          if (!isValidCardCVV(cardCVV)) {
            Swal.showValidationMessage('El código CVV no es válido');
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('¡Compra realizada!', 'Gracias por tu compra', 'success');
        }
      });
    }
  });
}

function isValidCardNumber(cardNumber) {
  return cardNumber.trim().length === 16;
}

function isValidCardName(cardName) {
  return cardName.trim().length > 0;
}

function isValidCardExpiry(cardExpiry) {
  return cardExpiry.trim().length === 5; 
}

function isValidCardCVV(cardCVV) {
  return cardCVV.trim().length === 3;
}
