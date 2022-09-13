import Item from "./Item";
const WellnessItems = () => {
    return(
        <div className="left-split-box flex-col-strd ">
        <h3>Wellness Items</h3>
            <ul>
                <Item name="meditate" text="meditate"/>
                <Item name="move" text="move"/>
                <Item name="sleep" text="7h sleep"/>
                <Item name="water" text="2L water"/>
            </ul>
        </div>
    )
}
export default WellnessItems;