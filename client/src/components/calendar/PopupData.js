import formatSeconds from "../../modules/formatSeconds";

const PopupData = (props) => {

    return (
        <div className="pop-out-container" style={{ display: props.showingData ? "flex" : "none" }}>
            <div className="pop-out">
                <h3>{props.showingData && new Date(props.showingData.createdAt).toLocaleDateString('en-GB', { weekday: 'long', year:'numeric', month: 'long', day: 'numeric'})}</h3>
                <div className="popout-body">

                    <h4>Time Worked: <span>{props.showingData && formatSeconds(props.showingData.secondsWorked)}</span></h4>

                    <h4>Exercises: </h4>
                    <ul>
                        {props.showingData && (props.showingData.breakExercises.length > 0) ? props.showingData.breakExercises.map((set, index) => {return <li key={index}>{set}</li>}) : "No Exercises today 😾"}
                    </ul>
                    <h4>Daily Wellness Items Completed: </h4>
                    <ul>
                        <li>Meditation: {props.showingData && props.showingData.dailyWellness.meditate ? "😎" : "🥺"} </li>
                        <li>Exercise: {props.showingData && props.showingData.dailyWellness.move ? "😎" : "🥺"} </li>
                        <li>Sleep: {props.showingData && props.showingData.dailyWellness.sleep ? "😎" : "🥺"} </li>
                        <li>Drink Water: {props.showingData && props.showingData.dailyWellness.water ? "😎" : "🥺"} </li>
                    </ul>
                    <h4>Daily Gratitude List: </h4>
                    <details>
                        <summary>
                            {props.showingData && (props.showingData.gratitude.item1.length > 0) ? "Gratitude List Completed" : "Gratitude List Wasn't Completed"}
                        </summary>
                        <ul>
                            <li>{props.showingData && props.showingData.gratitude.item1}</li>
                            <li>{props.showingData && props.showingData.gratitude.item2}</li>
                            <li>{props.showingData && props.showingData.gratitude.item3}</li>

                        </ul>
                    </details>
                    <h4>Completed Tasks:</h4>
                    <ul>
                        {props.showingData && (props.showingData.completedTasks.length > 0) ? props.showingData.completedTasks.map((task, index) => {return <li key={index}>{task}</li>}) : "What an unproductive day 😔"}
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default PopupData;