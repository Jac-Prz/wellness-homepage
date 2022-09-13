import { useContext } from "react";
import { TimeContext } from "../../context/TimeContext";

const TimeDate = () => {

    const { time } = useContext(TimeContext);

    const getGreeting = () => {

        if (time) {
            var greeting = "";
            const currentTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
            const hour = parseInt(currentTime.slice(0, 2));
            if (hour < 6) {
                greeting = "Time for bed";
            } else if (hour < 12) {
                greeting = "Good Morning";
            } else if (hour < 17) {
                greeting = "Good Afternoon";
            } else if (hour > 16) {
                greeting = "Good Evening";
            }
            return greeting;
        } else {
            return "Greetings, Jac";
        }
    }

    return (
        <div className="time-date">
            <div className="nav-left">
                <h2>{time && time.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' })}</h2> 
                <p>{time ? time.toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' }) : ""}</p>
            </div>
            <div className="greeting"><h1>{getGreeting()}</h1></div>
        </div>
    )
}

export default TimeDate;
