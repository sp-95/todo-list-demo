import React, { useEffect } from "react"
import "./task_container.css"
import Task from "./Task"
import Loading from "./Loading"
import { FaPlusSquare } from "react-icons/fa"
import { connect, useDispatch } from "react-redux"
import { fetchTasks, addTask } from "../redux"

const TaskContainer = ({ taskData, fetchTasks }) => {
  const { loading, tasks } = taskData
  const dispatch = useDispatch()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleAdd = () => {
    const newTask = {
      id: Date.now(),
      title: "",
      completed: false,
      status: "Pending",
      priority: "Normal",
    }
    dispatch(addTask(newTask))
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
        <button className="add-btn" onClick={handleAdd}>
          <FaPlusSquare /> Add New
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="task-list">
          <h3>On Hold</h3>
          {tasks.length
            ? tasks
                .filter(({ completed }) => !completed)
                .map(task => <Task key={task.id} {...task} />)
            : ""}
          <h3>Completed</h3>
          {tasks.length
            ? tasks
                .filter(({ completed }) => completed)
                .map(task => <Task key={task.id} {...task} />)
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
