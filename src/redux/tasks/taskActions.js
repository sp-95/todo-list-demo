import axios from "axios"

const url = "http://localhost:8000/tasks"

export const fetchTasks = () => {
  return dispatch => {
    dispatch(loading())
    axios
      .get(url)
      .then(response => {
        // response.data is the users
        const data = response.data
        dispatch(fetchSuccess(data))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchFailed(error.message))
      })
  }
}

const loading = () => {
  return {
    type: "LOADING",
  }
}

const fetchSuccess = tasks => {
  return {
    type: "SUCCESS",
    payload: tasks,
  }
}

const fetchFailed = error => {
  return {
    type: "FAILURE",
    payload: error,
  }
}

export const addTask = task => {
  return {
    type: "ADD",
    payload: task,
  }
}

export const deleteTask = id => {
  return {
    type: "DELETE",
    payload: id,
  }
}

export const setCompleted = (id, completed) => {
  return {
    type: "COMPLETED",
    payload: {
      id: id,
      completed: completed,
    },
  }
}
