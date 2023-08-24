import {useEffect, useState} from "react"
import "./App.css"

const ProjectSelect = ({selectedProject, setSelectedProject, selectedClientId, selectedProjectId}) => {
    const [projectList, setProjectList] = useState([]);
    
useEffect(()=>{
   
    if(selectedClientId) {
      
      fetch(`http://localhost:3001/api/projects/${selectedClientId}`)
        .then(response=>response.json())
        .then(data=> {
          console.log("Fetched Projects:", data);
          setProjectList(data)
        })
        .catch(error => console.error("Error:", error));
    }
    else {
      setProjectList([])
    }
  }, [selectedClientId]);

const handleProjectChange = (event) => {
  console.log("ProjectSelect: Current selectedProject:", selectedProject);
  console.log("Project selected:", event.target.value);
  const projectId = event.target.value
  const project = projectList.find(p=>p.project_id ===parseInt(projectId))
    //setSelectedProject(event.target.value)
    if (project) {
      console.log("handleChange ifstatement:",project)
      setSelectedProject({ projectId: project.project_id, projectName: project.ProjectName });
  } else {
    setSelectedProject({projectId: "", projectName: ""});
  }
  
}

return (
    <div className="project-select">
        <label>Project</label>
        <select key={selectedClientId} value={selectedProject.projectId || ""} onChange={handleProjectChange}>
            <option value="">Select Project</option>
            {projectList.map(item =>(
                <option key={item.project_id} value={item.project_id}>
                    {item.ProjectName}
                </option>
            ))}
      </select>
    </div>
)
}

export default ProjectSelect