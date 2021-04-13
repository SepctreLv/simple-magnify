import { CLASSES, SELECTORS, DEFAULTS } from './_constant';
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

    this.init()
  }

  init() {
    this.$element.classList.add(this.classes.MAGNIFY)
    this.$image = dom.query('img', this.$element)
    this.$image.classList.add(this.classes.IMAGE)
    this.initWindow()
    this.initOverlay()
    this.bind()
  }

  initOverlay() {
    this.$overlay = dom.appendTo(`<div class="${this.classes.OVERLAY}"><div class="${this.classes.LENS}"></div></div>`, this.$element)
    this.$lens = dom.query(this.selectors.LENS, this.$overlay)

    this.bindOverlayEvent()
  }

  initWindow() {
    this.$window = dom.appendTo(`<div class="${this.classes.WINDOW}"><img src="" alt="" /></div>`, this.$element)
    this.$windowImage = dom.query('img', this.$window)
    utils.setStyle({
      width: this.options.windowWidth,
      height: this.options.windowHeight
    }, this.$window)
    this.$element.classList.add(this.classes.POSITION + this.options.position)
  }

  bindOverlayEvent() {
    event.bindEvent('mouseleave', () => {
      event.trigger(this.eventName('hideoverlay'), this.$overlay)
      this.overlayVisible = false
      utils.setStyle({
        left: 'auto',
        top: 'auto',
        width: 'auto',
        height: 'auto',
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
      this.hideWindow(e)
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
    event.trigger(this.eventName('windowShow'))
    this.setImageOverlay()
    this.delay()
    console.log('show')
  }

  hideWindow(e) {
    if(e && e.stopPropagation) e.stopPropagation()
		if(e && e.preventDefault) e.preventDefault()
    console.log('hide')
  }

  moveWindow(e, $target) {
    e.preventDefault()
		e.stopPropagation()
    this.pageX = e.pageX
		this.pageY = e.pageY
    // console.log($target, e.pageX, e.pageY)
  }

  showOverlay() {
    event.trigger(this.eventName('showoverlay'))
    utils.setStyle({
      top: 0,
      left: 0,
      width: dom.outerWidth(this.$image),
      height: dom.outerHeight(this.$image),
      display: 'block'
    }, this.$overlay)
    this.overlayVisible = true
  }

  setImageOverlay() {
    utils.setStyle({
      top: 0,
      left: 0,
      width: dom.outerWidth(this.$image),
      height: dom.outerHeight(this.$image)
    }, this.$overlay)
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
    }

    const self = this

    imagePreview.addEventListener('load', function() {
      if (self.stopLoading) {
        self.$window.classList.add(self.classes.SHOW)
        utils.setStyle({
          background: '#fff'
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
        self.positionWindow(e)
      }
    })
  }

  initLens() {
    //
  }

  positionWindow(e) {

  }

  eventName(eventName) {
    return eventName + '.magnify';
  }

  // Checks whether the plugin is in a specific state or not.
  is(state) {
    if (this._states[state] && this._states[state] > 0) {
      return true
    }
    return false
  }

  // Enters a state.
  enter(state) {
    if (typeof this._states[state] === 'undefined') {
      this._states[state] = 0
    }

    this._states[state] = 1
  }

  // Leaves a state.
  leave(state) {
    if (typeof this._states[state] === 'undefined') {
      this._states[state] = 0
    }

    this._states[state] = 0
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
