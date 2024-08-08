const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const results = document.querySelector('.results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) {
    results.innerHTML = `<div class="error">Please Enter Valid Search Term</div>`;
  }
  fetchPages(`${url}${value}`);
});

const fetchPages = async (URL) => {
  results.innerHTML = `<div class="loading"></div>`;
  try {
    const resp = await fetch(URL);
    const data = await resp.json();

    if (data.query.search.length < 1) {
      results.innerHTML = `<div class="error">No Matching Results. Please Try Again</div>`;
      return;
    }

    renderResults(data.query.search);
  } catch (error) {
    results.innerHTML = `<div class="error">${error}</div>`;
  }
};

const renderResults = (res) => {
  const articles = res
    .map(({ pageid, title, snippet }) => {
      const page_url = `http://en.wikipedia.org/?curid=${pageid}`;
      return ` <a href=${page_url} target="_blank">
                <h4>${title}</h4>
                <p>${snippet}</p>
               </a> `;
    })
    .join('');

  results.innerHTML = `<div class="articles">${articles}</div> `;
};
