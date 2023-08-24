import { useState } from "react";
import "./App.css"

const HoursandBillable = ({hours, setHours, isBillable, setIsBillable, showHours = true, showBillable = true}) => {
    // const [hours, setHours] = useState("")
    // const [isBillable, setIsBillable] = useState(false);

    const handleHoursChange = (event) => {
        setHours(event.target.value)
    }

    const handleBillableChange = (event)=> {
        setIsBillable(event.target.checked)
    }

    return(
        <div className="hours-billable-container">
           {showHours &&(
            <div className="hours-input">
                <label>Hours</label>
                <input type="number" min="0.25"  value={hours} onChange={handleHoursChange} />
            </div> )}

            {showBillable &&(
            <div className="billable-checkbox">
                <label>Billable</label>
                <input type="checkbox" checked={isBillable} onChange={handleBillableChange} />
            </div> )}
        </div>
    )
}

export default HoursandBillable;