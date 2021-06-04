import axiosInstance from "../lib/axios"

export const fetchTasks = async () => {
  try {
    const { data } = await axiosInstance({ url: "/tasks" })
    return data
  } catch (error) {
    throw error
  }
}
