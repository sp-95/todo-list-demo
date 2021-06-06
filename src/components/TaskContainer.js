import React, { useState, useEffect, useCallback } from "react"
import "./task_container.css"
import Task from "./Task"
import Loading from "./Loading"
import { FaRegPlusSquare } from "react-icons/fa"
import { readTasks } from "../services"
import { v4 as uuidv4 } from "uuid"

const TaskContainer = () => {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [editID, setEditID] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await readTasks()
      setTasks(data || [])
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false)
  }

  useEffect(() => fetchData(), [])

  const handleAdd = () => {
    const taskToAdd = {
      id: uuidv4(),
      title: "",
      completed: false,
      status: "Pending",
      priority: "Normal",
    }
    tasks.unshift(taskToAdd)
    setTasks(tasks)
    setEditID(taskToAdd.id)
  }

  const escFunction = useCallback(
    ({ keyCode }) => {
      if (keyCode === 27) {
        const editTask = tasks.find(task => task.id === editID)
        if (!editTask.title) setTasks(tasks.filter(task => task.id !== editID))
        setEditID(null)
      }
    },
    [tasks, editID, setEditID]
  )

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)

    return () => document.removeEventListener("keydown", escFunction, false)
  }, [escFunction])

  var onHoldTasks, completedTasks
  if (tasks.length) {
    onHoldTasks = tasks.filter(({ completed }) => !completed)
    completedTasks = tasks.filter(({ completed }) => completed)
  } else {
    onHoldTasks = []
    completedTasks = []
  }

  const context = {
    editID: editID,
    setEditID: setEditID,
    fetchData: fetchData,
  }

  return (
    <section className="task-container">
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
            <Task key={task.id} task={task} {...context} />
          ))}
          <h3>Completed</h3>
          {completedTasks.map(task => (
            <Task key={task.id} task={task} {...context} />
          ))}
        </div>
      )}
    </section>
  )
}

export default TaskContainer
