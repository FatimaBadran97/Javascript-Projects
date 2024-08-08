import sublinks from './data.js';

const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');
const linkBtns = [...document.querySelectorAll('.link-btn')];
const submenu = document.querySelector('.submenu');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');

closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show');
});
toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show');
});

sidebar.innerHTML = sublinks
  .map((item) => {
    const { page, links } = item;
    return `
   <article>
    <h4>${page}</h4>
    <div class="sidebar-sublinks">
     ${links
       .map(({ label, icon, url }) => {
         return `
        <a href=${url}>
         <i class="${icon}"></i>${label}
        </a>
       `;
       })
       .join('')}
   </div>
   </article>
  
  `;
  })
  .join('');

linkBtns.forEach((btn) => {
  btn.addEventListener('mouseover', function (e) {
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const tempPage = sublinks.find(
      ({ page }) => page === e.currentTarget.textContent
    );

    if (tempPage) {
      submenu.classList.add('show');
      submenu.style.top = `${tempBtn.bottom - 3}px`;
      submenu.style.left = `${(tempBtn.left + tempBtn.right) / 2}px`;
      const { page, links } = tempPage;
      submenu.innerHTML = `
      <section>
      <div class="submenu-center col-${links.length}">
      ${links
        .map(({ label, icon, url }) => {
          return `
           <a href=${url}>
            <i class="${icon}"></i>${label}
           </a>
          `;
        })
        .join('')}
        </div>
       </section>
        `;
    }
  });
});

hero.addEventListener('mouseover', function () {
  submenu.classList.remove('show');
});

nav.addEventListener('mouseover', function (e) {
  if (!e.target.classList.contains('link-btn')) {
    submenu.classList.remove('show');
  }
});
