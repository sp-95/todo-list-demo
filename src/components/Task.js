import React from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { setCompleted } from "../redux"
import "./task_list.css"

const Task = ({ id, title, completed }) => {
  const dispatch = useDispatch()

  return (
    <div className={"task-item" + (completed ? " completed" : "")}>
      <input
        type="checkbox"
        className="task-status"
        checked={completed}
        onChange={({ target }) => dispatch(setCompleted(id, target.checked))}
      />
      <p>{title}</p>
      <div>
        <button className="edit-btn" onClick={() => alert("Edited")}>
          <FaEdit />
        </button>
        <button className="delete-btn" onClick={() => alert("Deleted")}>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default Task
