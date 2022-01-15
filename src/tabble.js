export default class Tabble {
  constructor(fragment, config) {
    this.fragment = fragment
    this.config = new TabbleConfiguration(config)
    this.disableSelectors = this.config.disableSelectors()
    this.ignoreSelectors = this.config.ignoreSelectors()
    this.disableElements = []
    this.ignoreElements = []
    this.tabIndices = []
  }

  record() {
    if (this.ignoreSelectors !== '') {
      this.ignoreElements = Array.from(this.fragment.querySelectorAll(this.ignoreSelectors))
    }
    this.disableElements = Array.from(this.fragment.querySelectorAll(this.disableSelectors))
      .filter(element => !this.ignoreElements.includes(element))

    this.disableElements.map(element => {
      this.tabIndices.push(element.getAttribute('tabindex'))
    })
  }

  disable() {
    this.disableElements.forEach(element => element.setAttribute('tabindex', '-1'))
  }

  restore() {
    this.disableElements.forEach((element, index) => {
      if (this.tabIndices[index] === null) {
        element.removeAttribute('tabindex')
      } else {
        element.setAttribute('tabindex', this.tabIndices[index])
      }
    })
  }
}

class TabbleConfiguration {
  constructor(config) {
    this.config = config
  }

  disableSelectors() {
    return this.config.disable.join(', ')
  }

  ignoreSelectors() {
    return this.config.ignore.join(', ')
  }
}
