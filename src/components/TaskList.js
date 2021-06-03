import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import "./task_list.css"

const TaskList = () => {
  return (
    <div className="task-item">
      <input type="checkbox" className="task-status" />
      <p>Task 1</p>
      <div>
        <button className="edit-btn" onClick={() => alert("Edited")}><FaEdit /></button>
        <button className="delete-btn" onClick={() => alert("Deleted")}><FaTrash /></button>
      </div>
    </div>
  );
}
 
export default TaskList;