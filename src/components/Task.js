import React, { useCallback, useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { connect, useDispatch } from "react-redux"
import { deleteTask, editTask, isEditing, setCompleted } from "../redux"
import "./task_list.css"

const Task = ({ taskData, id = Date.now(), title = "", completed = false }) => {
  const { editID } = taskData
  const dispatch = useDispatch()
  const [taskTitle, setTaskTitle] = useState(title)

  const handleEdit = e => {
    e.preventDefault()

    var editedTask = taskData.tasks.find(task => task.id === editID)
    if (taskTitle) {
      editedTask["title"] = taskTitle
      dispatch(editTask(editedTask))
    } else {
      if (!title) dispatch(deleteTask(id))
      else dispatch(editTask(editedTask))
    }
  }

  const escFunction = useCallback(
    ({ keyCode }) => {
      if (keyCode === 27) {
        setTaskTitle(title)
        if (!title) dispatch(deleteTask(id))
        else dispatch(isEditing(null))
      }
    },
    [dispatch, id, title]
  )

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)

    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [escFunction])

  return (
    <div className={"task-item" + (completed ? " completed" : "")}>
      <input
        type="checkbox"
        className="task-status"
        checked={completed}
        onChange={({ target }) => dispatch(setCompleted(id, target.checked))}
      />
      {id === editID ? (
        <form className="task-form" onSubmit={handleEdit}>
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
        <p onDoubleClick={() => dispatch(isEditing(id))}>{title}</p>
      )}
      <div>
        <button className="delete-btn" onClick={() => dispatch(deleteTask(id))}>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    taskData: state.task,
  }
}

export default connect(mapStateToProps)(Task)
