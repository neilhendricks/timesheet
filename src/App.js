import React, { useState,useEffect } from 'react';
import NavBar from './NavBar';
import ClientSelect from './ClientSelect';
import './App.css';
import logo from './intersoft-logo-white.png'
import DatePicker from "react-datepicker";
import DatePickerComponent from './DatePicker';
import HoursandBillable from './HoursandBillable';
import ReferenceNumber from './RefNumber';
import Status from './Status';
import Description from './Description';
import ProjectSelect from './Project';
import { IgrDataChart } from 'igniteui-react-charts';
import { IgrCategoryXAxis } from 'igniteui-react-charts';
import { IgrNumericYAxis } from 'igniteui-react-charts';
import { IgrColumnSeries } from 'igniteui-react-charts';
import {IgrDataGridModule} from "igniteui-react-grids";
import {IgrDataGrid} from "igniteui-react-grids";
import { IgrTextColumn} from "igniteui-react-grids";
import { registerDefaultTheme, ThemeManager } from 'igniteui-react-core';

//Initialize modules that support data grid
IgrDataGridModule.register();

const App = () => {


  const addTimeSheetEntry = async () =>{
    console.log("Selected Project:", selectedProject);
    if (!selectedProject) {
      alert("Please select a project before submitting.");
      return;
  }
    const payload = {
      Date: date,
      Hours: hours,
      Billable: isBillable,
      Description: description,
      project_id: selectedProject
    }
    console.log("Payload:", payload);

    try {
      const response = await fetch(`http://localhost:3001/api/sendtimesheet`, {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      if(responseData.status ==="success"){
        clearInputs();
        fetchTimeSheet()
      }
      else{
        alert("Could not add data")
      }
    }
    catch(err){
      console.error("error", err)
    }
  }

  const getClientAndProjectFromRefNo = async (refNumber)=> {
      try{
        const response = await fetch(`http://localhost:3001/api/ClientProject?refNumber=${refNumber}`)
        //const {client, project} = await response.json();
        const responseData = await response.json();
        console.log("Server Response:", responseData);
const { ClientName:client, ProjectName:projectName, client_id, project_id } = responseData[0] || {};
// setSelectedClient(ClientName);
// setSelectedProject(ProjectName);
        setSelectedClient(client)
        setSelectedClientId(client_id)
        console.log("setSelected Project:", project_id)
        setSelectedProject({ projectId: project_id, projectName: projectName })
        console.log("App: Updated selectedProject:", { projectId: project_id, projectName: projectName });
        console.log("Received client_id:", client_id);
        
        console.log("Received client and project:", client, projectName);
      }
      catch(err){
        console.log("error", err)
      }
  }


  //Fetch TimeSheet data to populate Infragistics Grid
  const fetchTimeSheet= async()=>{
    try{
      const response = await fetch(`http://localhost:3001/api/timesheet`)
      const timesheet = await response.json()
      console.log("Data from server:", timesheet);

      const formattedData = timesheet.map(item => ({
        ...item,
        Date: formatDate(item.Date)
    }));

      setGridData(formattedData) //setGridData(timesheet)
    }
    catch(err){
      console.error("Error Fetching", err)
    }
  }
useEffect(()=>{
  fetchTimeSheet()
},[])

  const [gridData, setGridData] = useState([
        
  ]);

  const [loggedInUser, setLoggedInUser] = useState("Neil Hendricks");
  
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProject, setSelectedProject] = useState({projectId: "", projectName: ""});
  const [date, setDate] = useState(null);
  const [hours, setHours] = useState("");
  const [isBillable, setIsBillable] = useState("");
  const [description, setDescription] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [selectedClientId, setSelectedClientId] = useState(null)
  
  const clearInputs = () => {
    setSelectedClient("");
    setSelectedProject("");
    setDate(null);
    setHours("");
    setIsBillable("");
    setDescription("");
    setReferenceNumber("");
    
  };

  

  //Function to formate the date coming from the sql server into the infragistics grid
  function formatDate(value) {
    console.log("formatDate is being executed with value:", value);
    if (value) {
        const [datePart] = value.split('T'); // Extracts '2023-08-09' from sql server ful date '2023-08-09T00:00:00.000Z'
        const [year, month, day] = datePart.split('-');
        return `${month}-${day}-${year.slice(-2)}`;
    }
    return value;
}
 


  return (
    <div className="app">
      <div class="header">
        <img src={logo} alt="logo" className="logo"/>
        <h1 className="title">Time Sheet</h1>
        <h2 className="user">{loggedInUser}</h2>
      </div>
      <NavBar/>
      <div class="main-container">

        <div class="input-container">
        <div className="date-refno-container">
            <ReferenceNumber referenceNumber={referenceNumber} setReferenceNumber={setReferenceNumber} getClientAndProjectFromRefNo={getClientAndProjectFromRefNo}/>
            <DatePickerComponent date={date} setDate={setDate}/>
  
            
          </div>
          <div className="client-hours-container">
            <ClientSelect selectedClient={selectedClient} setSelectedClient={setSelectedClient} setSelectedClientId={setSelectedClientId} />
            <HoursandBillable hours={hours} setHours={setHours} isBillable={isBillable} setIsBillable={setIsBillable} showBillable={false}/>
            
          </div>
          <div className="project-billable">
            <ProjectSelect selectedProject={selectedProject} setSelectedProject={setSelectedProject} selectedClientId={selectedClientId}/>
            <HoursandBillable hours={hours} setHours={setHours} isBillable={isBillable} setIsBillable={setIsBillable} showHours={false}/>
          </div>
          
          <div className='description-expenses-container'>
            <Description description={description} setDescription={setDescription} clearInputs={clearInputs} addTimeSheetEntry={addTimeSheetEntry}/>
          </div>
        </div>


          <div className="grid-container">
            <IgrDataGrid
              width="630px"
              height="465px"
              rowHeight="20"
              autoGenerateColumns={false}
              dataSource={gridData}
              // cellBackground=''
              // headerBackground='#38cac2'
              // cellBackground='#38cac2'
              headerHeight={25}
              headerTextStyle='8px'
              border='#38cac2;'
              
              // headerTextStyle={{ textOverflow: 'initial', whiteSpace: 'nowrap' }}
              >
              <IgrTextColumn field="Date" name="Date" width="94"  value={(dataItem) => formatDate(dataItem.Date)} >Date</IgrTextColumn>
              <IgrTextColumn field="ClientName" headerText="Client" name="Client" width="130">Client</IgrTextColumn>
              <IgrTextColumn field="ProjectName"  headerText="Project" name="Project" width="120">Project</IgrTextColumn>
              <IgrTextColumn field="ref_num" headerText="RefNo" name="RefNo" width="105">RefNo</IgrTextColumn>
              <IgrTextColumn field="Hours" headerText="Hrs" name="Hours" width="84" >Hrs</IgrTextColumn>
              <IgrTextColumn field="Billable" headerText="B?" name="Billable" width="69">Billable</IgrTextColumn>
            </IgrDataGrid>
          </div>
        
      </div>
      
    </div>
  );
};

export default App;

