import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app'
import configureStore from './store/configure-store'

import 'expose?$!expose?jQuery!jquery'
import 'bootstrap-webpack'
import './styles.less'

const store = configureStore()
const rootEl = document.getElementById('app')

if (rootEl) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  )
}
