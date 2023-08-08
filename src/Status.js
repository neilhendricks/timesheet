import {useState} from "react"
import "./App.css"

const Status = () => {
    const[status, setStatus] = useState("");

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }



return(
    <div className="status-container">
        <label>Status</label>
        <div className="radio-buttons">
            <div className="radio-button-container">
                <input type="radio" id="dev" name="status" value="Dev" checked={status === "Dev"} onChange={handleStatusChange} />
                <label htmlFor="dev">Dev</label>
            </div>
            <div className="radio-button-container">
                <input type="radio" id="qa" name="status" value="QA" checked={status === "QA"} onChange={handleStatusChange} />
                <label htmlFor="qa">QA</label>
            </div>
            <div className="radio-button-container">
                <input type="radio" id="prod" name="status" value="Prod" checked={status === "Prod"} onChange={handleStatusChange} />
                <label htmlFor="prod">Prod</label>
            </div>
        </div>
    </div>
)
}
export default Status