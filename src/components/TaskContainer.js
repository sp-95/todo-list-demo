import React, { useState, useEffect } from "react"
import "./task_container.css"
import TaskList from "./TaskList"
import Loading from "./Loading"
import { FaPlusSquare } from "react-icons/fa"
import { connect, useDispatch } from "react-redux"
import { fetchTasks } from "../redux"
import { addTask } from "../redux"

const TaskContainer = ({ taskData, fetchTasks }) => {
  const dispatch = useDispatch()

  const { loading, tasks } = taskData
  const [newTask, setNewTask] = useState(false)
  const [task, setTask] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAdd = e => {
    e.preventDefault()

    dispatch(addTask(task))
    setTask("")
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

const mapStateToProps = state => {
  return {
    taskData: state.task,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)
