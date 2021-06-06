import React, { useRef } from "react"
import { FaMinusCircle } from "react-icons/fa"
import "./task.css"
import { createTask, updateTask, deleteTask } from "../services"

const Task = ({ task, editID, setEditID, fetchData }) => {
  const { id, title, completed } = task
  const taskTitleRef = useRef(title)

  const handleEdit = async e => {
    e.preventDefault()

    const taskTitle = taskTitleRef.current.value
    if (taskTitle !== title) {
      try {
        task["title"] = taskTitle
        if (title) await updateTask(task)
        else await createTask(task)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
    setEditID(null)
  }

  const handleCheck = async ({ target }) => {
    try {
      task["completed"] = target.checked
      await updateTask(task)
      fetchData()
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete = async id => {
    try {
      await deleteTask(id)
      fetchData(id)
    } catch (error) {
      console.log(error.message)
    }
  }

  const editing = id === editID

  return (
    <div className="task-container">
      <div className={"task-item" + (completed ? " completed" : "")}>
        <input
          type="checkbox"
          className="task-status"
          checked={completed}
          onChange={handleCheck}
          disabled={editing}
        />
        {editing ? (
          <form className="task-form" onSubmit={handleEdit}>
            <input
              type="text"
              className="task-input"
              placeholder="Task Description"
              defaultValue={title}
              ref={taskTitleRef}
              autoFocus
            />
          </form>
        ) : (
          <p onDoubleClick={() => setEditID(id)}>{title}</p>
        )}
        <div>
          <button
            className={"delete-btn" + (editing ? " disabled" : "")}
            onClick={() => handleDelete(id)}
            disabled={editing}
          >
            <FaMinusCircle />
          </button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Task
