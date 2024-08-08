import { getElement } from './utils.js';
const toggleNav = getElement('.toggle-nav');
const sidebarOverlay = getElement('.sidebar-overlay');
const sidebarCloseBtn = getElement('.sidebar-close');

toggleNav.addEventListener('click', () => {
  sidebarOverlay.classList.add('show');
});
sidebarCloseBtn.addEventListener('click', () => {
  sidebarOverlay.classList.remove('show');
});
