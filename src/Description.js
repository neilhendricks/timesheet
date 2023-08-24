import {useState} from "react"
import "./App.css"
import "./App.js"


const Description = ({description, setDescription, clearInputs, addTimeSheetEntry}) => {
   
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }


return (
    <div className="description-container">
        <label>Description</label>
        <textarea value={description} onChange={handleDescriptionChange} />
        <div className="button-container">
        <button className="add-button" onClick={addTimeSheetEntry}>Add</button>
        <button className="clear-button" onClick={clearInputs}>Clear</button>
      </div>
    </div>
)
}

export default Description