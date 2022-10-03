import { useContext, useEffect } from "react";
import { TimeContext } from '../../context/TimeContext';

const GetTime = () => {

    const { setTime } = useContext(TimeContext);

    useEffect(() => {
        getDate();
        //update clock every 30 seconds
        const interval = setInterval(getDate, 30000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    const getDate = () => {
        const date = new Date()
        setTime(date);
    }

    return (
        <div style={{ display: "none" }}>invisible</div>
    )
}

export default GetTime;




        // if (props.isOn && date.toLocaleTimeString("en-GB") === "23:59:55") {
        //     // send seconds worked to db - set in db CONTINUE TIMER TRUE
        //     const beforeReset = async () => {
        //         const response = await fetch("/api/calendar/" + today(), {
        //             method: 'PATCH',
        //             body: JSON.stringify({ secondsWorked: day.secondsWorked, continueTimer: true }),
        //             headers: { 'Content-Type': 'application/json' }
        //         })
        //         const json = await response.json();
        //         if (response.ok) { console.log(json); }
        //     }
        //     beforeReset()
        // }

        // if (date.toLocaleTimeString("en-GB") === "00:00:00") {
        //     window.location.reload()
        // }

        // if (date.toLocaleTimeString("en-GB") === "00:00:05") {
        //     //   get request to calendar for yesterdays date. if CONTINUE TIMER TRUE, set work timer on.

        //     const afterReset = async () => {
        //         const d = new Date()
        //         const yesterday = new Date(d - 86400000)
        //             .toLocaleDateString("en-GB")
        //             .replace("/", "")
        //             .replace("/", "");

        //         const response = await fetch('/api/calendar/' + yesterday)
        //         const json = await response.json()
        //         if (response.ok) {
        //             if (json.continueTimer) {
        //                 props.timerOn();
        //             }
        //         }
        //     }
        //     afterReset();
        // }