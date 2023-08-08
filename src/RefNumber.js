import React from "react";
import {useState} from "react";
import"./App.css";


const ReferenceNumber = ({referenceNumber, setReferenceNumber}) => {
    // const [RefNo, setRefNo] = useState("")

    const handleReferenceNumber = (event) => {
        setReferenceNumber(event.target.value)
    }

    return(
        <div className="referenceNumberContainer">
            <label> Reference No. </label>
            <input value={referenceNumber} onChange={handleReferenceNumber}/>
        </div>
    )
}

export default ReferenceNumber;

