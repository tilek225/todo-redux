const initialState = {
    users: [
        {
            name: 'Amir',
            age: 15,
            id: 1
        },
        {
            name: 'Tilek',
            age: 35,
            id: 2
        }
    ],
    usersCount: 2
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD': {
            return {
                ...state,
                users: [...state.users, {
                    name: action.name,
                    age: action.age,
                    id: state.users[state.users.length - 1].id + 1
                }],
                usersCount: state.usersCount + 1
            }
        }
        case 'DELETE': {
            return {
                ...state,
                users: [...state.users].filter(item => {
                    return item.id !== action.id
                })
            }
        }
        case 'DELETEALL': {
            return {
                ...state,
                users: [],
                usersCount: 0
            }
        }
        case 'COPY': {

        }
        default: return state
    }
}

export const addUser = (name, age) => {
    return (dispatch) => {
        return dispatch({ type: 'ADD', name, age })
    }
}

export const deleteUser = (id) => {
    return (dispatch) => {
        dispatch({ type: 'DELETE', id })
    }
}

export const deleteAllUsers = () => {
    return (dispatch) => {
        dispatch({ type: 'DELETEALL' })
    }
}

export const copyUser = (id) => {
    return (dispatch) => {
        return dispatch({ type: 'COPY', id })
    }
}