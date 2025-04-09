"use client"

import React, { useReducer, useContext } from "react"
import { SettingsContext } from "../context/SettingsContext"

// Initial state for the form
const initialState = {
  name: "",
  description: "",
  status: "to-do",
  priority: "medium",
  assignee: "",
  dueDate: new Date().toISOString().slice(0, 10),
}

// Reducer function for form state management
const formReducer = (state, action) => {
  switch (action.type) {
    case "FIELD_CHANGE":
      return {
        ...state,
        [action.field]: action.value,
      }
    case "RESET_FORM":
      return initialState
    case "SET_TASK_DATA":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const TaskForm = ({ projectId, task, onSubmit, onCancel }) => {
  const { translations } = useContext(SettingsContext)

  // Use reducer for form state management
  const [state, dispatch] = useReducer(formReducer, {
    ...initialState,
    projectId,
  })

  // If editing a task, set the form data
  React.useEffect(() => {
    if (task) {
      dispatch({
        type: "SET_TASK_DATA",
        payload: {
          ...task,
          dueDate: new Date(task.dueDate).toISOString().slice(0, 10),
        },
      })
    }
  }, [task])

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: "FIELD_CHANGE",
      field: name,
      value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...state, projectId })
    if (!task) {
      dispatch({ type: "RESET_FORM" })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          {translations.taskName}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={state.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">
          {translations.taskDescription}
        </label>
        <textarea
          id="description"
          name="description"
          value={state.description}
          onChange={handleChange}
          className="form-control"
          rows="3"
          required
        ></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="status" className="block mb-1">
            {translations.taskStatus}
          </label>
          <select id="status" name="status" value={state.status} onChange={handleChange} className="form-control">
            <option value="to-do">{translations.todo}</option>
            <option value="in-progress">{translations.inProgress}</option>
            <option value="done">{translations.done}</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="block mb-1">
            {translations.taskPriority}
          </label>
          <select id="priority" name="priority" value={state.priority} onChange={handleChange} className="form-control">
            <option value="low">{translations.low}</option>
            <option value="medium">{translations.medium}</option>
            <option value="high">{translations.high}</option>
          </select>
        </div>
        <div>
          <label htmlFor="assignee" className="block mb-1">
            {translations.assignee}
          </label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            value={state.assignee}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block mb-1">
            {translations.dueDate}
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={state.dueDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          {translations.cancel}
        </button>
        <button type="submit" className="btn btn-primary">
          {translations.save}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
