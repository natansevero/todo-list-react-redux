import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

ReactDOM.render(
    <Provider store={createStore(rootReducer)} >
        <App />
    </Provider>,
    app
)