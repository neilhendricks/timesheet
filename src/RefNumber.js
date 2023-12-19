import React from "react";
import {useState} from "react";
import"./Time.css";


const ReferenceNumber = ({referenceNumber, setReferenceNumber, getClientAndProjectFromRefNo }) => {
    

    //when a user types in a reference number, handle that input
    const handleReferenceNumber = (event) => {
        setReferenceNumber(event.target.value)
        // getClientAndProjectFromRefNo(event.target.value);
    }

    const handleEnterPress = (event)=>{
        if(event.key ==="Enter") {
            getClientAndProjectFromRefNo(referenceNumber)
        }
    }

    return(
        <div className="referenceNumberContainer">
            <label> Reference No. </label>
            <input value={referenceNumber} onChange={handleReferenceNumber} onKeyPress={handleEnterPress}/>
        </div>
    )
}

export default ReferenceNumber;

