"use client"

import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProjects, updateProject, deleteProject } from "../redux/projectsSlice"
import { fetchTasks, addTask, updateTask, deleteTask, reorderTasks } from "../redux/tasksSlice"
import ProjectForm from "../components/ProjectForm"
import TaskForm from "../components/TaskForm"
import TaskBoard from "../components/TaskBoard"
import { SettingsContext } from "../context/SettingsContext"

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { translations } = useContext(SettingsContext)

  const { projects, status: projectsStatus } = useSelector((state) => state.projects)
  const { tasks, status: tasksStatus } = useSelector((state) => state.tasks)

  const [project, setProject] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  // Fetch projects and tasks if needed
  useEffect(() => {
    if (projectsStatus === "idle") {
      dispatch(fetchProjects())
    }

    if (tasksStatus === "idle") {
      dispatch(fetchTasks())
    }
  }, [projectsStatus, tasksStatus, dispatch])

  // Find the current project
  useEffect(() => {
    if (projectsStatus === "succeeded") {
      const foundProject = projects.find((p) => p.id === id)
      if (foundProject) {
        setProject(foundProject)
      } else {
        // Project not found, redirect to dashboard
        navigate("/dashboard")
      }
    }
  }, [id, projects, projectsStatus, navigate])

  // Filter tasks for this project
  const projectTasks = tasks.filter((task) => task.projectId === id)

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Handle project update
  const handleUpdateProject = (updatedProject) => {
    dispatch(updateProject({ ...project, ...updatedProject }))
    setEditMode(false)
  }

  // Handle project deletion
  const handleDeleteProject = () => {
    if (window.confirm(translations.confirmDeleteProject)) {
      dispatch(deleteProject(id))
      navigate("/dashboard")
    }
  }

  // Handle task creation
  const handleCreateTask = (task) => {
    dispatch(addTask(task))
    setShowTaskForm(false)
  }

  // Handle task update
  const handleUpdateTask = (task) => {
    dispatch(updateTask(task))
    setSelectedTask(null)
  }

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    if (window.confirm(translations.confirmDeleteTask)) {
      dispatch(deleteTask(taskId))
      setSelectedTask(null)
    }
  }

  // Handle task drag end
  const handleTaskDragEnd = ({ taskId, destination }) => {
    dispatch(
      reorderTasks({
        taskId,
        source: { droppableId: tasks.find((t) => t.id === taskId).status },
        destination,
      }),
    )
  }

  if (!project) {
    return (
      <div className="text-center py-6">
        <div className="spinner"></div>
        <p>{translations.loading}</p>
      </div>
    )
  }

  return (
    <div>
      {editMode ? (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">{translations.editProject}</h2>
          <ProjectForm project={project} onSubmit={handleUpdateProject} onCancel={() => setEditMode(false)} />
        </div>
      ) : (
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h1 className="text-2xl font-bold mb-2 md:mb-0">{project.name}</h1>
            <div className="flex gap-2">
              <button className="btn btn-secondary" onClick={() => setEditMode(true)}>
                {translations.edit}
              </button>
              <button className="btn btn-danger" onClick={handleDeleteProject}>
                {translations.delete}
              </button>
            </div>
          </div>

          <div className="card mb-6">
            <p className="mb-4">{project.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <strong>{translations.status}:</strong> {project.status}
              </div>
              <div>
                <strong>{translations.priority}:</strong> {project.priority}
              </div>
              <div>
                <strong>{translations.dueDate}:</strong> {formatDate(project.dueDate)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">{translations.tasks}</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedTask(null)
            setShowTaskForm(!showTaskForm)
          }}
        >
          {showTaskForm ? translations.cancel : translations.addTask}
        </button>
      </div>

      {showTaskForm && !selectedTask && (
        <div className="mb-6">
          <TaskForm projectId={id} onSubmit={handleCreateTask} onCancel={() => setShowTaskForm(false)} />
        </div>
      )}

      {selectedTask && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{translations.editTask}</h3>
          <TaskForm
            projectId={id}
            task={selectedTask}
            onSubmit={handleUpdateTask}
            onCancel={() => setSelectedTask(null)}
          />
          <div className="mt-2 text-right">
            <button className="text-sm text-red-500" onClick={() => handleDeleteTask(selectedTask.id)}>
              {translations.deleteTask}
            </button>
          </div>
        </div>
      )}

      {projectTasks.length === 0 ? (
        <div className="text-center py-6">
          <p>{translations.noTasksYet}</p>
        </div>
      ) : (
        <TaskBoard tasks={projectTasks} onTaskDragEnd={handleTaskDragEnd} onTaskClick={setSelectedTask} />
      )}
    </div>
  )
}

export default ProjectDetails
