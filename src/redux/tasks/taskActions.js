import axios from "axios"
import taskActionTypes from "./taskConstants"

const url = "http://localhost:8000/tasks"

export const fetchTasks = () => {
  return async dispatch => {
    dispatch(loading())
    try {
      const { data } = await axios.get(url)
      dispatch(fetchSuccess(data))
    } catch (error) {
      dispatch(fetchFailed(error.message))
    }
  }
}

const loading = () => {
  return {
    type: taskActionTypes.LOADING,
  }
}

const fetchSuccess = tasks => {
  return {
    type: taskActionTypes.SUCCESS,
    payload: tasks,
  }
}

const fetchFailed = error => {
  return {
    type: taskActionTypes.FAILURE,
    payload: error,
  }
}

export const addTask = task => {
  return {
    type: taskActionTypes.ADD,
    payload: task,
  }
}

export const deleteTask = id => {
  return async dispatch => {
    try {
      await axios.delete(`${url}/${id}`)
      dispatch(deleteTaskState(id))
    } catch (error) {
      dispatch(deleteFailed(error.message))
    }
  }
}

export const deleteTaskState = id => {
  return {
    type: taskActionTypes.DELETE,
    payload: id,
  }
}

const deleteFailed = error => {
  return {
    type: taskActionTypes.DELETE_FAILURE,
    payload: error,
  }
}

const postTask = task => {
  return async dispatch => {
    try {
      const { data } = await axios.post(url, task)
      dispatch(editTaskState(data))
    } catch (error) {
      dispatch(editFailed(error.message))
    }
  }
}

export const editTask = task => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`${url}/${task.id}`, task)
      dispatch(editTaskState(data))
    } catch (error) {
      if (error.response.status === 404) dispatch(postTask(task))
      else dispatch(editFailed(error.message))
    }
  }
}

export const editing = id => {
  return {
    type: taskActionTypes.EDITING,
    payload: id,
  }
}

export const editTaskState = task => {
  return {
    type: taskActionTypes.EDIT,
    payload: task,
  }
}

const editFailed = error => {
  return {
    type: taskActionTypes.EDIT_FAILURE,
    payload: error,
  }
}
