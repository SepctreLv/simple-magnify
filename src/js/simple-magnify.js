import { CLASSES, SELECTORS, DEFAULTS, LOADER } from './_constant';
import * as utils from './utils/_utils';
import * as dom from './utils/_dom';
import * as event from './utils/_event';

export default class Magnify {
  constructor(element, options) {
    this.$element = element
    this._states = {}
    this.options = utils.deepMerge({}, DEFAULTS, options, this.getDataOptions())
    this.classes = utils.deepMerge({}, CLASSES, this.options.classes)
    this.selectors = utils.deepMerge({}, SELECTORS, this.options.selectors)
    this.pageX = null
    this.pageY = null
    this.timer = null
    this.overlayTimer = null
    this.overlayVisible = false
    this.stopLoading = false
    this.lensSize = {}
    this.init()
  }

  init() {
    this.$element.classList.add(this.classes.MAGNIFY)
    this.$image = dom.query('img', this.$element)
    this.$image.classList.add(this.classes.IMAGE)
    this.initWrap()
    this.initWindow()
    this.initOverlay()
    this.bind()
  }

  initWrap() {
    if (this.options.wrapSelector) {
      this.$wrap = dom.query(this.options.wrapSelector) ? dom.query(this.options.wrapSelector) : this.$element
    } else {
      this.$wrap = this.$element
    }
  }

  initOverlay() {
    this.$overlay = dom.appendTo(`<div class="${this.classes.OVERLAY}"><div class="${this.classes.LENS}"></div></div>`, this.$element)
    this.$lens = dom.query(this.selectors.LENS, this.$overlay)

    this.bindOverlayEvent()
  }

  initWindow() {
    this.$window = dom.appendTo(`<div class="${this.classes.WINDOW}"><img src="" alt="" /></div>`, this.$wrap)
    this.$windowImage = dom.query('img', this.$window)
    this.$windowImage.classList.add(this.classes.WINDOWIMAGE)
    utils.setStyle({
      width: this.options.windowWidth,
      height: this.options.windowHeight
    }, this.$window)
    this.$wrap.classList.add(this.classes.POSITION + this.options.position)
  }

  bindOverlayEvent() {
    event.bindEvent('mouseleave', () => {
      event.trigger(this.eventName('hideoverlay'), this.$overlay)
      this.overlayVisible = false
      utils.setStyle({
        display: 'none'
      }, this.$overlay)
    }, this.$overlay)

    event.bindEvent('mouseenter', () => {
      if (this.overlayTimer) {
        clearTimeout(this.overlayTimer)
        this.overlayTimer = null
      }
    }, this.$overlay)
  }

  bind() {
    event.bindEvent(this.eventName('mouseenter'), e => {
      this.showWindow(e)
    }, this.$image)
    event.bindEvent(this.eventName('mouseleave'), e => {
      this.hideOverlay(e)
    }, this.$image)
  }

  showWindow(e) {
    e.preventDefault()
    e.stopPropagation()

    event.bindEvent(this.eventName('hideoverlay'), e => {
      this.hideWindow(e)
    }, this.$overlay)

    event.bindEvent(this.eventName('mousemove'), e => {
      this.moveWindow(e, this.$image)
    }, this.$overlay)

    this.showOverlay()
    event.trigger(this.eventName('windowshow'), this.$element)
    this.delay()
  }

  hideWindow(e) {
    if(e && e.stopPropagation) e.stopPropagation()
		if(e && e.preventDefault) e.preventDefault()

    clearTimeout(this.timer)
    event.removeEvent(this.eventName('hideoverlay'), this.$overlay)
    event.removeEvent(this.eventName('mousemove'), this.$overlay)
    this.stopLoading = false
    utils.setStyle({
      width: 'auto',
      height: 'auto',
      transform: 'none'
    }, this.$windowImage)
    this.$window.classList.remove(this.classes.SHOW)
    event.trigger(this.eventName('windowhide'), this.$element)
    this.clearLens()
  }

  moveWindow(e, $target) {
    e.preventDefault()
		e.stopPropagation()
    this.pageX = e.pageX
		this.pageY = e.pageY
    this.positionWindow($target, e)
  }

  showOverlay() {
    event.trigger(this.eventName('showoverlay'), this.$overlay)
    utils.setStyle({
      width: dom.outerWidth(this.$image),
      height: dom.outerHeight(this.$image),
      display: 'block'
    }, this.$overlay)
    this.overlayVisible = true
  }

  hideOverlay() {
    this.overlayTimer = setTimeout(() => {
      event.trigger(this.eventName('hideoverlay'), this.$overlay)
      this.overlayVisible = false
      utils.setStyle({
        display: 'none'
      }, this.$overlay)
    }, 100)
  }

  delay() {
    this.stopLoading = true
    this.timer = setTimeout(() => {
      this.delayWindow()
    }, 1)
  }

