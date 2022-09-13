import { useContext, useEffect, useState } from 'react';
import { useCalendarContext } from '../../hooks/useCalendarContext';
import { TimeContext } from '../../context/TimeContext';
import { getMessage, getExercises, getImage } from './getExercises';
import formatSeconds from '../../modules/formatSeconds';
import today from '../../modules/today';
import GetTime from './GetTime';


const Timer = () => {
    // contexts
    const { day, dispatch } = useCalendarContext();
    const { time } = useContext(TimeContext);

    // work timer states
    const [workTimerStart, setWorkTimerStart] = useState(null);
    const [workDisplay, setWorkDisplay] = useState(0);

    // break timer states
    const [breakTimerStart, setBreakTimerStart] = useState(null)
    const [breakDisplay, setBreakDisplay] = useState(0);
    const [breakInfo, setBreakInfo] = useState({ count: 0 });

    // work timer Effect --> runs when worktimer start isnt null. effect is triggered by seconds in the time context.
    useEffect(() => {
        if (workTimerStart !== null) {
            const thisInterval = (time - workTimerStart) / 1000;
            setWorkDisplay(day.secondsWorked + thisInterval);
        } else if (workTimerStart === null) {
            setWorkDisplay(day.secondsWorked);
        }
    })

    // work button
    const clickWork = () => {
        if (workTimerStart !== null) {
            stopWorkTimer();
        } else if (workTimerStart === null) { //start work timer by setting start time. 
            setWorkTimerStart(time);
        }
    }

    //function to stop work timer
    const stopWorkTimer = () => {
        if (workTimerStart) {
            // calculate seconds worked in this bout, dispatch secondsWorked to Calendar Context, send secondsWorked to DB, set "WorkTimerStart" to null. 
            const secsWorked = (time - workTimerStart) / 1000;
            dispatch({ type: 'SET_WORK_TIMER', payload: day.secondsWorked + secsWorked });
            const updateDb = async () => {
                const response = await fetch('api/calendar/' + today(), {
                    method: "PATCH",
                    body: JSON.stringify({ secondsWorked: day.secondsWorked + secsWorked }),
                    headers: { "Content-Type": 'application/json' }
                })
                const json = await response.json();
                if (response.ok) {
                    console.log(json);
                }
            }
            updateDb();
            setWorkTimerStart(null);
        }

    }

    // Break Timer Effect --> 
    useEffect(() => {
        if (breakTimerStart !== null) {
            const breakInterval = (time - breakTimerStart) / 1000;
            setBreakDisplay(breakInterval);
        }
    })

    // break button
    function clickBreak() {
        if (breakTimerStart === null) { // when breaktimer turns on -->  stop work timer, add start time, set and display exercises
            stopWorkTimer();
            setBreakTimerStart(time);
            setBreakInfo((prevValue) => {
                return {
                    count: prevValue.count + 1,
                    exercise: getExercises(prevValue.count),
                    message: getMessage(prevValue.count),
                    image: getImage(prevValue.count),
                }
            })
        } else if (breakTimerStart !== null) { // when break timer turns off --> set break timer to null, display exercises and break end time, add exercises to calendar context and to DB
            setBreakTimerStart(null);
            setBreakInfo((prevValue) => {
                return {
                    count: prevValue.count,
                    exercise: prevValue.exercise,
                    message: "Last break exercises:",
                    image: prevValue.image,
                    breakEnd: time
                }
            })
            // add exercises to calendar context
            dispatch({ type: 'SET_EXERCISES', payload: [...day.breakExercises, breakInfo.exercise.activity, breakInfo.exercise.stretch] });
            // add exercises to DB
            const updateDb = async () => {
                const response = await fetch('api/calendar/' + today(), {
                    method: "PATCH",
                    body: JSON.stringify({ breakExercises: [...day.breakExercises, breakInfo.exercise.activity, breakInfo.exercise.stretch] }),
                    headers: { "Content-Type": 'application/json' }
                })
                const json = await response.json();
                if (response.ok) {
                    console.log(json);
                }
            }
            updateDb();
        }
    }



    return (
        <div id="timer-section" className="upper-section section">
            <div className="timer split-box">
                <div className="left-split-box" onClick={clickWork}>
                    <h3>WORK</h3>
                    <h4 className="time-display">{workDisplay && formatSeconds(workDisplay)}</h4>
                </div>
                <div className="right-split-box" onClick={clickBreak}>
                    <h3>BREAK</h3>
                    <h4 className="time-display">{breakDisplay && formatSeconds(breakDisplay)}</h4>
                </div>
            </div>
            <div className="exercise-div">
                <img style={{ display: breakInfo.image ? "inline" : "none" }} className="gratitude-image" src={"/images/icons/" + breakInfo.image + ".png"} alt="kawaii" />
                <p className={"yellow " + breakInfo.class}>{breakInfo.message && breakInfo.message}</p>
                <p>{breakInfo.exercise && breakInfo.exercise.activity + " & " + breakInfo.exercise.stretch}</p>
                <p className={breakInfo.breakEnd && "pink"}>{breakInfo.breakEnd && "Your last break ended at " + breakInfo.breakEnd.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
             <GetTime />
        </div>
    )
}
export default Timer;

