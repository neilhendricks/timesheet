import React, {useState} from "react"
import  "../App.css"
import "./Expenses.css"
import {IgrDataGrid, IgrTemplateColumn} from "igniteui-react-grids"
import { IgrTextColumn} from "igniteui-react-grids"

const sampleData = [
    {Client: "Maidenbaum & Sternberg", Project: "Project 1", Reference_No: "", Expenses: "1,000", Hourly: false, Date: new Date(), Description: "Bought a $700 4k monitor. Without it I am unable to code"},
    {Client: "Forchelli Law", Project: "Project 2", Reference_No: "KML_001", Expenses: "0", Hourly: false, Date: new Date(), Description: ""},
    {Client: "Fire Command", Project: "Project 3", Reference_No: "PT_bau", Expenses: "300", Hourly: false, Date: new Date(), Description:"Had to go to Nobu for lunch, without Nobu I am unable to code"},
    {Client: "Maidenbaum & Sternberg", Project: "Project 1", Reference_No: "", Expenses: "1,000", Hourly: false, Date: new Date(), Description: "Bought a $700 4k monitor. Without it I am unable to code"},
    {Client: "Forchelli Law", Project: "Project 2", Reference_No: "KML_001", Expenses: "0", Hourly: false, Date: new Date(), Description: ""},
    {Client: "PTRC", Project: "Project 3", Reference_No: "PT_bau", Expenses: "300", Hourly: false, Date: new Date(), Description:"Had to go to Nobu for lunch, without Nobu I am unable to code"},
    {Client: "Maidenbaum & Sternberg", Project: "Project 1", Reference_No: "", Expenses: "1,000", Hourly: false, Date: new Date(), Description: "Bought a $700 4k monitor. Without it I am unable to code"},
    {Client: "Forchelli Law", Project: "Project 2", Reference_No: "KML_001", Expenses: "0", Hourly: false, Date: new Date(), Description: ""},
    {Client: "Fire Command", Project: "Project 3", Reference_No: "PT_bau", Expenses: "300", Hourly: false, Date: new Date(), Description:"Had to go to Nobu for lunch, without Nobu I am unable to code"},
    {Client: "Fire Command", Project: "Project 3", Reference_No: "PT_bau", Expenses: "300", Hourly: false, Date: new Date(), Description:"Had to go to Nobu for lunch, without Nobu I am unable to code"},
    {Client: "Maidenbaum & Sternberg", Project: "Project 1", Reference_No: "", Expenses: "1,000", Hourly: false, Date: new Date(), Description: "Bought a $700 4k monitor. Without it I am unable to code"},
    {Client: "Forchelli Law", Project: "Project 2", Reference_No: "KML_001", Expenses: "0", Hourly: false, Date: new Date(), Description: ""},
    {Client: "Fire Command", Project: "Project 3", Reference_No: "PT_bau", Expenses: "300", Hourly: false, Date: new Date(), Description:"Had to go to Nobu for lunch, without Nobu I am unable to code"},
    {Client: "Maidenbaum & Sternberg", Project: "Project 1", Reference_No: "", Expenses: "1,000", Hourly: false, Date: new Date(), Description: "Bought a $700 4k monitor. Without it I am unable to code"},
    {Client: "Forchelli Law", Project: "Project 2", Reference_No: "KML_001", Expenses: "0", Hourly: false, Date: new Date(), Description: ""},
    {Client: "Maidenbaum & Sternberg", Project: "Project 1", Reference_No: "", Expenses: "1,000", Hourly: false, Date: new Date(), Description: "Bought a $700 4k monitor. Without it I am unable to code"},
    {Client: "Forchelli Law", Project: "Project 2", Reference_No: "KML_001", Expenses: "0", Hourly: false, Date: new Date(), Description: ""},
    {Client: "PTRC", Project: "Project 3", Reference_No: "PT_bau", Expenses: "300", Hourly: false, Date: new Date(), Description:"Had to go to Nobu for lunch, without Nobu I am unable to code"},
    {Client: "Maidenbaum & Sternberg", Project: "Project 1", Reference_No: "", Expenses: "1,000", Hourly: false, Date: new Date(), Description: "Bought a $700 4k monitor. Without it I am unable to code"},
    {Client: "Forchelli Law", Project: "Project 2", Reference_No: "KML_001", Expenses: "0", Hourly: false, Date: new Date(), Description: ""},
    {Client: "Maidenbaum & Sternberg", Project: "Project 1", Reference_No: "", Expenses: "1,000", Hourly: false, Date: new Date(), Description: "Bought a $700 4k monitor. Without it I am unable to code"},
   
];


