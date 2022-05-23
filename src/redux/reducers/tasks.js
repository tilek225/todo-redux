const initialState = {
    tasks: [
        {
            title: 'go to market',
            id: 1
        },
        {
            title: 'buy bread',
            id: 2
        }
    ],
    tasksCount: 2
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD': {
            return {
                ...state,
                tasks: [...state.tasks, {
                    title: action.title,
                    id: state.tasks[state.tasks.length - 1].id + 1
                }],
                tasksCount: state.tasksCount + 1
            }
        }
        case 'DELETE': {
            return {
                ...state,
                tasks: [...state.tasks].filter(item => {
                    return item.id !== action.id
                })
            }
        }
        case 'DELETEALL': {
            return {
                ...state,
                tasks: [],
                tasksCount: 0
            }
        }
        default: return state
    }
}

export const addTask = (title) => {
    return (dispatch) => {
        return dispatch({ type: 'ADD', title })
    }
}

export const deleteTask = (id) => {
    return (dispatch) => {
        dispatch({ type: 'DELETE', id })
    }
}

export const deleteAllTasks = () => {
    return (dispatch) => {
        dispatch({ type: 'DELETEALL' })
    }
}

export const copyTask = (id) => {
    return (dispatch) => {
        return dispatch({ type: 'COPY', id })
    }
}