const initialState = {
  loading: false,
  tasks: [],
  error: "",
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
        loading: false,
        tasks: action.payload,
        error: "",
      }
    case "FAILURE":
      return {
        loading: false,
        tasks: [],
        error: action.payload,
      }
    case "ADD":
      const tasks = state.tasks
      state.tasks.unshift({
        id: Date.now(),
        title: action.payload,
        completed: false,
        status: "Pending",
        priority: "Normal",
      })
      return {
        ...state,
        tasks: tasks,
      }
    default:
      return state
  }
}

export default reducer
