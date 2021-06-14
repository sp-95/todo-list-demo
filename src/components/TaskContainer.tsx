import React from 'react'
import { FaPlus, FaRegPlusSquare } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'
import { readTasks } from '../services'
import DateToday from '../utils/date'
import Loading from './Loading'
import './styles/common.css'
import Task from './Task'
import ITask from './types/task'

const TaskContainer = () => {
  const [loading, setLoading] = React.useState(true)
  const [tasks, setTasks] = React.useState<Array<ITask>>([])
  const [editID, setEditID] = React.useState<string | null>(null)

  async function fetchData() {
    setLoading(true)
    try {
      const data = await readTasks()
      setTasks(data || [])
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false)
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  function handleAdd() {
    const taskToAdd = {
      id: uuidv4(),
      title: '',
      completed: false,
      status: 'Pending',
      priority: 'Normal',
      dueDate: DateToday,
      createdDate: DateToday,
      modifiedDate: DateToday,
    }
    tasks.unshift(taskToAdd)
    setTasks(tasks)
    setEditID(taskToAdd.id)
  }

  const escFunction = React.useCallback(
    ({ keyCode }) => {
      if (keyCode === 27) {
        const editTask = tasks.find((task) => task.id === editID)
        if (!editTask?.title) setTasks(tasks.filter((task) => task.id !== editID))
        setEditID(null)
      }
    },
    [tasks, editID, setEditID],
  )

  React.useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => document.removeEventListener('keydown', escFunction, false)
  }, [escFunction])

  let onHoldTasks: Array<ITask>
  let completedTasks: Array<ITask>
  if (tasks.length) {
    onHoldTasks = tasks.filter(({ completed }) => !completed)
    completedTasks = tasks.filter(({ completed }) => completed)
  } else {
    onHoldTasks = []
    completedTasks = []
  }

  return (
    <section className="container">
      <div className="flex flex-col items-center sm:flex-row">
        <h1 className="font-bold text-center my-4">
          You&apos;ve got{' '}
          <span className="text-secondary-500">
            {onHoldTasks.length || 'No'} task
            {onHoldTasks.length === 1 ? '' : 's'}
          </span>{' '}
          on hold
        </h1>
        <button type="button" className="round-btn fixed bottom-10 right-10 sm:hidden" onClick={handleAdd}>
          <FaPlus />
        </button>
        <button type="button" className="icon-btn mx-6 hidden sm:flex" onClick={handleAdd}>
          <FaRegPlusSquare />
          <span className="text-xs">&nbsp; Add New</span>
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="sub-container">
          <h3 className="my-4">On Hold</h3>
          <div>
            {onHoldTasks.map((task) => (
              <Task key={task.id} task={task} editID={editID} setEditID={setEditID} fetchData={fetchData} />
            ))}
          </div>
          <h3 className="my-4">Completed</h3>
          <div className="text-gray-300">
            {completedTasks.map((task) => (
              <Task key={task.id} task={task} editID={editID} setEditID={setEditID} fetchData={fetchData} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default TaskContainer
