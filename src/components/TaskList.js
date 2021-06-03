import React from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import "./task_list.css"

const TaskList = ({ title, completed }) => {
  return (
    <div className={"task-item" + (completed ? " completed" : "")}>
      <input type="checkbox" className="task-status" />
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

export default TaskList
