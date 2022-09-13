import { createContext, useReducer } from "react";
import today from "../modules/today";

export const CalendarContext = createContext();

export const calendarReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DAY':
            return {
                day: action.payload
            }
        case "SET_WELLNESS":
            return {
                day: {
                    ...state.day, dailyWellness: action.payload.dailyWellness
                }
            }
        case "SET_TODO_ITEM":
            return {
                day: {
                    ...state.day, completedTasks: action.payload
                }
            }
        case "SET_WORK_TIMER":
            return {
                day: {
                    ...state.day, secondsWorked: action.payload
                }
            }
        case "SET_EXERCISES":
            return {
                day: {
                    ...state.day, breakExercises: action.payload
            }
            }
        default:
            return state
    }
}


export const CalendarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(calendarReducer, {
        day: {
            date: today,
            secondsWorked: 0,
            dailyWellness: {
                meditate: false,
                move: false,
                sleep: false,
                water: false
            },
            gratitude: {
                item1: "",
                item2: "",
                item3: ""
            }, 
            continueTimer: false
        }
    })

    return (
        <CalendarContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CalendarContext.Provider>

    )
}