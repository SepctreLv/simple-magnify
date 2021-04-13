export const CLASSES = {
  MAGNIFY: 'magnify',
  WINDOW: 'magnify-window',
  OVERLAY: 'magnify-overlay',
  LENS: 'magnify-lens',
  POSITION: 'magnify-window-',
  SHOW: 'magnify-window-show',
  IMAGE: 'magnify-image'
}

export const SELECTORS = {
  LENS: '.magnify-lens',
  WINDOW: '.magnify-window'
}

export const DEFAULTS = {
  source: 'data-origin',
  windowWidth: 400,
  windowHeight: 400,
  position: 'right', // top, bottom, left, right
  wrapSelector: null
};
