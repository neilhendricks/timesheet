import {useEffect, useState} from "react"
import "./App.css"

const ProjectSelect = ({selectedProject, setSelectedProject, selectedClientId}) => {
    const [projectList, setProjectList] = useState([]);

// useEffect(()=>{
//     if(selectedClientId) {
//     fetch(`http://localhost/3001/api/projects/${selectedClientId}`)
//     .then(response=>response.json)
//     .then(data=>setProjectList(data.map(item=>item.ProjectName)))
//     }
//     else{
//         setProjectList([])
//     }
// }, [selectedClientId])
useEffect(()=>{
   
    if(selectedClientId) {
      
      fetch(`http://localhost:3001/api/projects/${selectedClientId}`)
        .then(response=>response.json())
        .then(data=> {
          
          setProjectList(data.map(item=>item.ProjectName))
        })
        .catch(error => console.error("Error:", error));
    }
    else {
      setProjectList([])
    }
  }, [selectedClientId]);

const handleProjectChange = (event) => {
    setSelectedProject(event.target.value)
}

return (
    <div className="project-select">
        <label>Project</label>
        <select value={selectedProject} onChange={handleProjectChange}>
            <option value="">Select Project</option>
            {projectList.map(item =>(
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
            {/* <option value="project1">RET</option>
            <option value="project2">KML Integration</option>
             <option value="project3">newsday</option> */}
      </select>
    </div>
)
}

export default ProjectSelect