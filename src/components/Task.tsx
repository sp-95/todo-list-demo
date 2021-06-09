import React from "react"
import { FaMinusCircle } from "react-icons/fa"
import { createTask, deleteTask, updateTask } from "../services"
import "./styles/task.css"
import ITask from "./types/task"

interface ITaskProps {
  task: ITask
  editID: string | null
  setEditID: React.Dispatch<React.SetStateAction<string | null>>
  fetchData: () => Promise<void>
}

const Task = (props: ITaskProps) => {
  const { task, editID, setEditID, fetchData } = props
  const { id, title, completed } = task
  const taskTitleRef = React.useRef<HTMLInputElement>(null)

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!taskTitleRef.current) return
    const taskTitle = taskTitleRef.current.value
    if (taskTitle !== title) {
      try {
        const newTask = { ...task, title: taskTitle }
        if (title) await updateTask(newTask)
        else await createTask(newTask)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
    setEditID(null)
  }

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newTask = { ...task, completed: e.target.checked }
      await updateTask(newTask)
      fetchData()
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask(id)
      fetchData()
    } catch (error) {
      console.log(error.message)
    }
  }

  const editing = id === editID

  return (
    <div className="task-container">
      <div className={`task-item${completed ? " completed" : ""}`}>
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
            type="button"
            className={`delete-btn${editing ? " disabled" : ""}`}
            onClick={handleDelete}
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
