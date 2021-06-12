import ITask from '../components/types/task'
import axiosInstance from '../utils/axios'

export async function createTask(task: ITask) {
  const { data } = await axiosInstance({
    url: '/tasks',
    method: 'POST',
    data: task,
  })
  return data
}

export async function readTask(id: string) {
  const { data } = await axiosInstance({ url: `/tasks/${id}` })
  return data
}

export async function readTasks() {
  const { data } = await axiosInstance({ url: '/tasks' })
  return data
}

export async function updateTask(task: ITask) {
  const { data } = await axiosInstance({
    url: `/tasks/${task.id}`,
    method: 'PUT',
    data: task,
  })
  return data
}

export async function deleteTask(id: string) {
  const { data } = await axiosInstance({
    url: `/tasks/${id}`,
    method: 'DELETE',
  })
  return data
}
