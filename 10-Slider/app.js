import people from './data.js';

const slideContainer = document.querySelector('.slide-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

slideContainer.innerHTML = people
  .map(({ name, img, job, text }, index) => {
    let posision = 'next';
    if (index === 0) {
      posision = 'active';
    }
    if (index === people.length - 1) {
      posision = 'last';
    }
    return `
        <article class="slide ${posision}">
          <img src=${img} class="img" alt=${name} />
          <h4>${name}</h4>
          <p class="title">${job}</p>
          <p class="text">${text}</p>
          <div class="quote-icon">
            <i class="fas fa-quote-right"></i>
          </div>
        </article>
 `;
  })
  .join('');

const startSlider = (type) => {
  const active = document.querySelector('.active');
  const last = document.querySelector('.last');
  let next = active.nextElementSibling;

  if (!next) {
    next = slideContainer.firstElementChild;
  }

  active.classList.remove(['active']);
  last.classList.remove(['last']);
  next.classList.remove(['next']);

  if (type === 'prev') {
    active.classList.add('next');
    last.classList.add('active');
    next.classList.add('last');

    return;
  }

  active.classList.add('last');
  last.classList.add('next');
  next.classList.add('active');
};

prevBtn.addEventListener('click', () => {
  startSlider('prev');
});
nextBtn.addEventListener('click', () => {
  startSlider();
});
