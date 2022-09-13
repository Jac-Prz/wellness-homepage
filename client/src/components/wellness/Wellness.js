import GratitudeList from "./GratitudeList";
import WellnessItems from "./WellnessItems";
const Wellness = () => {
    return (
        <div id="wellness-section" className="upper-section section">
            <div className="wellness split-box">
                <WellnessItems />
                <GratitudeList />
            </div>
        </div>
    )
}

export default Wellness;