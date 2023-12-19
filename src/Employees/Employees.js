import React, {useState} from "react";
import "../App.css";
import "./Employees.css"
import { IgrDataGridModule } from "igniteui-react-grids";
import { IgrDataGrid } from "igniteui-react-grids";
import { IgrTextColumn } from "igniteui-react-grids";
import { IgrTemplateColumn } from "igniteui-react-grids";

const Employees = () => {
    const sampleData = [
      {LastName: "Hendricks", FirstName: "Neil", DomainName: "neilhendricks@intersoftassociates.com", Role: "Admin", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
        {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Admin", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
        {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Admin", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
        {LastName: "Doe", FirstName: "John", DomainName: "johndoe.com", Role: "Standard", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
        {LastName: "Hendricks", FirstName: "Neil", DomainName: "neilhendricks@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
    {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()},
    {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
    {LastName: "Hendricks", FirstName: "Neil", DomainName: "neilhendricks@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: true, HiredDate: new Date()},
    {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()},
    {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()},
    {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()},
    {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
    {LastName: "Hendricks", FirstName: "Neil", DomainName: "neilhendricks@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: true, HiredDate: new Date()},
    {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()},
    {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()},
    {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
    {LastName: "Hendricks", FirstName: "Neil", DomainName: "neilhendricks@intersoftassociates.com", Role: "Standard", SortID: 1, Active: true, Hourly: true, HiredDate: new Date()},
    {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()},
    {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Standard", SortID: 1, Active: false, Hourly: false, HiredDate: new Date()}
       
    ];

    const [employeeFormData, setEmployeeFormData] = useState({
        firstName: "",
        lastName: "",
        userName:"",
        role: 'standardUser',
        active: false,
        sortId: '',
        hiredDate: '',
        hourlyEmployee: false
        })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEmployeeFormData({...employeeFormData, [name]:value})
    }
    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target
        setEmployeeFormData({...employeeFormData, [name]:checked})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleClear = () => {
        setEmployeeFormData({
          firstName: '',
          lastName: '',
          userName: '',
          role: 'standardUser',
          active: false,
          sortId: '',
          hiredDate: '',
          hourlyEmployee: false
        });
      };


  return (
    <div className="employees-container">

      <div className="employee-input-form">
        <div className="name-role-input-column">
          <div>
            <label>First Name</label>
            <input value={employeeFormData.firstName} onChange={handleInputChange} />
          </div>
          <div>
            <label>Last Name</label>
            <input value={employeeFormData.lastName} onChange={handleInputChange} />
          </div>
          <div>
            <label>User Name</label>
            <input value={employeeFormData.userName} onChange={handleInputChange} />
          </div>
          <div>
            <label>Role</label>
            <select style={{width: "177px"}}
                    value={employeeFormData.role}
                    onChange={handleInputChange}
            >
              <option value="standardUser">Standard User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div>
            <button onClick={handleSubmit}>Add</button>
            <button onClick={handleClear}>Clear</button>
            </div>
        </div>

        <div className="active-sort-input-column">
          <div>
            <label>Active</label>
            <input type="checkbox" checked={employeeFormData.active} onChange={handleCheckboxChange} />
          </div>
          <div>
            <label>Sort ID</label>
            <input type="number" checked={employeeFormData.sortId} onChange={handleCheckboxChange} />
          </div>
          <div>
            <label>Hired Date</label>
            <input type="date" checked={employeeFormData.hiredDate} onChange={handleCheckboxChange} />
          </div>
          <div>
            <label>Hourly Employee</label>
            <input type="checkbox" checked={employeeFormData.hourlyEmployee} onChange={handleCheckboxChange} />
          </div>
        </div>

      </div>

      <div className="data-grid">
      
        <IgrDataGrid
          width="100%"
          height="465px"
          autoGenerateColumns={false}
          dataSource={sampleData}
          headerHeight={25}
          rowHeight="20"
          headerTextStyle='8px'
          border='#38cac2;'
        >
          <IgrTextColumn field="LastName" width="100%" name="LastName" headerText="Last Name" > Last Name </IgrTextColumn>
          <IgrTextColumn field="FirstName" width="100%" name="FirstName" headerText="First Name" > First Name </IgrTextColumn>
          <IgrTextColumn field="DomainName"  width="100%" name="DomainName" headerText="Domain Name" > Domain Name </IgrTextColumn>
          <IgrTextColumn field="Role"  width="100%" name="Role" headerText="Role" > Role </IgrTextColumn>
          <IgrTextColumn field="SortID"  width="100%" name="SortID" headerText="Sort ID" > Sort Id </IgrTextColumn>
          <IgrTextColumn field="Active"  width="100%" name="Active" headerText="Active" > Activee </IgrTextColumn>
          <IgrTextColumn field="Hourly"  width="100%" name="Hourly" headerText="Hourly" > Hourly</IgrTextColumn>
          <IgrTextColumn field="HiredDate"  width="100%" name="HiredDate" headerText="Hired Date" > Hired Date </IgrTextColumn>
        </IgrDataGrid>
      
      </div>
    </div>
  );
};

export default Employees;




// import React from "react";
// import "../App.css";
// import "./Employees.css"
// const Employees = () => {
//   return (
//     <div className="employees-container">
      
//       <div className="employee-input-form">
//         <div className="name-role-input-column">
//           <label>First Name</label>
//           <input />
//           <label>Last Name</label>
//           <input />
//           <label>User Name</label>
//           <input />
//           <label>Role</label>
//           <select>
//             <option value="standardUser">Standard User</option>
//             <option value="admin">Administrator</option>
//             {/* Add other roles if needed */}
//           </select>
//           <button>Add</button>
//           <button>Clear</button>
//         </div>

//         <div className="active-sort-input-column">
          
//           <label>Active</label>
//           <input type="checkbox" />
//           <label>Sort ID</label>
//           <input type="number" />
        

        
//           <label>Hired Date</label>
//           <input type="date" />
//           <label>Hourly Employee</label>
//           <input type="checkbox" />
//         </div>
        
//       </div>
      
//       {/* Placeholder for the Infragistics Data Grid */}
//       <div className="data-grid">
//         {/* Data grid will be incorporated here */}
//       </div>
//     </div>
//   );
// };

// export default Employees;




// import React from "react"
// import "../App.css"
// import "./Employees.css"
// const Employees = () => {
//     return(
//         <div className="input-container">
//             <div className="name-Role-container">
//                 <label color="white">First Name</label>
//                 <label>Last Name</label>
//                 <label>User Name</label>
//                 <label>Role</label>
//                     <input />
//                     <input />
//                     <input />
//                     <input />
//             </div>
//         </div>
//     )
// }

// export default Employees;