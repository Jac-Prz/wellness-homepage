import { useEffect, useState, useRef } from "react";
import WeekdayCell from "../components/calendar/WeekdayCell";
import DateCell from "../components/calendar/DateCell";
import PopupData from "../components/calendar/PopupData";

const CalendarPage = () => {
    const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //useStates
    const [calendarData, setCalendarData] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [cells, setCells] = useState(null);
    const [showingData, setShowingData] = useState(null);

    // useRef
    const calendarDataRef = useRef(null)


    // use effect to get calendar data from db
    useEffect(() => {
        const getCalendarData = async () => {
            const response = await fetch("/api/calendar");
            const json = await response.json();
            if (response.ok) {
                setCalendarData(json);
                console.log(json);
            }
        }
        getCalendarData();
    }, [])

    // use Effect to set the initial month. 
    useEffect(() => {
        // get days before month starts
        const startDay = new Date(year, month).getDay()
        const daysBefore = [];
        for (let i = - startDay + 1; i < 0; i++) {
            daysBefore.push(new Date(year, month, i));
        }
        // get days of month
        const monthEndDate = new Date(year, month + 1, 0);
        const daysInMonth = [...daysBefore]
        for (let i = 0; i < monthEndDate.getDate(); i++) {
            daysInMonth.push(new Date(year, month, i + 1));
        }
        // get days after month starts
        if (daysInMonth.length < 36) {
            const daysLeft = 35 - daysInMonth.length;
            for (let i = 0; i < daysLeft; i++) {
                daysInMonth.push(new Date(year, month + 1, i + 1));
            }
        } else if (daysInMonth.length >= 36) {
            const daysLeft = 42 - daysInMonth.length;
            for (let i = 0; i < daysLeft; i++) {
                daysInMonth.push(new Date(year, month + 1, i + 1));
            }
        }
        setCells(daysInMonth);
        // if month or year changes, this will refresh
    }, [month, year])

    const backwardMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(prevValue => prevValue - 1);
        } else {
            setMonth(prevValue => prevValue - 1);
        }
    }

    const forwardMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(prevValue => prevValue + 1);
        } else {
            setMonth(prevValue => prevValue + 1);
        }
    }

    const showData = async (dataForThisDate) => {
        if (dataForThisDate) {
            setShowingData(dataForThisDate);
            setTimeout(() => {
                calendarDataRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })}, 200);

            
        } else if (!dataForThisDate) {
            setShowingData(null)
        }
    };

    return (
        <div>
            <div className="calendar-container">
                <div className="calendar">
                    <div className="calendar-header">
                        <div>
                            <div className="arrow">
                                <button onClick={backwardMonth}>&lt;</button>
                            </div>
                        </div>
                        <div className="header">
                            <h3>{months[month]}</h3>
                        </div>
                        <div className="arrow">
                            <button onClick={forwardMonth}>&gt;</button>
                        </div>
                    </div>
                    <div className="calendar-body">
                        <div className="weekdays">
                            {weekdays.map((day, index) => <WeekdayCell key={index} day={day} />)}
                        </div>
                        <div className="calendar-cells">
                            {calendarData && cells.map((cell, index) => <DateCell key={index} date={cell} data={calendarData} showData={showData} thisMonth={month} />)}
                        </div>
                    </div>
                    <div className="calendar-footer">
                        <p>Click the date to view calendar data for that day</p>
                    </div>
                </div>
            </div>
            <div ref={calendarDataRef}>
                <PopupData showingData={showingData} />
                </div>
        </div>
    )
}

export default CalendarPage;

//to fix: if refresh in calendar page, you lose time & date.