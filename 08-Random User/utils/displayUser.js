import get from './getElement.js';
import removeActive from './removeActive.js';

const img = get('.user-img');
const title = get('.user-title');
const value = get('.user-value');
const btns = [...document.querySelectorAll('.icon')];

const dispalyUser = (person) => {
  img.src = person.image;
  value.textContent = person.name;
  title.textContent = `My name is`;

  removeActive(btns);

  btns[0].classList.add('active');

  btns.forEach((btn) => {
    const label = btn.dataset.label;
    btn.addEventListener('click', () => {
      value.textContent = person[label];
      title.textContent = `My ${label} is`;
      removeActive(btns);
      btn.classList.add('active');
    });
  });
};
export default dispalyUser;
