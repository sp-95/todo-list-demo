import axiosInstance from "../lib/axios"

export const createTask = async task => {
  const { data } = await axiosInstance({
    url: "/tasks",
    method: "POST",
    data: task,
  })
  return data
}

export const readTask = async id => {
  const { data } = await axiosInstance({ url: `/tasks/${id}` })
  return data
}

export const readTasks = async () => {
  const { data } = await axiosInstance({ url: "/tasks" })
  return data
}

export const updateTask = async task => {
  const { data } = await axiosInstance({
    url: `/tasks/${task.id}`,
    method: "PUT",
    data: task,
  })
  return data
}

export const deleteTask = async id => {
  const { data } = await axiosInstance({
    url: `/tasks/${id}`,
    method: "DELETE",
  })
  return data
}
