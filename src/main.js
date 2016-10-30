import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app/app'
import configureStore from './store/configure-store'
import 'whatwg-fetch'

export function injectApp (reactApp, rootEl) {
  if (reactApp && rootEl) render(reactApp, rootEl)
}

const store = configureStore(undefined, module)
const app = <Provider store={store}><App /></Provider>

injectApp(app, document.getElementById('app'))
