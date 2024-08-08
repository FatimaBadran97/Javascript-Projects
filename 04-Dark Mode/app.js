const toggleBtn = document.querySelector('.btn');

const section = document.querySelector('.articles');

toggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-theme');
});

const posts = articles
  .map(({ title, date, length, snippet }) => {
    const formatDate = moment(date).formate('MMMM Do, YYYY');
    return `
       <article class="post">
        <h2>${title}</h2>
        <div class="post-info">
            <span>${formatDate}</span>; 
          <span>${length} min read</span>
        </div>
        <p>${snippet}</p>
      </article>
`;
  })
  .join('');
section.innerHTML = posts;

console.log(moment, 'kk');
