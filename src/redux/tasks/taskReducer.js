import taskActionTypes from "./taskConstants"

const initialState = {
  loading: false,
  tasks: [],
  error: "",
  editID: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case taskActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      }
    case taskActionTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: "",
      }
    case taskActionTypes.FAILURE:
      return {
        ...state,
        loading: false,
        tasks: [],
        error: action.payload,
      }
    case taskActionTypes.ADD:
      const tasks = state.tasks
      state.tasks.unshift(action.payload)
      return {
        ...state,
        tasks: tasks,
        editID: action.payload.id,
      }
    case taskActionTypes.DELETE:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      }
    case taskActionTypes.DELETE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case taskActionTypes.EDITING:
      return {
        ...state,
        editID: action.payload,
      }
    case taskActionTypes.EDIT:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
        editID: null,
        error: "",
      }
    case taskActionTypes.EDIT_FAILURE:
      return {
        ...state,
        editID: null,
        error: action.payload,
      }
    default:
      return state
  }
}

export default reducer
