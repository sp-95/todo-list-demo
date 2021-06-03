import React, { useState, useEffect } from "react"
import "./task_container.css"
import TaskList from "./TaskList"
import Loading from "./Loading"

const url = "http://localhost:8000/tasks"

const TaskContainer = () => {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])

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

  return (
    <section className="task-container">
      <h1>
        You've got{" "}
        <span className="num-tasks">
          {tasks.length} task{tasks.length > 1 ? "s" : ""}
        </span>{" "}
        today
      </h1>
      <form className="add-task" onSubmit={() => alert("Submitted")}>
        <div className="form-control">
          <input type="text" className="task" placeholder="Add Task Details" />
          <button className="add-btn">Add</button>
        </div>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <div className="task-list">
          <h3>On Hold</h3>
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
