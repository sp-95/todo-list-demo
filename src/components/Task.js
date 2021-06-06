import React, { useState, useCallback, useEffect } from "react"
import { FaMinusCircle } from "react-icons/fa"
import "./task.css"

const Task = ({
  task,
  editID,
  setEditID,
  handleEdit,
  handleDelete,
  deleteTaskState,
}) => {
  const { id, title, completed } = task
  const [taskTitle, setTaskTitle] = useState(title)

  const handleTaskEdit = e => {
    e.preventDefault()

    if (taskTitle) {
      task["title"] = taskTitle
      handleEdit(task)
    } else if (!title) deleteTaskState(id)
    setEditID(null)
  }

  const handleCheck = ({ target }) => {
    task["completed"] = target.checked
    handleEdit(task)
  }

  const escFunction = useCallback(
    ({ keyCode }) => {
      if (keyCode === 27) {
        setTaskTitle(title)
        if (!title) deleteTaskState(id)
        setEditID(null)
      }
    },
    [id, title, deleteTaskState, setEditID]
  )

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)

    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [escFunction])

  return (
    <div className="task-container">
      <div className={"task-item" + (completed ? " completed" : "")}>
        <input
          type="checkbox"
          className="task-status"
          checked={completed}
          onChange={handleCheck}
        />
        {id === editID ? (
          <form className="task-form" onSubmit={handleTaskEdit}>
            <input
              type="text"
              className="task-input"
              placeholder="Task Description"
              value={taskTitle}
              onChange={({ target }) => setTaskTitle(target.value)}
              autoFocus
            />
          </form>
        ) : (
          <p onDoubleClick={() => setEditID(id)}>{title}</p>
        )}
        <div>
          <button className="delete-btn" onClick={() => handleDelete(id)}>
            <FaMinusCircle />
          </button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Task
