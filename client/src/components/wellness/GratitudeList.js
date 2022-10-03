import { useState, useEffect } from "react";
import { useCalendarContext } from "../../hooks/useCalendarContext";
import today from "../../modules/today";

const GratitudeList = () => {

    const characters = ["cactus", "coffee-cup", "crab", "dinosaur", "french-fries", "octopus", "penguin", "pineapple", "rainbow"]
    const { day } = useCalendarContext();

    // const { item1, item2, item3 } = day.gratitude;
    const [gratItems, setGratItems] = useState({ item1: "", item2: "", item3: "" })
    const [submitted, setSubmitted] = useState(false);
    const [character, setCharacter] = useState(characters[0]);

    useEffect(() => {
        if (day) {
            if (day.gratitude.item1.length !== 0 && day.gratitude.item2.length !== 0 && day.gratitude.item3.length !== 0) {
                setSubmitted(true);
            }
        }
    }, [day])

    const inputItems = (e) => {
        const { name, value } = e.target
        setGratItems((prevValue) => {
            if (name === "1") {
                return {
                    item1: value,
                    item2: prevValue.item2,
                    item3: prevValue.item3
                }
            } else if (name === "2") {
                return {
                    item1: prevValue.item1,
                    item2: value,
                    item3: prevValue.item3
                }
            } else if (name === "3") {
                return {
                    item1: prevValue.item1,
                    item2: prevValue.item2,
                    item3: value
                }
            }
        })
    }

    const submitList = () => {
        if (gratItems.item1.length !== 0 && gratItems.item2.length !== 0 && gratItems.item3.length !== 0) {
            // submit list to DB
            const submitGratitude = async () => {
                const response = await fetch('/api/calendar/' + today(), {
                    method: "PATCH",
                    body: JSON.stringify({ gratitude: gratItems }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json()
                if (response.ok) {
                    console.log(json)
                }
            }
            submitGratitude();
            setSubmitted(true);
            const randomNumber = Math.floor(Math.random() * characters.length);
            console.log(randomNumber)
            setCharacter(characters[randomNumber]);
        }
    }

    return (
        <div className="right-split-box flex-col-strd">
            <h3>Gratitude List</h3>
            <div className="flex-col-strd" style={submitted ? { display: "none" } : { display: "flex" }}>
                <input name="1" onChange={inputItems} autoComplete="off"></input>
                <input name="2" onChange={inputItems} autoComplete="off"></input>
                <input name="3" onChange={inputItems} autoComplete="off"></input>
                <button onClick={submitList}>+</button>
            </div>
            <div className="flex-col-strd" style={!submitted ? { display: "none" } : { display: "flex" }}>
                <img className="gratitude-image" src={"/images/icons/" + character + ".png"} alt="kawaii" />
            </div>
        </div>
    )
};
export default GratitudeList;