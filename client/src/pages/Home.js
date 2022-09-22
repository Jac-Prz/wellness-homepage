import { useEffect } from 'react';
import { useCalendarContext } from '../hooks/useCalendarContext';

// components
import Wellness from '../components/wellness/Wellness';
import Weather from '../components/weather/Weather';
import Timer from '../components/timer/Timer';
import Quote from '../components/Quote';
import Todo from '../components/todo/Todo';


const Home = () => {

    const { dispatch } = useCalendarContext();

    const today = new Date().toLocaleDateString("en-GB").replaceAll("/", "");

    const createDay = async () => {
        const response = await fetch('/api/calendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: today,
                secondsWorked: 0,
                workTimerStart: null, 
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
                })
        });
        const json = await response.json()

        if (response.ok) {
            console.log(json)
            dispatch({ type: 'SET_DAY', payload: json })
        }
    }

    const findToday = async () => {
        const response = await fetch('api/calendar/' + today)
        const json = await response.json()

        if (!json) {
            createDay();
        } else if (response.ok) {
            console.log(json);
            dispatch({ type: 'SET_DAY', payload: json })
        }
    }

    useEffect(() => {
        console.log("home effect used");
        findToday()
    },[])

    return (
        <div className='homepage' >
            <Wellness />
            <Todo type="today" />
            <Weather />
            <Quote />
            <Timer />
            <Todo type="todo" />
        </div>
    )
}
export default Home;