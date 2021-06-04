import axios from "axios"

const url = "http://localhost:8000/tasks"

export const fetchTasks = () => {
  return dispatch => {
    dispatch(loading())
    axios
      .get(url)
      .then(response => {
        const data = response.data
        dispatch(fetchSuccess(data))
      })
      .catch(error => {
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
  return dispatch => {
    axios
      .delete(url + "/" + id)
      .then(() => {
        dispatch(deleteSuccess(id))
      })
      .catch(error => {
        dispatch(deleteFailed(error.message))
      })
  }
}

const deleteSuccess = id => {
  return {
    type: "DELETE",
    payload: id,
  }
}

const deleteFailed = error => {
  return {
    type: "DELETE_FAILURE",
    payload: error,
  }
}

export const editTask = task => {
  return dispatch => {
    axios
      .put(url + "/" + task.id, task)
      .then(response => {
        const data = response.data
        dispatch(editSuccess(data))
      })
      .catch(error => {
        if (error.response.status === 404) {
          axios
            .post(url, task)
            .then(response => {
              const data = response.data
              dispatch(editSuccess(data))
            })
            .catch(error => {
              dispatch(editFailed(error.message))
            })
        } else dispatch(editFailed(error.message))
      })
  }
}

export const editing = id => {
  return {
    type: "EDITING",
    payload: id,
  }
}

const editSuccess = task => {
  return {
    type: "EDIT",
    payload: task,
  }
}

const editFailed = error => {
  return {
    type: "EDIT_FAILURE",
    payload: error,
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
