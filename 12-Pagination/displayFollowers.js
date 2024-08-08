const container = document.querySelector('.container');

const display = (followers) => {
  container.innerHTML = followers
    .map((item) => {
      const { avatar_url: img, html_url: url, login: name } = item;
      return `
      <articale class="card">
       <img src=${img} class="" alt="person">
       <h4>${name}</h4>
       <a href=${url} class="btn">view profile</a>
      </articale>
      `;
    })
    .join('');
};

export default display;
