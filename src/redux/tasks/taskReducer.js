const initialState = {
  loading: false,
  tasks: [],
  error: "",
  editID: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      }
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: "",
      }
    case "FAILURE":
      return {
        ...state,
        loading: false,
        tasks: [],
        error: action.payload,
      }
    case "ADD":
      const tasks = state.tasks
      state.tasks.unshift(action.payload)
      return {
        ...state,
        tasks: tasks,
        editID: action.payload.id,
      }
    case "DELETE":
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      }
    case "EDIT":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
        editID: null,
      }
    case "EDITING":
      return {
        ...state,
        editID: action.payload,
      }
    case "COMPLETED":
      const { id, completed } = action.payload
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === id ? { ...task, completed: completed } : task
        ),
      }
    default:
      return state
  }
}

export default reducer
