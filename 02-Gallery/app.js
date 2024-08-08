function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallary(element) {
  this.container = element;
  this.list = [...element.querySelectorAll('.img')];
  // target
  this.modal = getElement('.modal');
  this.modalContent = getElement('.modal-content');
  this.modalImage = getElement('.main-img');
  this.imageName = getElement('.image-name');
  this.modalImages = getElement('.modal-images');
  this.closeBtn = getElement('.close-btn');
  this.prevBtn = getElement('.prev-btn');
  this.nextBtn = getElement('.next-btn');
  // bind function
  // this.openModal = this.openModal.bind(this);
  this.container.addEventListener(
    'click',
    function (e) {
      // console.log(this);
      if (e.target.classList.contains('img')) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );

  this.closeModel = this.closeModel.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.chooseImage = this.chooseImage.bind(this);
}

Gallary.prototype.openModal = function (selectedImage, list) {
  // console.log(this);

  this.setMainImage(selectedImage);

  this.modalImages.innerHTML = list
    .map((image) => {
      return `
    <img src=${image.src}
            title=${image.title}
            data-id=${image.dataset.id}
            class="${
              selectedImage.dataset.id === image.dataset.id
                ? 'selected modal-img'
                : 'modal-img'
            }"
            alt=""
          />
    `;
    })
    .join('');

  this.modal.classList.add('open');

  this.closeBtn.addEventListener('click', this.closeModel);
  this.prevBtn.addEventListener('click', this.prevImage);
  this.nextBtn.addEventListener('click', this.nextImage);
  this.modalImages.addEventListener('click', this.chooseImage);
};

Gallary.prototype.setMainImage = function (selectedImage) {
  this.modalImage.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};

Gallary.prototype.closeModel = function () {
  this.modal.classList.remove('open');
  this.closeBtn.removeEventListener('click', this.closeModel);
  this.prevBtn.removeEventListener('click', this.prevImage);
  this.nextBtn.removeEventListener('click', this.nextImage);
  this.modalImages.removeEventListener('click', this.chooseImage);
};

Gallary.prototype.prevImage = function () {
  const selected = this.modalContent.querySelector('.selected');
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove('selected');
  prev.classList.add('selected');
  this.setMainImage(prev);
};

Gallary.prototype.nextImage = function () {
  const selected = this.modalContent.querySelector('.selected');
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
};

Gallary.prototype.chooseImage = function (e) {
  const choosen = e.target;
  if (choosen.classList.contains('modal-img')) {
    const selected = this.modalContent.querySelector('.selected');
    selected.classList.remove('selected');
    choosen.classList.add('selected');

    this.setMainImage(choosen);
  }
};

const nature = new Gallary(getElement('.nature'));
const city = new Gallary(getElement('.city'));
