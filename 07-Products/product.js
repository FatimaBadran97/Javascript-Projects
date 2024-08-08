const productDOM = document.querySelector('.product');

const url = 'https://course-api.com/javascript-store-single-product';

const fetchProduct = async () => {
  productDOM.innerHTML = '<div class="loading"></div>';
  try {
    // console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    productDOM.innerHTML = '<p class="error">there was an error</p>';
  }
};

const displayProduct = (data) => {
  const { name: title, price, company, colors, description } = data.fields;
  const { url: img } = data.fields.image[0];

  const colorsDOM = colors
    .map(
      (color) =>
        `<span class='product-color' style='background: ${color}'></span>`
    )
    .join('');
  document.title = title.toUpperCase();
  productDOM.innerHTML = ` <div class="product-wrapper">
        <img src= ${img} class="img" alt=${title} />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>$${price / 100}</span>
          <div class="colors">
           ${colorsDOM}
          </div>
          <p>
            ${description}
          </p>
          <button class="btn">add to cart</button>
        </div>
      </div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
