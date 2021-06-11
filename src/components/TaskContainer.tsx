import React from 'react'
import { FaRegPlusSquare } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'
import { readTasks } from '../services'
import Loading from './Loading'
import './styles/task.css'
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
    <section className="task-container">
      <div className="title">
        <h1>
          You&apos;ve got{' '}
          <span className="num-tasks">
            {onHoldTasks.length || 'No'} task
            {onHoldTasks.length === 1 ? '' : 's'}
          </span>{' '}
          on hold
        </h1>
        <button type="button" className="add-btn" onClick={handleAdd}>
          <FaRegPlusSquare className="plus-sign" />
          <span>&nbsp; Add New</span>
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="task-list">
          <h3>On Hold</h3>
          {onHoldTasks.map((task) => (
            <Task key={task.id} task={task} editID={editID} setEditID={setEditID} fetchData={fetchData} />
          ))}
          <h3>Completed</h3>
          {completedTasks.map((task) => (
            <Task key={task.id} task={task} editID={editID} setEditID={setEditID} fetchData={fetchData} />
          ))}
        </div>
      )}
    </section>
  )
}

export default TaskContainer