  delayWindow() {
    utils.setStyle({
      width: this.options.windowWidth,
      height: this.options.windowHeight
    }, this.$window)

    const imagePreview = new Image()
    const src = this.$image.getAttribute(this.options.source)
    imagePreview.src = src

    if (this.stopLoading) {
      this.$window.classList.add(this.classes.SHOW)
      this.$windowImage.setAttribute('src', src)
      // $window set background-image to loaderUrl
      utils.setStyle({
        'background-image': `url(${LOADER.loader})`
      }, this.$window)
    }

    const self = this

    imagePreview.addEventListener('load', function() {
      if (self.stopLoading) {
        self.$window.classList.add(self.classes.SHOW)
        utils.setStyle({
          'background-color': '#fff'
        }, self.$window)
        let width = self.options.windowWidth * 2
        let height = self.options.windowHeight * 2
        if (this.width / this.height > self.options.windowWidth / self.options.windowHeight) {
					width = 'auto';
				}
				if (this.width / this.height < self.options.windowWidth / self.options.windowHeight) {
					height = 'auto';
				}
        utils.setStyle({
          width,
          height
        }, self.$windowImage)
        self.$windowImage.setAttribute('src', src)
        self.$windowImage.setAttribute('width', width)
        self.$windowImage.setAttribute('height', height)
        // $window set background-image to none
        utils.setStyle('background-image', 'none', self.$window)

        const e = {
          pageX: self.pageX,
          pageY: self.pageY
        }

        self.initLens()
        self.positionWindow(self.$image, e)
      }
    })
  }

  initLens() {
    const ratioWidth = this.options.windowWidth / dom.outerWidth(this.$windowImage)
    const ratioHeight = this.options.windowHeight / dom.outerHeight(this.$windowImage)
    utils.setStyle({
      'background': `url(${this.$image.getAttribute('src')}) 0 0 no-repeat`
    }, this.$lens)
    const width = Math.round(ratioWidth * dom.outerWidth(this.$image))
    const height = Math.round(ratioHeight * dom.outerHeight(this.$image))
    this.setLensSize(width, height)
  }

  setLensSize(width, height) {
    utils.setStyle({
      width,
      height
    }, this.$lens)
    this.lensSize.width = width
    this.lensSize.height = height
  }

  clearLens() {
    utils.setStyle({
      background: 'transparent'
    }, this.$lens)
  }

  positionWindow($target, e) {
    const mouseX = Math.round(e.pageX - dom.getOffset($target).left)
    const mouseY = Math.round(e.pageY - dom.getOffset($target).top)
    const lensPos = this.moveLens(mouseX, mouseY)
    const width = dom.outerWidth(this.$windowImage)
    const height = dom.outerHeight(this.$windowImage)
    const left = -Math.round(width * lensPos.x)
    const top = -Math.round(height * lensPos.y)

    this.moveWindowImage(left, top)
  }

  moveWindowImage(left, top) {
    const width = this.options.windowWidth
    const height = this.options.windowHeight
    const $img = this.$windowImage

    if (left >= 0) {
      left = 0
    }
    if (left <= width - dom.outerWidth($img)) {
      left = width - dom.outerWidth($img)
    }
    if (top >= 0) {
      top = 0
    }
    if (top <= height - dom.outerHeight($img)) {
      top = height - dom.outerHeight($img)
    }

    utils.setStyle({
      transform: `translate(${left}px, ${top}px)`
    }, $img)
  }

  moveLens(mouseX, mouseY) {
    const $img = this.$image
    const size = this.lensSize
    let left = Math.round(mouseX - size.width / 2)
    let top = Math.round(mouseY - size.height / 2)

    if (left <= 0) {
      left = 0
    }
    if (left >= dom.outerWidth($img) - size.width) {
      left = dom.outerWidth($img) - size.width
    }
    if (top <= 0) {
      top = 0
    }
    if (top >= dom.outerHeight($img) - size.height) {
      top = dom.outerHeight($img) - size.height
    }

    utils.setStyle({
      transform: `translate(${left}px, ${top}px)`,
      backgroundPosition: `${-left}px ${-top}px`
    }, this.$lens)
    return {
      x: left / dom.outerWidth($img),
      y: top / dom.outerHeight($img)
    }
  }

  eventName(eventName) {
    return eventName + '.magnify';
  }

  getDataOptions() {
    if (!this.$element) {
      return {}
    }

    return this.parseDataOptions(this.$element.dataset)
  }

  parseDataOptions(dataset) {
    return Object.entries(dataset).reduce((result, [k, v]) => {
      try {
        const content = JSON.parse(`{"data": ${v.replace(/'/g, '"')}}`).data
        return Object.assign(result, {
          [k]: content
        })
      } catch (err) {
        return Object.assign(result, {
          [k]: v
        })
      }
    }, {})
  }
}
