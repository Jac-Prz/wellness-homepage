import { useContext, useEffect, useState } from 'react';
import { useCalendarContext } from '../../hooks/useCalendarContext';
import { TimeContext } from '../../context/TimeContext';
import { getMessage, getExercises, getImage } from './getExercises';
import formatSeconds from '../../modules/formatSeconds';
import today from '../../modules/today';
import GetTime from '../nav/GetTime';


const Timer = () => {
    // contexts
    const { day, dispatch } = useCalendarContext();
    const { time } = useContext(TimeContext);

    // work timer states
    // const [workTimerStart, setWorkTimerStart] = useState(null);
    const [workDisplay, setWorkDisplay] = useState(0);

    // break timer states
    const [breakTimerStart, setBreakTimerStart] = useState(null)
    const [breakDisplay, setBreakDisplay] = useState(0);
    const [breakInfo, setBreakInfo] = useState({ count: 0 });

    // work timer Effect --> runs when worktimer start isnt null. effect is triggered by seconds in the time context.

    const myWorkTimer = () => {
        setWorkDisplay(workDisplay + 1);
    }

    useEffect(() => {
        // if work timer has started (value from calendar context or db if refresh)
        if (workDisplay === 0 && day.secondsWorked > 0) {
            const s = (new Date() - new Date(day.workTimerStart)) / 1000
            const afterReset = day.secondsWorked + s;
            setWorkDisplay(afterReset)
        }
        if (day.workTimerStart !== null) {
            const thisInterval = setInterval(myWorkTimer, 1000);
            return () => {
                clearInterval(thisInterval);
            }
        } else if (day.workTimerStart === null) {
            setWorkDisplay(day.secondsWorked);
        }
    });



    // work button
    const clickWork = () => {
        if (day.workTimerStart !== null) {
            stopWorkTimer();
        } else if (day.workTimerStart === null) { //start work timer by setting start time. 
            dispatch({ type: 'SET_WORK_START_TIME', payload: new Date() });

            const updateDb = async () => {
                const response = await fetch('api/calendar/' + today(), {
                    method: "PATCH",
                    body: JSON.stringify({ workTimerStart: new Date() }),
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

    //function to stop work timer
    const stopWorkTimer = () => {
        if (day.workTimerStart) {
            // calculate seconds worked in this bout, dispatch secondsWorked to Calendar Context, send secondsWorked to DB, set "WorkTimerStart" to null. 
            const secsWorked = (new Date() - new Date(day.workTimerStart)) / 1000;
            const totalSecondsWorked = day.secondsWorked + secsWorked
            console.log(secsWorked)
            dispatch({ type: 'SET_WORK_TIMER', payload: totalSecondsWorked });
            dispatch({ type: 'SET_WORK_START_TIME', payload: null });
            const updateDb = async () => {
                const response = await fetch('api/calendar/' + today(), {
                    method: "PATCH",
                    body: JSON.stringify({ secondsWorked: totalSecondsWorked, workTimerStart: null }),
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

    // Break Timer Effect --> 
    const myBreakTimer = () => {
        setBreakDisplay(breakDisplay + 1);
    }

    useEffect(() => {
        if (breakTimerStart !== null) {
            const breakInterval = setInterval(myBreakTimer, 1000)
            return () => {
                clearInterval(breakInterval);
            }
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

