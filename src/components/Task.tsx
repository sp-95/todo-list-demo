import React from 'react'
import { FaMinusCircle, FaRegCalendar } from 'react-icons/fa'
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
      <div className="flex justify-between items-center my-4 space-x-2">
        <input type="checkbox" checked={completed} onChange={handleCheck} disabled={editing} />
        {editing ? (
          <form
            className="w-full flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-2"
            onSubmit={handleEdit}
          >
            <input
              type="text"
              className="w-full p-1"
              placeholder="Task Description"
              defaultValue={title}
              ref={taskTitleRef}
              autoFocus
            />
            <input className="w-min" type="date" defaultValue={dueDate} ref={taskDueDateRef} />
          </form>
        ) : (
          <div className="w-full flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-2">
            <p className="self-start" onDoubleClick={handleDoubleClick}>
              {title}
            </p>
            <span className="inline-flex items-center">
              {dueDate}&nbsp; <FaRegCalendar />
            </span>
          </div>
        )}
        <button
          type="button"
          className="pl-2 text-red-500 hover:text-red-600 disabled:text-gray-400 disabled:cursor-not-allowed"
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
