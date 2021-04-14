import Magnify from './simple-magnify'

const thumbElements = document.querySelectorAll('.thumb-item');
const magnifyImg = document.querySelector('.magnify .magnify-image');

thumbElements.forEach((thumbElement) => {
  thumbElement.addEventListener('mouseenter', () => {
    thumbElements.forEach((thumbEl) => {
      thumbEl.classList.remove('active');
    });
    thumbElement.classList.add('active');
    const url = thumbElement.dataset.url;
    const origin = thumbElement.dataset.origin;
    magnifyImg.setAttribute('src', url);
    magnifyImg.setAttribute('data-origin', origin);
  });
});

const magnifyElement = document.querySelector('.magnify');
new Magnify(magnifyElement, {
  wrapSelector: '.magnify-wrap'
});
