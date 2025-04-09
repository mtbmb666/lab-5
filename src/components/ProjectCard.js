"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { SettingsContext } from "../context/SettingsContext"

const getPriorityClass = (priority) => {
  switch (priority) {
    case "high":
      return "badge-danger"
    case "medium":
      return "badge-warning"
    case "low":
      return "badge-success"
    default:
      return "badge-secondary"
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case "completed":
      return "badge-success"
    case "in-progress":
      return "badge-warning"
    case "planning":
      return "badge-primary"
    default:
      return "badge-secondary"
  }
}

const ProjectCard = ({ project }) => {
  const { theme, translations } = useContext(SettingsContext)

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{project.name}</h3>
        <div className="flex gap-2">
          <span className={`badge ${getPriorityClass(project.priority)}`}>{project.priority}</span>
          <span className={`badge ${getStatusClass(project.status)}`}>{project.status}</span>
        </div>
      </div>
      <p className="mb-4">{project.description}</p>
      <div className="flex justify-between items-center">
        <div>
          <small className="text-muted-foreground">
            {translations.dueDate}: {formatDate(project.dueDate)}
          </small>
        </div>
        <Link to={`/project/${project.id}`} className="btn btn-primary">
          {translations.details}
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard
