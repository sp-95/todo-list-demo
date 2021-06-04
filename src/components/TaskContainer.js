import React, { useEffect } from "react"
import "./task_container.css"
import Task from "./Task"
import Loading from "./Loading"
import { FaRegPlusSquare } from "react-icons/fa"
import { connect, useDispatch } from "react-redux"
import { fetchTasks, addTask } from "../redux"
import { v4 as uuidv4 } from "uuid"

const TaskContainer = ({ taskData, fetchTasks }) => {
  const { loading, tasks } = taskData
  const dispatch = useDispatch()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleAdd = () => {
    const newTask = {
      id: uuidv4(),
      title: "",
      completed: false,
      status: "Pending",
      priority: "Normal",
    }
    dispatch(addTask(newTask))
  }

  var onHoldTasks, completedTasks
  if (tasks.length) {
    onHoldTasks = tasks.filter(({ completed }) => !completed)
    completedTasks = tasks.filter(({ completed }) => completed)
  } else {
    onHoldTasks = []
    completedTasks = []
  }

  return (
    <section className="section-center">
      <div className="title">
        <h1>
          You've got{" "}
          <span className="num-tasks">
            {onHoldTasks.length || "No"} task
            {onHoldTasks.length === 1 ? "" : "s"}
          </span>{" "}
          on hold
        </h1>
        <button className="add-btn" onClick={handleAdd}>
          <FaRegPlusSquare />
          &nbsp; Add New
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="task-list">
          <h3>On Hold</h3>
          {onHoldTasks.map(task => (
            <Task key={task.id} {...task} />
          ))}
          <h3>Completed</h3>
          {completedTasks.map(task => (
            <Task key={task.id} {...task} />
          ))}
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