const Expenses = () => {

    //Expenses States
    const [employeeExpenseData, setEmployeeExpenseData] = useState({
        employee : "",
        client : "",
        project : "",
        date : "",
        refNo : "",
        date : "",
        amount : "",
        description : ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="expenses-container">
                <div className="expenses-input-container">
                    <div className="employee-info-column">
                        <div className="expenses">
                            <label>Employee</label>
                            <select className="expenses-input" value={employeeExpenseData.expenses} onChange={handleSubmit}>
                                <option value="free">Hy Goldstoff</option> 
                                <option value="starter" selected>Neil Hendricks </option> 
                                <option value="professional">Abe Unger</option> 
                                <option value="corporate">Christina Seo</option>
                                <option value="starter" >Ken Tool </option> 
                                <option value="professional">Johnathan Smalls</option> 
                                <option value="corporate">Robin Kim</option>
                            </select>
                        </div>
                        <div className="expenses">
                            <label>Client</label>
                            <input className="expenses-input" value={employeeExpenseData.expenses} onChange={handleSubmit}/>
                        </div>
                        <div className="expenses">
                            <label>Project</label>
                            <input className="expenses-input" value={employeeExpenseData.expenses} onChange={handleSubmit}/>
                        </div>
                        <div className="expenses">
                            <label>Reference Number</label>
                            <input className="expenses-input" value={employeeExpenseData.expenses} onChange={handleSubmit}/>
                        </div>
                        <div className="expenses">
                            <label>Date</label>
                            <input type="date" className="expenses-input" value={employeeExpenseData.expenses} onChange={handleSubmit}/>
                        </div>
                    </div>
                    <div className="expenses-column">
                        <div className="expenses-amount">
                            <label>Expenses Amount</label>
                            <input className="expenses-input" value={employeeExpenseData.amount} onChange={handleSubmit}/>
                        </div>
                        <div className="expenses-description">
                            <label>Expenses Description</label>
                            <textarea value={employeeExpenseData.description} onChange={handleSubmit}/>
                        </div>
                        {/* <div className="expenses-button-container">
                            <button className="expenses-add-button">
                                    Add
                            </button>
                            <button className="expenses-clear-button">
                                    Clear
                            </button>
                        </div> */}
                    </div>
                </div>

            <div className="data-grid-placeholder">
            <IgrDataGrid
                        width="100%"
                        height="100%"
                        autoGenerateColumns={true}
                        dataSource={sampleData}
                        headerHeight={25}
                        rowHeight="20"
                        headerTextStyle='8px'
                        border='#38cac2;'
                    >
                <IgrTextColumn field="Client" headerText="Client" name="Client" width="170">Client</IgrTextColumn>
                <IgrTextColumn field="Project" headerText="Project" name="Project" width="112">Project</IgrTextColumn>
                <IgrTextColumn field="Reference_No" headerText="Reference_No" name="Reference_No" width="122">Project</IgrTextColumn>
                <IgrTextColumn field="Expenses" headerText="Expenses" name="Expenses" width="112">Expenses</IgrTextColumn>
                <IgrTextColumn field="Hourly" headerText="Hourly" name="Hourly" width="100">Hourly</IgrTextColumn>
                <IgrTextColumn field="Date" headerText="Date" name="Date" width="112">Date</IgrTextColumn>
                    {/* <IgrTextColumn field="Description" headerText="Description" name="Description" width="40%" >Description</IgrTextColumn> */}
            </IgrDataGrid>
            </div>
        </div>
    )


}



export default Expenses;