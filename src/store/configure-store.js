import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/reducer'

export default function configureStore (preloadedState, module) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunkMiddleware
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  if (module.hot) {
    module.hot.accept('../reducers/reducer', () => {
      const nextReducer = require('../reducers/reducer').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
