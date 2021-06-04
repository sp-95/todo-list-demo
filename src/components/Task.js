import { FaEdit, FaTrash } from "react-icons/fa"
import "./task.css"

const Task = ({ id, title, completed, handleDelete }) => {
  return (
    <div className={"task-item" + (completed ? " completed" : "")}>
      <input type="checkbox" className="task-status" />
      <p>{title}</p>
      <div>
        <button className="edit-btn" onClick={() => alert("Edited")}>
          <FaEdit />
        </button>
        <button className="delete-btn" onClick={() => handleDelete(id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default Task
