import React, { useState } from "react";
import "./Tickets.css";
import "../App.css"
import { IgrDataGrid } from "igniteui-react-grids";
import { IgrTextColumn } from "igniteui-react-grids";

const Tickets = () => {
  const [ticketFormData, setTicketFormData] = useState({
    referenceNo: '',
    client: '',
    project: '',
    filter: false, 
    assignedTo: "",
    estType: "",
    versionNo: "",
    budgetedHours: "",
    budgetedDollars: "",
    estStartDate: "",
    actStartDate: "",
    estPTTesting: "",
    actPTTesting: "",
    estGoLiveDate: "",
    actGoLiveDate: "",
    description: "",
    showClosedTickets: false,
   
  });


  const sampleData = [
    {LastName: "Hendricks", FirstName: "Neil", DomainName: "neilhendricks@intersoftassociates.com", Role: "Admin", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
    {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Admin", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()},
    {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: true, HiredDate: new Date()},
    {LastName: "Hendricks", FirstName: "Neil", DomainName: "neilhendricks@intersoftassociates.com", Role: "Admin", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
    {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: true, HiredDate: new Date()},
    {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Admin", SortID: 1, Active: true, Hourly: true, HiredDate: new Date()},
    {LastName: "Hendricks", FirstName: "Neil", DomainName: "neilhendricks@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
    {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()},
    {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
    {LastName: "Hendricks", FirstName: "Neil", DomainName: "neilhendricks@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: true, HiredDate: new Date()},
    {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()},
    {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()}
   
];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketFormData({ ...ticketFormData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Need to send data to the server
    console.log(ticketFormData);
  };

  const handleCheckboxChange = (e)=> {
    const {name, checked} = e.target
    setTicketFormData({...ticketFormData, [name]:checked})
  }

  // Function to clear the form
  const handleClear = () => {
    // Reset form fields
    setTicketFormData({
        referenceNo: '',
        client: '',
        project: '',
        filter: false, 
        assignedTo: "",
        estType: "",
        versionNo: "",
        budgetedHours: "",
        budgetedDollars: "",
        estStartDate: "",
        actStartDate: "",
        estPTTesting: "",
        actPTTesting: "",
        estGoLiveDate: "",
        actGoLiveDate: "",
        description: "",
        showClosedTickets: false,
    });
  };

  return (
    <div className="tickets-container">
      <form onSubmit={handleSubmit} className="ticket-input-form">
        {/* Form fields here */}
        <div className="input-col-container">
          <div className="left-col-refno">
            
              <label  htmlFor="referenceNo">Reference No.
              <input
                type="text"
                name="referenceNo"
                value={ticketFormData.referenceNo}
                onChange={handleInputChange}
              />
              </label>
           
            
              <label>Client
              <select
                type="text"
                name="Client"
                value={ticketFormData.client}
                onChange={handleInputChange}
                />
                </label>
            
              <label>Project
                <input type="checkbox" value={ticketFormData.filter} onChange={handleCheckboxChange}></input>
                <label>Filter</label>
              <select
                  type="text"
                  name="Project"
                  value={ticketFormData.project}
                  onChange={handleInputChange}
                  />
              </label>
              
                <label>Assigned To
                <select
                    type="text"
                    name="assignedTo"
                    value={ticketFormData.assignedTo}
                    onChange={handleInputChange}
                    />
                </label>
              
              
                <label>Est. Type
                <select
                    //type="text"
                    name="estType"
                    value={ticketFormData.estType}
                    onChange={handleInputChange}
                    />
                </label>
              
              
                <label>Version No.
                <input
                    type="text"
                    name="Client"
                    value={ticketFormData.client}
                    onChange={handleInputChange}
                    />
                </label>
              
          </div>
          <div className="budget-description-container">
            <div className="budget-container">
              <div className="left-col-budget-hrs">
                <label>Budgeted Hours
                  <input
                    type="number"
                    name="budgetedHours"
                    value={ticketFormData.budgetedHours}
                    onChange={handleInputChange}
                    />
                </label>
                <label>Est. Start Date
                  <input
                    type="date"
                    name="estStartDate"
                    value={ticketFormData.estStartDate}
                    onChange={handleInputChange}
                    />
                </label>
                <label>Est. PT Testing
                  <input
                    type="date"
                    name="EstPTTesting"
                    value={ticketFormData.estPTTesting}
                    onChange={handleInputChange}
                    />
                </label>
                <label>Est. Go Live Date
                  <input
                    type="date"
                    name="estGoLiveDate"
                    value={ticketFormData.estGoLiveDate}
                    onChange={handleInputChange}
                    />
                </label>
              </div>
              <div className="right-col-budget-hrs">
                <label>Budgeted Dollars $
                  <input
                    type="number"
                    name="budgetedDollars"
                    value={ticketFormData.budgetedDollars}
                    onChange={handleInputChange}
                    />
                </label>
                <label>Act. Start Date
                  <input
                    type="date"
                    name="estStartDate"
                    value={ticketFormData.estStartDate}
                    onChange={handleInputChange}
                    />
                </label>
                <label>Ac. PT Testing
                  <input
                    type="date"
                    name="EstPTTesting"
                    value={ticketFormData.estPTTesting}
                    onChange={handleInputChange}
                    />
                </label>
                <label>Act. Go Live Date
                  <input
                    type="date"
                    name="estGoLiveDate"
                    value={ticketFormData.estGoLiveDate}
                    onChange={handleInputChange}
                    />
                </label>
              </div>
            </div>
            
            <div className="description-container">
              <label>Description </label>
              <textarea
                name="description"
                value={ticketFormData.description}
                onChange={handleInputChange}
                className="description-textarea"
              />
            
            </div>

          </div>
          

        </div>
        

        <div className="form-buttons">
          <button className="tickets-add-button" type="submit">Add</button>
          <button className="tickets-clear-button" type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>

     
      <div className="data-grid-placeholder">
      <IgrDataGrid
                    width="100%"
                    height="500px"
                    autoGenerateColumns={true}
                    dataSource={sampleData}
                    headerHeight={25}
                    rowHeight="20"
                    headerTextStyle='8px'
                    border='#38cac2;'
                >

                </IgrDataGrid>
      </div>
    </div>
  );
};

export default Tickets;
