import get from './utils/getElement.js';
import getUser from './utils/fetchUser.js';
import dispalyUser from './utils/displayUser.js';

const btn = get('.btn');

const showUser = async () => {
  const person = await getUser();

  dispalyUser(person);
};

window.addEventListener('DOMContentLoaded', showUser);
btn.addEventListener('click', showUser);
