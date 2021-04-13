import { DEFAULTS } from './_constant';
import { deepMerge } from './utils/_utils';

export default class Magnify {
  constructor(element, options) {
    this.element = element;
    this.options = deepMerge({}, DEFAULTS, options);

    this.init()
  }

  init() {
    console.log(this.options);
  }
}
