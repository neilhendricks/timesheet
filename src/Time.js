import React, { useState,useEffect, useRef } from 'react';
import NavBar from './NavBar';
import ClientSelect from './ClientSelect';
import './Time.css';
import logo from './intersoft-logo-white.png'
import DatePicker from "react-datepicker";
import DatePickerComponent from './DatePicker';
import HoursandBillable from './HoursandBillable';
import ReferenceNumber from './RefNumber';
import Status from './Status';
import Description from './Description';
import ProjectSelect from './Project';
import { IgrDataChart, SquarifiedCalculator } from 'igniteui-react-charts';
import { IgrCategoryXAxis } from 'igniteui-react-charts';
import { IgrNumericYAxis } from 'igniteui-react-charts';
import { IgrColumnSeries } from 'igniteui-react-charts';
import {IgrDataGridModule} from "igniteui-react-grids";
import {IgrDataGrid} from "igniteui-react-grids";
import { IgrTextColumn} from "igniteui-react-grids";
import { registerDefaultTheme, ThemeManager } from 'igniteui-react-core';
import { IgrGridSelectedItemsCollection } from 'igniteui-react-grids';
import { IgrTemplateColumn, IgrTemplateCellInfo } from "igniteui-react-grids";
import Routes from "./Router"
import RoutesComponent from './Router';
import { BrowserRouter as Router } from "react-router-dom";
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


  //Reference Number functionality
  const getClientAndProjectFromRefNo = async (refNumber) => {
    try {
      const response = await fetch(`http://localhost:3001/api/ClientProject?refNumber=${refNumber}`)

      const responseData = await response.json();
      console.log("Server Response:", responseData);
      const { ClientName: client, ProjectName: projectName, client_id, project_id } = responseData[0] || {};

      setSelectedClient(client)
      setSelectedClientId(client_id)
      console.log("setSelected Project:", project_id)
      setSelectedProject({ projectId: project_id, projectName: projectName })
      console.log("App: Updated selectedProject:", { projectId: project_id, projectName: projectName });
      console.log("Received client_id:", client_id);

      console.log("Received client and project:", client, projectName);
    }
    catch (err) {
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
        Date: formatDate(item.Date),
        Billable: item.Billable === 1 ? 'Y' : 'N',
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

  const [tooltipText, setTooltipText] = useState('');
  
  // Function to handle hover over the Description cell- Not complete
  const handleDescriptionHover = (event, description) => {
    setTooltipText(description);
    // Calculate the position to display the tooltip
    const x = event.clientX + window.scrollX + 10; // Adjust 10 pixels to the right
    const y = event.clientY + window.scrollY - 30; // Adjust 30 pixels above the cursor
    // Set the tooltip position
    document.getElementById('tooltip').style.left = x + 'px';
    document.getElementById('tooltip').style.top = y + 'px';
    // Show the tooltip
    document.getElementById('tooltip').style.display = 'block';
  };

  // Function to handle mouse leave from the Description cell
  const handleDescriptionLeave = () => {
    // Hide the tooltip
    document.getElementById('tooltip').style.display = 'none';
  };

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

//Selecting a Infragistics Grid row to update or delte
//Delete Button State
const [showDeleteButton, setShowDeleteButton] = useState(false);
const [selectedItemsCollection, setSelectedItemsCollection] = useState(new IgrGridSelectedItemsCollection());
 const onGridRowSelected = async (selection, event)=>{
  console.log("Billable value",event.currentItems._inner._inner[0].Billable)
  console.log("Row selected:", event);
  console.log("currentItems:", event.currentItems);

  //line below caused error when a second row in the infragistics grid was clicked
//console.log("Item at index 0:", event.currentItems._inner._inner[0].timesheet_id);

      const selectedItem = event.currentItems._inner._inner[0];
      
      if(selectedItem && selectedItem.timesheet_id) {
        console.log("Selected timesheet ID:", selectedItem.timesheet_id);
        setShowDeleteButton(true)
          if(!selectedItemsCollection.contains(selectedItem))
            {const newSelectedItemsCollection = new IgrGridSelectedItemsCollection();
            newSelectedItemsCollection.add(selectedItem);
            setSelectedItemsCollection(newSelectedItemsCollection)}
       
        try{
          console.log("Trying to make the API call");
          const response = await fetch(`http://localhost:3001/api/timesheet/${selectedItem.timesheet_id}`)
          if (!response.ok) {
            throw new Error('Failed to fetch data from API.');
        }
          const responseData = await response.json()
          console.log("On row click responseData:", responseData)

          if (responseData && responseData.length > 0) 
          
            {const { ClientName, client_id, ProjectName:projectName, Date:recievedDate, Hours, Billable, Description, project_id} = responseData[0]
            setDate(new Date(recievedDate));
            setSelectedClient(ClientName);
            setSelectedClientId(client_id)
            setSelectedProject({projectId: project_id, projectName: projectName});
            setHours(Hours);
            setIsBillable(Billable);
            setDescription(Description);}
        }
        catch(err){
          console.error("Failed to get selected row info", err)
        }
      }
 }
console.log("Grid data: ", gridData)


    const [editMode, setEditMode] = useState(1);
    const [excelEditMode, setExcelEditMode] = useState(1);

    // const data = DataGridSharedData.getEmployees();
    const grid = useRef(null);

    const canCommit = grid.current && grid.current.canCommit;
    const canUndo = grid.current && grid.current.canUndo;
    const canRedo = grid.current && grid.current.canRedo;

    const onGridRef = (ref) => {
        grid.current = ref;
    }

    const onExcelEditModeChange = (event) => {
        grid.current.editModeClickAction = parseInt(event.target.value);
    }

    const onCommitClick = () => {
       grid.current.commitEdits();
    }

    const onUndoClick = () => {
        grid.current.undo();
    }

    const onRedoClick = () => {
        grid.current.redo();
    }

    const onEditModeChange = (event) => {
        grid.current.cancelEdits();
        grid.current.editMode = parseInt(event.target.value);
    }

    const onDeleteRowClick = async (e) => {
      const button = e.target;
      const viewIndex = parseInt(button.id, 10);
      const rowItem = gridData[viewIndex];
      console.log("Row deleted", rowItem)
      if(rowItem) {
          // Delete the item from  state
          //setGridData(prevData => prevData.filter(item => item !== rowItem));
          try {
            // Call the API endpoint to delete the timesheet entry.
            const response = await fetch(`http://localhost:3001/api/delete/${rowItem.timesheet_id}`, {
              method: 'POST'
            });
            const responseData = await response.json();
      
            if (response.ok) {
              // Update the local state after successful deletion.
              setGridData(prevData => prevData.filter(item => item !== rowItem));
            } else {
              console.error("Failed to delete timesheet entry:", responseData.message);
            }
          } catch(err) {
            console.error("Error:", err);
          }
         
      }
  };
  

    const onCellValueChanging = (s, e) => {
        if(e.newValue === "") {
            s.setEditError(e.editID, "Error, cell is empty");
        }
    }

    const onRowEditEnded = (s, e) => {
        // No logic here in code, just a setState, so leaving it blank
    }

    const onDeleteCellUpdating = (s, e) => {
        const content = e.content;
       
        if (content.childElementCount === 0) {
            const button = document.createElement("button");
            button.innerText = "X";
            button.style.backgroundColor = "red";
            button.addEventListener("click", onDeleteRowClick);
            content.appendChild(button);
        }

        const button = content.children[0];
        button.disabled = e.cellInfo.isDeleted;
        button.id = e.cellInfo.dataRow.toString();
    }

  return (
    // <Router>
    //     <RoutesComponent/>
    //   </Router>
    <div className="app">

      
      {/* <Router>
        <RoutesComponent/>
        <NavBar/>
      </Router> */}
      {/* <NavBar/> */}
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
              width="100%"
              height="465px"
              rowHeight="20"
              autoGenerateColumns={false}
              dataSource={gridData}
              primaryKey="timesheet_id"
              selectedItemsChanged={onGridRowSelected}
              selectionMode="SingleRow"
              selectedItems={selectedItemsCollection}
              editModeClickAction="SingleClick"
              // cellBackground=''
              // headerBackground='#38cac2'
              // cellBackground='#38cac2'
              headerHeight={25}
              headerTextStyle='8px'
              border='#38cac2;'
              
              // headerTextStyle={{ textOverflow: 'initial', whiteSpace: 'nowrap' }}
              >
            <IgrTemplateColumn
              headerText=""
              width="30"
              field="X"
              isColumnOptionsEnabled="false"
               //cellUpdating={onCellUpdating} // Callback for cell updating
               cellUpdating={onDeleteCellUpdating}
               horizontalAlignment="left"
               paddingLeft="0"
               //paddingRight="0"
               
            />
              <IgrTextColumn field="Date" name="Date" width="94"  value={(dataItem) => formatDate(dataItem.Date)} >Date</IgrTextColumn>
              <IgrTextColumn field="ClientName" headerText="Client" name="Client" width="112">Client</IgrTextColumn>
              <IgrTextColumn field="ProjectName"  headerText="Project" name="Project" width="109">Project</IgrTextColumn>
              
              <IgrTextColumn field="Hours" headerText="Hrs" name="Hours" width="84" horizontalAlignment="right" padding="0" >Hrs</IgrTextColumn>
              <IgrTextColumn field="Billable" headerText="B?" name="Billable" width="68" horizontalAlignment="center"  padding="0">Billable</IgrTextColumn>
              <IgrTextColumn field="Description" headerText="Description" name="Description" width="40%" 
              cellMouseEnter={(sender, args) => handleDescriptionHover(args.originalEvent, args.cellInfo.value)}
              cellMouseLeave={handleDescriptionLeave}>Description</IgrTextColumn>
              <IgrTextColumn field="ref_num" headerText="Ref" name="RefNo" width="92">Ref</IgrTextColumn>
            </IgrDataGrid>
          </div>
         {/* Tooltip container */}
      <div id="tooltip" className="tooltip">
        {tooltipText}
      </div>
      </div>
      
    </div>
  );
};

export default App;




// const handleRowDelete = async (rowData) => {
//   try {
//       const response = await fetch(`http://localhost:3001/api/timesheet/${rowData.timesheet_id}`, {
//           method: 'DELETE'
//       });
//       if (!response.ok) {
//           throw new Error('Failed to delete timesheet.');
//       }
//       // Remove item from grid data.
//       const newData = gridData.filter(item => item.timesheet_id !== rowData.timesheet_id);
//       setGridData(newData);
//   } catch (err) {
//       console.error("Failed to delete the timesheet", err);
//   }
// }


// const renderDeleteButton = (cellInfo) => {
//   return (
//       <button className="delete-button" onClick={() => handleRowDelete(cellInfo.rowItem)}>
//           X
//       </button>
//   );
// };

// const cellUpdating = (s, e) => {
//   e.render = renderDeleteButton;
// };








// Rendering remains the same



// const onCellUpdating = (s, e) => {
//   const container = e.cellInfo.content as any;
//   container.style.verticalAlign = "middle";

//   let deleteButton = container.querySelector(".delete-button");
//   if (!deleteButton) {
//     deleteButton = document.createElement("button");
//     deleteButton.className = "delete-button";
//     deleteButton.textContent = "Delete";
//     deleteButton.onclick = () => handleRowDelete(e.cellInfo.rowItem);
//     container.appendChild(deleteButton);
//   }
// }

// const handleDelete = async () => {
//   if (selectedItemsCollection.count > 0) {
//       const selectedItem = selectedItemsCollection.item(0);
//       try {
//           const response = await fetch(`http://localhost:3001/api/timesheet/${selectedItem.timesheet_id}`, {
//               method: 'DELETE'
//           });
//           if (!response.ok) {
//               throw new Error('Failed to delete timesheet.');
//           }
//           // Remove item from grid data and reset selected items collection.
//           const newData = gridData.filter(item => item.timesheet_id !== selectedItem.timesheet_id);
//           setGridData(newData);
//           setSelectedItemsCollection(new IgrGridSelectedItemsCollection());
//           setShowDeleteButton(false);
//       } catch (err) {
//           console.error("Failed to delete the timesheet", err);
//       }
//   }
// }




// const onDeleteClick = (rowData) => {
//   const updatedGridData = gridData.filter(item => item.timesheet_id !== rowData.timesheet_id);
//   setGridData(updatedGridData);
// };




// const onCellUpdating = (s, e) => {
//   // const isRowSelected = selectedItemsCollection.contains(e.cellInfo.rowItem);
//   // if (isRowSelected) {
//   //     e.cellInfo.content = <button className="delete-button" onClick={() => onDelete(e.cellInfo.rowItem)}>X</button>;
//   // } else {
//   //     e.cellInfo.content = null;
//   // }
//   e.cellInfo.content = <button className="delete-button" onClick={() => onDelete(e.cellInfo.rowItem)}>X</button>;
// };

// const onDelete = async (rowData) => {
//   try {
      
//       const response = await fetch(`http://localhost:3001/api/deletetimesheet/${rowData.timesheet_id}`, {
//           method: 'DELETE',
//       });

//       if (response.ok) {
//           fetchTimeSheet();
//       } else {
//           alert('Failed to delete the row.');
//       }
//   } catch (err) {
//       console.error("Failed to delete row:", err);
//   }
//   handleRowDelete(rowData);
// };