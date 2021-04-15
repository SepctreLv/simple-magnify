import { CLASSES, DEFAULTS, LOADER } from './_constant';
import * as utils from './utils/_utils';
import * as dom from './utils/_dom';
import * as event from './utils/_event';

export default class Magnify {
  constructor(element, options) {
    this.$element = element
    this._states = {}
    this.options = Object.assign({}, DEFAULTS, options, this.getDataOptions())
    this.classes = Object.assign({}, CLASSES, this.options.classes)
    this.pageX = null
    this.pageY = null
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

  initWindow() {
    this.$window = dom.appendTo(`<div class="${this.classes.WINDOW}"><img class="${this.classes.WINDOWIMAGE}" src="" alt="" /></div>`, this.$wrap)
    this.$windowImage = dom.query(`.${this.classes.WINDOWIMAGE}`, this.$window)
    utils.setStyle({
      width: this.options.windowWidth,
      height: this.options.windowHeight
    }, this.$window)
    this.$wrap.classList.add(`${this.classes.POSITION}${this.options.position}`)
  }

  initOverlay() {
    this.$overlay = dom.appendTo(`<div class="${this.classes.OVERLAY}"><div class="${this.classes.LENS}"></div></div>`, this.$element)
    this.$lens = dom.query(`.${this.classes.LENS}`, this.$overlay)
    this.bindOverlayEvent()
  }

  bindOverlayEvent() {
    event.bindEvent('mouseenter', () => {
      if (this.overlayTimer) {
        clearTimeout(this.overlayTimer)
        this.overlayTimer = null
      }
    }, this.$overlay)

    event.bindEvent('mouseleave', () => {
      event.trigger(this.eventName('hideoverlay'), this.$overlay)
      this.overlayVisible = false
      utils.setStyle({
        display: 'none'
      }, this.$overlay)
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
      this.moveWindow(e)
    }, this.$overlay)

    this.showOverlay()
    this.stopLoading = true
    utils.setStyle({
      width: this.options.windowWidth,
      height: this.options.windowHeight
    }, this.$window)
    this.showWindowImage()
  }

  hideWindow(e) {
    if(e && e.stopPropagation) e.stopPropagation()
		if(e && e.preventDefault) e.preventDefault()

    event.removeEvent(this.eventName('hideoverlay'), this.$overlay)
    event.removeEvent(this.eventName('mousemove'), this.$overlay)
    this.stopLoading = false
    utils.setStyle({
      width: 'auto',
      height: 'auto',
      transform: 'none'
    }, this.$windowImage)
    this.$window.classList.remove(this.classes.SHOW)
    this.clearLens()
  }

  moveWindow(e) {
    e.preventDefault()
		e.stopPropagation()
    this.pageX = e.pageX
		this.pageY = e.pageY
    this.positionWindow(e, this.$image)
  }

  positionWindow(e, $image) {
    const mouseX = Math.round(e.pageX - dom.getOffset($image).left)
    const mouseY = Math.round(e.pageY - dom.getOffset($image).top)
    const lensPos = this.moveLens(mouseX, mouseY)
    const width = dom.outerWidth(this.$windowImage)
    const height = dom.outerHeight(this.$windowImage)
    const left = -Math.round(width * lensPos.x)
    const top = -Math.round(height * lensPos.y)

    this.moveWindowImage(left, top)
  }

  showOverlay() {
    event.trigger(this.eventName('showoverlay'), this.$overlay)
    utils.setStyle({
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

  showWindowImage() {
    const imagePreview = new Image()
    const src = this.$image.getAttribute(this.options.source)
    imagePreview.src = src

    if (this.stopLoading) {
      this.$window.classList.add(this.classes.SHOW)
      this.$windowImage.setAttribute('src', src)
      utils.setStyle({
        'background-image': `url(${LOADER.loader})`
      }, this.$window)
    }

    const self = this

    imagePreview.addEventListener('load', function() {
      if (self.stopLoading) {
        self.$window.classList.add(self.classes.SHOW)
        utils.setStyle({
          'background-color': self.options.windowBackground || '#ffffff'
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
        utils.setStyle('background-image', 'none', self.$window)

        const e = {
          pageX: self.pageX,
          pageY: self.pageY
        }

        self.initLens()
        self.positionWindow(e, self.$image)
      }
    })
  }

  moveWindowImage(left, top) {
    if (left >= 0) {
      left = 0
    }
    if (left <= this.options.windowWidth - dom.outerWidth(this.$windowImage)) {
      left = this.options.windowWidth - dom.outerWidth(this.$windowImage)
    }
    if (top >= 0) {
      top = 0
    }
    if (top <= this.options.windowHeight - dom.outerHeight(this.$windowImage)) {
      top = this.options.windowHeight - dom.outerHeight(this.$windowImage)
    }

    utils.setStyle({
      transform: `translate(${left}px, ${top}px)`
    }, this.$windowImage)
  }

  initLens() {
    const ratioWidth = this.options.windowWidth / dom.outerWidth(this.$windowImage)
    const ratioHeight = this.options.windowHeight / dom.outerHeight(this.$windowImage)
    const width = Math.round(ratioWidth * dom.outerWidth(this.$image))
    const height = Math.round(ratioHeight * dom.outerHeight(this.$image))
    this.lensSize.width = width
    this.lensSize.height = height

    utils.setStyle({
      width,
      height
    }, this.$lens)

    utils.setStyle({
      'background': `url(${this.$image.getAttribute('src')}) 0 0 no-repeat`
    }, this.$lens)
  }

  moveLens(mouseX, mouseY) {
    let left = Math.round(mouseX - this.lensSize.width / 2)
    let top = Math.round(mouseY - this.lensSize.height / 2)

    if (left <= 0) {
      left = 0
    }
    if (left >= dom.outerWidth(this.$image) - this.lensSize.width) {
      left = dom.outerWidth(this.$image) - this.lensSize.width
    }
    if (top <= 0) {
      top = 0
    }
    if (top >= dom.outerHeight(this.$image) - this.lensSize.height) {
      top = dom.outerHeight(this.$image) - this.lensSize.height
    }

    utils.setStyle({
      transform: `translate(${left}px, ${top}px)`,
      backgroundPosition: `${-left}px ${-top}px`
    }, this.$lens)

    return {
      x: left / dom.outerWidth(this.$image),
      y: top / dom.outerHeight(this.$image)
    }
  }

  clearLens() {
    utils.setStyle({
      background: 'transparent'
    }, this.$lens)
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
