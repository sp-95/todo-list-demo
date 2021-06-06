import React, { useCallback, useEffect, useRef } from "react"
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
  const taskTitleRef = useRef(title)

  const handleTaskEdit = e => {
    e.preventDefault()

    const taskTitle = taskTitleRef.current.value
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
        taskTitleRef.current.value = ""
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
              ref={taskTitleRef}
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
