import React, { useCallback, useEffect, useRef } from "react"
import { FaMinusCircle } from "react-icons/fa"
import "./task.css"
import { createTask, updateTask } from "../services"

const Task = ({
  task,
  editID,
  setEditID,
  handleDelete,
  deleteTaskState,
  fetchData,
}) => {
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
        fetchData()
      } catch (error) {
        console.log(error)
      }
    } else if (!title) deleteTaskState(id)
    setEditID(null)
  }

  const handleCheck = async ({ target }) => {
    try {
      task["completed"] = target.checked
      await updateTask(task)
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const escFunction = useCallback(
    ({ keyCode }) => {
      if (keyCode === 27) {
        taskTitleRef.current = ""
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
