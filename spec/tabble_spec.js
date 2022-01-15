

import Tabble from '../src/tabble.js'

describe('tabble', () => {
  let root, tabble, config

  beforeEach(() => {
    root = document.createElement('div')
    document.body.appendChild(root)
    config = {
      disable: ['a', 'button', 'input', 'textarea', 'select', 'details'],
      ignore: []
    }
    tabble = new Tabble(root, config)
  })

  afterEach(() => {
    root.remove()
  })

  describe('#record', () => {
    beforeEach(() => {
      root.innerHTML = `
        <div>
          <a tabindex="0">Anchor</a>
          <button tabindex="1">Button</button>
          <input tabindex="-1">
          <textarea></textarea>
          <select></select>
          <details></details>
        </div>
      `
    })

    it('stores the selected elements', () => {
      tabble.record()
      expect(tabble.disableElements.map(item => item.nodeName)).toEqual(
        [
          'A',
          'BUTTON',
          'INPUT',
          'TEXTAREA',
          'SELECT',
          'DETAILS'
        ]
      )
    })

    it('records the tab index of each element', () => {
      tabble.record()
      expect(tabble.tabIndices).toEqual(['0', '1', '-1', null, null, null])
    })

    describe('when told to ignore given selectors', () => {
      beforeEach(() => {
        root.innerHTML = `
          <div>
            <a tabindex="0">Anchor</a>
            <button tabindex="1">Button</button>
            <input tabindex="-1">
            <textarea></textarea>
            <select></select>
            <details></details>
            <select class="exclude"></select>
            <section class="exclude">
              <a>Anchor</a>
            </section>
          </div>
        `

        config = {
          disable: ['a', 'button', 'input', 'textarea', 'select', 'details'],
          ignore: ['.exclude', '.exclude *']
        }

        tabble = new Tabble(root, config)
      })

      it('excludes the elements from the selected list', () => {
        tabble.record()
        expect(tabble.disableElements.map(item => item.nodeName)).toEqual(
          [
            'A',
            'BUTTON',
            'INPUT',
            'TEXTAREA',
            'SELECT',
            'DETAILS'
          ]
        )
      })

      it('records the tab index of each element that was not excluded', () => {
        tabble.record()
        expect(tabble.tabIndices).toEqual(['0', '1', '-1', null, null, null])
      })
    })
  })

  describe('#disable', () => {
    beforeEach(() => {
      root.innerHTML = `
        <div>
          <a tabindex="0">Anchor</a>
          <button tabindex="1">Button</button>
          <input tabindex="-1">
          <textarea></textarea>
          <select></select>
          <details></details>
        </div>
      `

      tabble.record()
    })

    it('sets the tabindex of each element to -1', () => {
      tabble.disable()
      expect(tabble.disableElements.map(item => item.getAttribute('tabindex'))).toEqual(
        ['-1', '-1', '-1', '-1', '-1', '-1']
      )
    })

    it('remembers the original tab indices', () => {
      tabble.disable()
      expect(tabble.tabIndices).toEqual(
        ['0', '1', '-1', null, null, null]
      )
    })

    it('sets the tabindex of each selected element to -1', () => {
      const alteredRootHTML = `
        <div>
          <a tabindex="-1">Anchor</a>
          <button tabindex="-1">Button</button>
          <input tabindex="-1">
          <textarea tabindex="-1"></textarea>
          <select tabindex="-1"></select>
          <details tabindex="-1"></details>
        </div>
      `

      tabble.disable()
      expect(root.innerHTML).toEqual(alteredRootHTML)
    })

    describe('when told to ignore given selectors', () => {
      beforeEach(() => {
        root.innerHTML = `
          <div>
            <a tabindex="0">Anchor</a>
            <button tabindex="1">Button</button>
            <input tabindex="-1">
            <textarea></textarea>
            <select></select>
            <details></details>
            <select class="exclude"></select>
            <section class="exclude">
              <a>Anchor</a>
            </section>
          </div>
        `

        config = {
          disable: ['a', 'button', 'input', 'textarea', 'select', 'details'],
          ignore: ['.exclude, .exclude *']
        }

        tabble = new Tabble(root, config)
        tabble.record()
      })

      it('does not modify the tabindex of excluded elements', () => {
        const alteredRootHTML = `
          <div>
            <a tabindex="-1">Anchor</a>
            <button tabindex="-1">Button</button>
            <input tabindex="-1">
            <textarea tabindex="-1"></textarea>
            <select tabindex="-1"></select>
            <details tabindex="-1"></details>
            <select class="exclude"></select>
            <section class="exclude">
              <a>Anchor</a>
            </section>
          </div>
        `

        tabble.disable()
        expect(root.innerHTML).toEqual(alteredRootHTML)
      })
    })
  })

  describe('#restore', () => {
    let rootClone

    beforeEach(() => {
      root.innerHTML = `
        <div>
          <a tabindex="0">Anchor</a>
          <button tabindex="1">Button</button>
          <input tabindex="-1">
          <textarea></textarea>
          <select></select>
          <details></details>
        </div>
      `

      rootClone = root.cloneNode(true)
      tabble.record()
      tabble.disable()
    })

    it('restores the original tab index of each focusable element', () => {
      tabble.restore()
      expect(tabble.disableElements.map(element => element.getAttribute('tabindex'))).toEqual(
        ['0', '1', '-1', null, null, null]
      )
    })

    it('restores the root node', () => {
      tabble.restore()
      expect(root.isEqualNode(rootClone)).toEqual(true)
    })

    it('restore the tabindex of each selected element to its original value', () => {
      const alteredRootHTML = `
        <div>
          <a tabindex="0">Anchor</a>
          <button tabindex="1">Button</button>
          <input tabindex="-1">
          <textarea></textarea>
          <select></select>
          <details></details>
        </div>
      `

      tabble.restore()
      expect(root.innerHTML).toEqual(alteredRootHTML)
    })
  })
})
