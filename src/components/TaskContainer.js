import React, { useState, useEffect } from "react"
import "./task_container.css"
import TaskList from "./TaskList"
import Loading from "./Loading"
import { FaPlusSquare } from "react-icons/fa"

const url = "http://localhost:8000/tasks"

const TaskContainer = () => {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState(false)
  const [task, setTask] = useState("")

  const fetchData = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data) {
        setTasks(data)
      } else {
        setTasks([])
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAdd = e => {
    e.preventDefault()

    const taskToAdd = {
      id: Date.now(),
      title: task,
      completed: false,
      status: "Pending",
      priority: "Normal"
    }
    setNewTask(tasks.unshift(taskToAdd))
    console.log("Task Added")

    setNewTask(false)
  }

  return (
    <section className="task-container">
      <div className="title">
        <h1>
          You've got{" "}
          <span className="num-tasks">
            {tasks.length || "No"} task{tasks.length === 1 ? "" : "s"}
          </span>{" "}
          today
        </h1>
        <button className="add-btn" onClick={() => setNewTask(true)}>
          <FaPlusSquare /> Add New
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="task-list">
          <h3>On Hold</h3>
          {newTask ? (
            <form className="add-task" onSubmit={handleAdd}>
              <input
                type="text"
                className="task"
                placeholder="Create a new task"
                value={task}
                onChange={({ target }) => setTask(target.value)}
              />
            </form>
          ) : (
            ""
          )}
          {tasks.length
            ? tasks
                .filter(({ completed }) => !completed)
                .map(task => <TaskList key={task.id} {...task} />)
            : ""}
          <h3>Completed</h3>
          {tasks.length
            ? tasks
                .filter(({ completed }) => completed)
                .map(task => <TaskList key={task.id} {...task} />)
            : ""}
        </div>
      )}
    </section>
  )
}

export default TaskContainer
