const cartItems = [];

const storedCartItems = localStorage.getItem('cartItems');
if (storedCartItems) {
  cartItems.push(...JSON.parse(storedCartItems));
}

function addToCart(productName, price) {
  const item = {
    name: productName,
    price: price
  };

  cartItems.push(item);
  saveCartItemsToLocalStorage();
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

function removeCartItem(index) {
  cartItems.splice(index, 1);
  saveCartItemsToLocalStorage();
  displayCartItems();
}

function saveCartItemsToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

window.onload = function() {
  const addToCartButtons = document.getElementsByClassName('add-to-cart');
  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener('click', function() {
      const productName = button.parentNode.querySelector('h3').textContent;
      const price = parseInt(button.parentNode.querySelector('p').textContent.split(' ')[1]);
      addToCart(productName, price);
    });
  }

  const cartContainer = document.createElement('div');
  cartContainer.id = 'cart-container';

  const cartItemsElement = document.createElement('div');
  cartItemsElement.id = 'cart-items';
  cartContainer.appendChild(cartItemsElement);

  document.body.appendChild(cartContainer);

  displayCartItems();
};

function calculateTotal() {
  totalPrice = 0;

  cartItems.forEach(item => {
    totalPrice += item.price;
  });

  const resultElement = document.getElementById('result');
  resultElement.textContent = `Total: U$D${totalPrice}`;
}
