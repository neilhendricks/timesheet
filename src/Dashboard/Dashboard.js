import React, {useState} from "react"
import "../App.css"
import "./Dashboard.css"
import {IgrDataGrid} from "igniteui-react-grids"
import {IgrTextColumn} from "igniteui-react-grids"


const Dashboard = () => {

    const sampleData = [
        {LastName: "Hendricks", FirstName: "Neil", DomainName: "neilhendricks@intersoftassociates.com", Role: "Admin", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
        {LastName: "Ungar", FirstName: "Abe", DomainName: "abeungar.@intersoftassociates.com", Role: "Admin", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()},
        {LastName: "Goldstoff", FirstName: "Hy", DomainName: "hygoldstoff.@intersoftassociates.com", Role: "Admin", SortID: 1, Active: true, Hourly: false, HiredDate: new Date()}
       
    ];

    const [dashboardFormData, setDashboardFormData] = useState({
        referenceNo: "",
        client:"",
        project: '',
        assignedTo: '',
        estimateType: '',
        versionNo: '',
        currentStatus: [],
        estStartDate: '',
        actStartDate: '',
        estPTTesting: '',
        actPTTesting: '',
        estGoLive: '',
        actGoLive: '',
        lastActivity: ''
        })


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setDashboardFormData(prevState=> ({...prevState, [name]: value}))
    }

    const handleCheckboxChange = (e) => { 
        const { name, checked } = e.target;
        if (checked) {
          setDashboardFormData(prevState => ({ ...prevState, currentStatus: [...prevState.currentStatus, name] }));
        } else {
          setDashboardFormData(prevState => ({
            ...prevState,
            currentStatus: prevState.currentStatus.filter(status => status !== name)
          }));
        }
      }

    
    const handleInactiveCheckboxChange = (e) =>{
        //destructuring checkbox event
        const {name, checked } = e.target;
        if (checked) {
            setDashboardFormData(prevState=>({...prevState, showInactive: [...prevState.showInactive, name]}))
        }
        else {
            setDashboardFormData(prevState => ({
                ...prevState,
                showInactive: prevState.showInactive.filter(field => field !== name )
            }))
        }
    }



      return (
        <div className="dashboard-container">
    
          {/* Left column */}
          <div className="dashboard-input-container">
              <div className="left-column">
                <div >
                    <label>
                        Reference No.
                    </label>
                    <input type="text" name="referenceNo" placeholder="Reference No." value={dashboardFormData.referenceNo} onChange={handleInputChange} />
                </div>
                <div>
                    <label for="">
                        Client
                    </label>
                    <select type="text" name="client" placeholder="Client" value={dashboardFormData.client} onChange={handleInputChange} />
                </div>
                <div>
                    <label>
                        Project
                    </label>
                    <select type="text" name="project" placeholder="Project" value={dashboardFormData.project} onChange={handleInputChange} />
                </div>
                <div>
                    <label for="">
                        Assigned To
                    
                    </label>
                    <select type="text" name="assignedTo" placeholder="Assigned To" value={dashboardFormData.assignedTo} onChange={handleInputChange} />
                </div>
                <div>
                    <label for="">
                        Estimate Type
                    
                    </label>
                    <select type="text" name="estimateType" placeholder="Estimate Type" value={dashboardFormData.estimateType} onChange={handleInputChange} />
                </div>
                <div>
                    <label>
                        Version No.
                    
                    </label>
                    <input type="text" name="versionNo" placeholder="Version No." value={dashboardFormData.versionNo} onChange={handleInputChange} />
                </div>
                {/* Current Status Checkboxes */}
                <div>
                    Current Status
                  <label>
                    <input type="checkbox" name="Dev" checked={dashboardFormData.currentStatus.includes("Dev")} onChange={handleCheckboxChange} />
                    Dev
                  </label>
                  <label>
                    <input type="checkbox" name="QA" checked={dashboardFormData.currentStatus.includes("QA")} onChange={handleCheckboxChange} />
                    QA
                  </label>
                  <label>
                    <input type="checkbox" name="Prod" checked={dashboardFormData.currentStatus.includes("Prod")} onChange={handleCheckboxChange} />
                    Prod
                  </label>
                </div>
              </div>
              <div className = "inactive-column">
                <lable>
                    <input type="checkbox" name="clientInactive" onChange={handleInactiveCheckboxChange}/>
                    Show Inactive
                </lable>
                <lable>
                    <input type="checkbox" name="projectInactive" onChange={handleInactiveCheckboxChange}/>
                    Show Inactive
                </lable>
                <label>
                    <input type="checkbox" name="assignedToInactive" onChange={handleInactiveCheckboxChange}/>
                    Show Inactive
                </label>
              </div>
              {/* Right column */}
              <div className="right-column">
                    <div className="date-column">
                        <div>
                            <label >
                                Es. Start From
                            </label>
                            <input type="date" name="estStartDateFrom" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label >
                                Act. Start Date
                            </label>
                            <input type="date" name="actStartDateFrom" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label >
                                Est. PT Testing
                            </label>
                            <input type="date" name="estPTtesting" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label >
                                Act. PT Testing
                            </label>
                            <input type="date" name="estStartDateFrom" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label >
                                Est. Go Live
                            
                            </label>
                            <input type="date" name="estGoLive" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label >
                                Act.Go Live
                            
                            </label>
                            <input type="date" name="actGoLive" onChange={handleInputChange} />
                        </div>
                        <div>
                            <label >
                                Last Activity
                            
                            </label>
                            <input type="date" name="lastActivity" onChange={handleInputChange} />
                        </div>
              
                    </div>
                    <div className="end-date-column">
                        <label >
                            To
                            <input type="date" name="estStartDateTo" onChange={handleInputChange} />
                        </label>
                        <label >
                            To
                            <input type="date" name="actStartDateTo" onChange={handleInputChange} />
                        </label>
                        <label>
                            To
                            <input type="date" name="estPTtestingTo" onChange={handleInputChange} />
                        </label>
                        <label>
                            To
                            <input type="date" name="actPTtestingTo" onChange={handleInputChange} />
                        </label>
                        <label>
                            To
                            <input type="date" name="estGoLiveTo" onChange={handleInputChange} />
                        </label>
                        <label>
                            To
                            <input type="date" name="actGoLiveTo" onChange={handleInputChange} />
                        </label>
                        <label>
                            To
                            <input type="date" name="lastActivityTo" onChange={handleInputChange} />
                        </label>
                    </div>
                </div>
          </div>


            <div className="data-grid">
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
    
   
  
  export default Dashboard;