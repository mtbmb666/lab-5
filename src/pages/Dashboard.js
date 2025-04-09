"use client"

import { useEffect, useState, useMemo, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProjects, addProject } from "../redux/projectsSlice"
import ProjectCard from "../components/ProjectCard"
import ProjectForm from "../components/ProjectForm"
import { SettingsContext } from "../context/SettingsContext"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { projects, status, error } = useSelector((state) => state.projects)
  const { translations } = useContext(SettingsContext)

  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterPriority, setFilterPriority] = useState("")

  // Load projects when component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects())
    }
  }, [status, dispatch])

  // Handle project creation
  const handleCreateProject = (project) => {
    dispatch(addProject(project))
    setShowForm(false)
  }

  // Memoized filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search term filter
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus = !filterStatus || project.status === filterStatus

      // Priority filter
      const matchesPriority = !filterPriority || project.priority === filterPriority

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [projects, searchTerm, filterStatus, filterPriority])

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">{translations.dashboard}</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? translations.cancel : translations.createProject}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <ProjectForm onSubmit={handleCreateProject} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder={translations.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
          <div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="form-control">
              <option value="">{translations.allStatuses}</option>
              <option value="planning">{translations.planning}</option>
              <option value="in-progress">{translations.inProgress}</option>
              <option value="completed">{translations.completed}</option>
            </select>
          </div>
          <div>
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="form-control">
              <option value="">{translations.allPriorities}</option>
              <option value="low">{translations.low}</option>
              <option value="medium">{translations.medium}</option>
              <option value="high">{translations.high}</option>
            </select>
          </div>
        </div>
      </div>

      {status === "loading" && (
        <div className="text-center py-6">
          <div className="spinner"></div>
          <p>{translations.loading}</p>
        </div>
      )}

      {status === "failed" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || translations.errorLoadingProjects}
        </div>
      )}

      {status === "succeeded" && filteredProjects.length === 0 && (
        <div className="text-center py-6">
          <p>{translations.noProjectsFound}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
