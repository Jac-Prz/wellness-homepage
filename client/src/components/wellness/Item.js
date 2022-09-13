import { useEffect, useState } from "react";
import { useCalendarContext } from "../../hooks/useCalendarContext";
import today from "../../modules/today";

const Item = (props) => {
    const { day, dispatch } = useCalendarContext()
    
    const [isComplete, setComplete] = useState(false);

    useEffect(() => {
        
        if (day) {
            if (day.dailyWellness[props.name]) {
                setComplete(true)
            }
        }
    }, [day, props.name])

    const completeItem = () => {

         const updateItem = async () => {
            
           const update = {dailyWellness: {...day.dailyWellness, [props.name]: true}}
           dispatch({type:'SET_WELLNESS', payload: update})
            
           const response = await fetch('/api/calendar/' + today(), {
                method: 'PATCH', 
                body: JSON.stringify(update), 
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json()

            if (response.ok){
                console.log(json);
                
            }
        }

        updateItem()
        setComplete(true)
    }

    return (
        <li
            onClick={completeItem}
            style={isComplete ? { textDecoration: "line-through" } : { textDecoration: "none" }}>
            {props.text}
        </li>
    )

}

export default Item;