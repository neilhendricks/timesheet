import React, {useState} from "react";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

const DatePickerComponent = ({date, setDate}) => {
    //const [date, setDate] = useState(new Date());

    const handleChange = (date) => {
        setDate(date)
    }

    return (
        <div className="date-picker">
            <label>Date</label>
            <DatePicker selected={date} onChange={handleChange} />
        </div>
    );
}

export default DatePickerComponent;




