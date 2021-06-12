import React from 'react'
import { FaMinusCircle } from 'react-icons/fa'
import { createTask, deleteTask, updateTask } from '../services'
import DateToday from '../utils/date'
import './styles/task.css'
import ITask from './types/task'

interface ITaskProps {
  task: ITask
  editID: string | null
  setEditID: React.Dispatch<React.SetStateAction<string | null>>
  fetchData: () => Promise<void>
}

const Task = (props: ITaskProps) => {
  const { task, editID, setEditID, fetchData } = props
  const { id, title, completed, dueDate } = task
  const taskTitleRef = React.useRef<HTMLInputElement>(null)
  const taskDueDateRef = React.useRef<HTMLInputElement>(null)

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!taskTitleRef.current || !taskDueDateRef.current) return
    const newTask = {
      ...task,
      title: taskTitleRef.current.value,
      dueDate: taskDueDateRef.current.value,
      modifiedDate: DateToday,
    }
    if (JSON.stringify(newTask) !== JSON.stringify(task)) {
      try {
        if (title) await updateTask(newTask)
        else await createTask(newTask)
      } catch (error) {
        console.log(error.message)
      }
      fetchData()
    }
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

  const handleDoubleClick = () => {
    fetchData()
    setEditID(id)
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
    <div>
      <div className={`task-item${completed ? ' completed' : ''}`}>
        <input type="checkbox" className="task-status" checked={completed} onChange={handleCheck} disabled={editing} />
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
            <input className="task-due-date" type="date" defaultValue={dueDate} ref={taskDueDateRef} />
          </form>
        ) : (
          <div className="task-details">
            <p onDoubleClick={handleDoubleClick}>{title}</p>
            <span className="task-due-date">{dueDate}</span>
          </div>
        )}
        <button
          type="button"
          className={`delete-btn${editing ? ' disabled' : ''}`}
          onClick={handleDelete}
          disabled={editing}
        >
          <FaMinusCircle />
        </button>
      </div>
      <hr />
    </div>
  )
}

export default Task
