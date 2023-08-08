import React, { useState } from 'react';
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

  const [gridData, setGridData] = useState([
    { Date: '2023-07-24', Client: 'Forchelli Law', Project: 'KML Integration', RefNo: 'KML001', Hrs: '8', B: 'Y' },
    { Date: '2023-07-25', Client: 'MaidenBaum', Project: 'RET', RefNo: 'DIDIT', Hrs: '7', B: 'N' },
    { Date: '2023-07-24', Client: 'MaidenBaum&SternBerg', Project: 'RET', RefNo: 'newsday', Hrs: '30', B: 'N' },
    { Date: '2023-07-26', Client: 'PTRC', Project: 'Support', RefNo: 'PT_0020', Hrs: '2', B: 'N' },
    { Date: '2023-07-28', Client: 'PTRC', Project: 'Support', RefNo: 'PT_0021', Hrs: '2', B: 'N' },
    { Date: '2023-07-20', Client: 'Reliable Health Systems', Project: 'AP-Admin', RefNo: 'RHSAP-ADM', Hrs: '13', B: 'N' },
    { Date: '2023-07-20', Client: 'Reliable Health Sytems', Project: 'AP-Development', RefNo: 'RHSAP-DEV', Hrs: '5', B: 'N' },
    { Date: '2023-07-29', Client: 'Research & Development', Project: 'Marketing', RefNo: 'R&DMKT', Hrs: '10', B: 'N' },
    { Date: '2023-04-22', Client: 'Counseling in Schools', Project: 'Relay 2.0', RefNo: 'CIS001', Hrs: '12', B: 'N' },
    { Date: '2023-06-18', Client: 'Counseling in Schools', Project: 'Relay 2.0', RefNo: 'RELAY20', Hrs: '6', B: 'N' },
    { Date: '2023-08-25', Client: 'Client2', Project: 'Project2', RefNo: '456', Hrs: '10', B: 'N' },

    
  ]);

  const [loggedInUser, setLoggedInUser] = useState("Neil Hendricks");
  
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
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

  return (
    <div className="app">
      <div class="header">
        <img src={logo} alt="logo" className="logo"/>
        <h1 className="title">Time Sheet</h1>
        <h2 className="user">{loggedInUser}</h2>
      </div>
      <NavBar/>
      <div className="client-date-container">
        <ClientSelect selectedClient={selectedClient} setSelectedClient={setSelectedClient} setSelectedClientId={setSelectedClientId} />
        <ProjectSelect selectedProject={selectedProject} setSelectedProject={setSelectedProject} selectedClientId={selectedClientId}/>
        <DatePickerComponent date={date} setDate={setDate}/>
        <HoursandBillable hours={hours} setHours={setHours} isBillable={isBillable} setIsBillable={setIsBillable}/>
        <ReferenceNumber referenceNumber={referenceNumber} setReferenceNumber={setReferenceNumber}/>
        {/* <Status/> */}
      </div>
      <div className='description-expenses-container'>
        <Description description={description} setDescription={setDescription} clearInputs={clearInputs}/>
        {/* <button className="red-button" onClick={clearInputs}>Clear</button> */}
        <div className="grid-container">
          <IgrDataGrid
            width="720px"
            height="95%"
            rowHeight="25"
            autoGenerateColumns={false}
            dataSource={gridData}
            // cellBackground=''
            // headerBackground='#38cac2'
            // cellBackground='#38cac2'
            headerHeight={25}
            headerTextStyle='8px'
           
            // headerTextStyle={{ textOverflow: 'initial', whiteSpace: 'nowrap' }}
            >
            <IgrTextColumn field="Date" name="Date" width="105" >Date</IgrTextColumn>
            <IgrTextColumn field="Client" name="Client" width="150">Client</IgrTextColumn>
            <IgrTextColumn field="Project" name="Project" width="130">Project</IgrTextColumn>
            <IgrTextColumn field="RefNo" name="RefNo" width="107">RefNo</IgrTextColumn>
            <IgrTextColumn field="Hrs" name="Hours" width="84" >Hrs</IgrTextColumn>
            <IgrTextColumn field="B" name="Billable" width="69">Billable</IgrTextColumn>
          </IgrDataGrid>
        </div>
      </div>
      
    </div>
  );
};

export default App;





{/* <IgrTextColumn field="Date" headerText="Date" width="*>"/>
  <IgrTextColumn field="Client" headerText="Client" width="*"/>
  <IgrTextColumn field="Project" headerText="Project" width="*"/>
  <IgrTextColumn field="RefNum" headerText="Ref Num" width="*"/>
  <IgrTextColumn field="Hours" headerText="Hours" width="*"/>
  <IgrTextColumn field="Billable" headerText="Billable" width="*"/> */}