// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items
const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    let product = findProduct(id);
    // add item to cart
    product = { ...product, amount: 1 };
    cart = [...cart, product];

    // add item to the dom
    addToCartDOM(product);
  } else {
    // update values
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    const newAmount = items.find((value) => value.dataset.id === id);
    console.log(newAmount);
    newAmount.textContent = amount;
  }
  // add 1 to the item count
  displayCartItemCount();
  // display cart totals
  displayCartTotal();
  // set cart in local storge
  setStorageItem('cart', cart);

  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}
function displayCartTotal() {
  const total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `total : ${formatPrice(total)}`;
}
function displayCartItemsDOM() {
  cart.forEach((item) => {
    addToCartDOM(item);
  });
}
function increaseAmount(id) {
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount + 1;
      item = { ...item, amount: item.amount + 1 };
    }
    return item;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount - 1;
      item = { ...item, amount: item.amount - 1 };
    }
    return item;
  });
  return newAmount;
}
function removeItem(id) {
  cart = cart.filter((item) => {
    item.id !== id;
  });
}
function setupCartFunctionalty() {
  cartItemsDOM.addEventListener('click', function (e) {
    const element = e.target;
    const parent = element.parentElement;
    const id = element.dataset.id;
    const parentId = parent.dataset.id;

    // remove
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      parent.parentElement.remove();
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentId);
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentId);
      if (newAmount > 0) {
        parent.previousElementSibling.textContent = newAmount;
      } else {
        removeItem(parentId);
        parent.parentElement.parentElement.remove();
      }
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}
const init = () => {
  //  display amount of cart items
  displayCartItemCount();
  // display total
  displayCartTotal();
  // add all cart items to the dom
  displayCartItemsDOM();
  // setup cart functionlaty
  setupCartFunctionalty();
};
init();
