import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(rootReducer, devTools)

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    app
)