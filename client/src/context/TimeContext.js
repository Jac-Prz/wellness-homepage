import { createContext, useState } from "react";

export const TimeContext = createContext();

export function TimeProvider({ children }) {

    const [time, setTime] = useState(null);

    return (
        <TimeContext.Provider value={{ time, setTime }}>
            {children}
        </TimeContext.Provider>
    )
}

