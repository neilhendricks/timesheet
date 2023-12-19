import React, {useState} from 'react'
import  "../App.css"
import "./Details.css"
import {IgrDataGrid} from "igniteui-react-grids"
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


const Details = () => {
  const [detailsFormData, setDetailsFormData] = useState({
    client: '',
    project: '',
    employee: '',
    referenceNo: '',
    fromDate: '',
    toDate: '',
    includeInternalProjects: false,
    showInactiveClients: false,
    showInactiveProjects: false,
    showInactiveEmployees: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDetailsFormData({
      ...detailsFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Add your form submit handler here

  return (
    <div className="details-container">
      <form className="details-form">
        <div className="details-columns-container">
          {/* Column for Client, Project, and Employee Dropdowns */}
          <div className="details-column">
            {/* Dropdowns */}
            <div className="filter">
              <label>Client</label>
              <select name="client" value={detailsFormData.client} onChange={handleInputChange}></select>
              <label>
                <input type="checkbox" name="showInactiveClients" checked={detailsFormData.showInactiveClients} onChange={handleInputChange} />
                Show Inactive
              </label>
            </div>
            <div className="filter">
              <label>Project</label>
              <select name="project" value={detailsFormData.project} onChange={handleInputChange}></select>
              <label>
                <input type="checkbox" name="showInactiveProjects" checked={detailsFormData.showInactiveProjects} onChange={handleInputChange} />
                Show Inactive
              </label>
            </div>
            <div className="filter">
              <label>Employee</label>
              <select name="employee" value={detailsFormData.employee} onChange={handleInputChange}></select>
              <label>
                <input type="checkbox" name="showInactiveEmployees" checked={detailsFormData.showInactiveEmployees} onChange={handleInputChange} />
                Show Inactive
              </label>
            </div>
          </div>

          {/* Column for Inactive Checkboxes */}
          <div className="details-column">
            {/* Inactive Checkboxes */}
            <div className="checkbox-container">
              
              {/* <label>
                <input type="checkbox" name="showInactiveProjects" checked={detailsFormData.showInactiveProjects} onChange={handleInputChange} />
                Show Inactive
              </label> */}
              {/* <label>
                <input type="checkbox" name="showInactiveEmployees" checked={detailsFormData.showInactiveEmployees} onChange={handleInputChange} />
                Show Inactive
              </label> */}
            </div>
          </div>

          {/* Column for Reference No., From, and To */}
          <div className="details-column">
            {/* Reference No. */}
            <div className="filter">
              <label>Reference No.</label>
              <input type="text" name="referenceNo" value={detailsFormData.referenceNo} onChange={handleInputChange} />
            </div>
            {/* Date Range */}
            <div className="filter">
              <label>From</label>
              <input type="date" name="fromDate" value={detailsFormData.fromDate} onChange={handleInputChange} />
            </div>
            <div className="filter">
              <label>To</label>
              <input type="date" name="toDate" value={detailsFormData.toDate} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="details-column checkbox-bottom">
          {/* Include Internal Projects Checkbox */}
          <div className="form-buttons">
          <button type="submit">Search</button>
          <button type="button">Clear</button>
          <div>
            <input type="checkbox" name="internalProjects" />
            <label>Include Internal Projects</label>
          </div>
        </div>
        
        
      </div>
      <div className="results">
              <div className='billable-hours-column'>
                <div className="filter">
                  <label>Billable Hours</label>
                  <textarea></textarea>
                </div>
                <div className="filter">
                  <label>Clients</label>
                  <textarea></textarea>
                </div>
                <div className="filter">
                  <label>Projects</label>
                  <textarea></textarea>
                </div>
              </div>

              <div className='nonbillable-hours-column'>
                <div className="filter">
                  <label>Non Billable Hours</label>
                  <textarea></textarea>
                </div>
                <div className="filter">
                  <label>Employees</label>
                  <textarea></textarea>
                </div>
                <div className="filter">
                  <label>Reference Numbers</label>
                  <textarea></textarea>
                </div>
              </div>


              <div className='total-hours-column'>
                <div className="filter">
                  <label>Total Hours</label>
                  <textarea></textarea>
                </div>
                <div className="filter">
                  <label>Total Expenses</label>
                  <textarea></textarea>
                </div>
                <div className="filter">
                  <label>Total Entries</label>
                  <textarea></textarea>
                </div>
              </div>

        </div>
        
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
        
      </form>
    </div>
  );
};

export default Details;
