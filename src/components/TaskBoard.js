"use client"

import { useContext } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { SettingsContext } from "../context/SettingsContext"

const getPriorityClass = (priority) => {
  switch (priority) {
    case "high":
      return "border-l-4 border-red-500"
    case "medium":
      return "border-l-4 border-yellow-500"
    case "low":
      return "border-l-4 border-green-500"
    default:
      return ""
  }
}

const TaskBoard = ({ tasks, onTaskDragEnd, onTaskClick }) => {
  const { translations } = useContext(SettingsContext)

  // Group tasks by status
  const groupedTasks = {
    "to-do": tasks.filter((task) => task.status === "to-do"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    done: tasks.filter((task) => task.status === "done"),
  }

  // Handle drag end
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // Check if we have a valid destination
    if (!destination) return

    // Check if the position has changed
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Call the callback
    onTaskDragEnd({
      taskId: draggableId,
      source: source,
      destination: destination,
    })
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="mb-2 font-semibold">{translations.todo}</h3>
          <Droppable droppableId="to-do">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="task-status-column">
                {groupedTasks["to-do"].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`task-item ${getPriorityClass(task.priority)}`}
                        onClick={() => onTaskClick(task)}
                      >
                        <div className="font-medium mb-1">{task.name}</div>
                        <div className="text-sm mb-2 opacity-75 line-clamp-2">{task.description}</div>
                        <div className="flex justify-between items-center text-xs">
                          <span>{task.assignee}</span>
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">{translations.inProgress}</h3>
          <Droppable droppableId="in-progress">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="task-status-column">
                {groupedTasks["in-progress"].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`task-item ${getPriorityClass(task.priority)}`}
                        onClick={() => onTaskClick(task)}
                      >
                        <div className="font-medium mb-1">{task.name}</div>
                        <div className="text-sm mb-2 opacity-75 line-clamp-2">{task.description}</div>
                        <div className="flex justify-between items-center text-xs">
                          <span>{task.assignee}</span>
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">{translations.done}</h3>
          <Droppable droppableId="done">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="task-status-column">
                {groupedTasks["done"].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`task-item ${getPriorityClass(task.priority)}`}
                        onClick={() => onTaskClick(task)}
                      >
                        <div className="font-medium mb-1">{task.name}</div>
                        <div className="text-sm mb-2 opacity-75 line-clamp-2">{task.description}</div>
                        <div className="flex justify-between items-center text-xs">
                          <span>{task.assignee}</span>
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  )
}

export default TaskBoard
