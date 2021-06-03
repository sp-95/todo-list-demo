import TaskList from "./TaskList"
import "./task_container.css"

const TaskContainer = () => {
  return (
    <section className="task-container">
      <h1>
        You've got <span className="num-tasks">7 tasks</span> today
      </h1>
      <form className="add-task" onSubmit={() => alert("Submitted")}>
        <div className="form-control">
          <input type="text" className="task" placeholder="Add Task Details" />
          <button className="add-btn">Add</button>
        </div>
      </form>
      <div className="task-list">
        <TaskList />
      </div>
    </section>
  )
}

export default TaskContainer
