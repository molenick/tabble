import { JSDOM }  from 'jsdom'

const dom = new JSDOM('<html><body><div id="jasmine_content"></div></body></html>')
global.document = dom.window.document
global.window = dom.window
global.navigator = dom.window.navigator
