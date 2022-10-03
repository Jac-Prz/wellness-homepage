import { createContext, useReducer } from "react";

export const TodoContext = createContext();

export const todoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                items: action.payload
            }
        case 'CREATE_ITEM':
            return {
                items: [action.payload, ...state.items]
            }
        case 'DELETE_ITEM':
            return {
                items: state.items.filter((i) => i._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const TodoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, {
        items: null
    })

    return (
        <TodoContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TodoContext.Provider>
    )
}