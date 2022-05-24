const initialState = {
    tasks: [
        {
            title: 'go to market',
            id: 1,
            change: false,
            isDone: false,
            isImportant: false
        },
        {
            title: 'buy bread',
            id: 2,
            change: false,
            isDone: false,
            isImportant: false
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
        case 'EDIT': {
            return {
                ...state,
                tasks: state.tasks.map(item => {
                    if (item.id === action.id) {
                        return { ...item, title: action.title, change: !item.change }
                    } else {
                        return item
                    }
                })
            }
        }
        case 'EDIT2': {
            return {
                ...state,
                tasks: state.tasks.map(item => {
                    if (item.id === action.id) {
                        return { ...item, change: !item.change }
                    } else {
                        return item
                    }
                })
            }
        }
        case 'DONE': {
            return {
                ...state,
                tasks: state.tasks.map(item => {
                    if (item.id === action.id) {
                        return { ...item, isDone: !item.isDone }
                    } else {
                        return item
                    }
                })
            }
        }
        case 'IMPORTANT': {
            return {
                ...state,
                tasks: state.tasks.map(item => {
                    if (item.id === action.id) {
                        return { ...item, isImportant: !item.isImportant }
                    } else {
                        return item
                    }
                })
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

export const editTask = (title, id, change) => {
    return (dispatch) => {
        if (change) {
            return dispatch({ type: 'EDIT', title, id })
        } else {
            return dispatch({ type: 'EDIT2', id })
        }
    }
}

export const doneTask = (id) => {
    return (dispatch) => {
        return dispatch({ type: 'DONE', id })
    }
}

export const importantTask = (id) => {
    return (dispatch) => {
        return dispatch({ type: 'IMPORTANT', id })
    }
}