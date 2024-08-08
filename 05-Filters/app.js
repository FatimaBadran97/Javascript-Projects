let filteredProducts = [...products];
const productContainer = document.querySelector('.products-container');
//text
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');

//companies
const companiesContainer = document.querySelector('.companies');

const displayProduct = () => {
  if (filteredProducts.length === 0) {
    productContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
  } else {
    productContainer.innerHTML = filteredProducts
      .map(({ id, title, image, price }) => {
        return `
    <article class="product" data-id=${id}>
          <img src=${image} alt="product image" class="product-img img" />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">$${price}</span>
          </footer>
        </article>
   `;
      })
      .join('');
  }
};

//text
form.addEventListener('keyup', () => {
  const value = searchInput.value;
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(value.toLowerCase());
  });
  // console.log(filteredProducts);
  displayProduct();
});
// console.log(filteredProducts);
displayProduct();

const displayButtons = () => {
  const companies = [
    'all',
    ...new Set(products.map((product) => product.company)),
  ];
  // console.log(companies);

  companiesContainer.innerHTML = companies
    .map((company) => {
      return `<button class='company-btn' data-id=${company}>${company}</button>`;
    })
    .join('');
};

displayButtons();

companiesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('company-btn')) {
    let id = e.target.dataset.id;
    console.log(id);
    if (id === 'all') {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === id;
      });
    }
    searchInput.textContent = '';
    displayProduct();
  }
});
