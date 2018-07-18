import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    const request = axios.get(`${URL}?sort=-createdAt`)

    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}

// Apenas com redux-multi (Mas os problema dessa abordagem, é pq temos chamda assincronas)
// então precisamos do thunk, pois ele tem um dispatch
// export const add = description => {
//     const request = axios.post(URL, { description })

//     return [
//         { type: 'TODO_ADDED', payload: request },
//         search()
//     ]
// }

export const add = description => {
    return dispatch => {
        axios.post(URL, { description })
            .then(res => dispatch({ type: 'TODO_ADDED', payload: res.data }))
            .then(res => dispatch(search()))
    }
}