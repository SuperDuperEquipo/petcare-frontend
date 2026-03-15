import api from "../api/axiosClient"
import type { User } from "../types"

interface UsersResponse {
  users: User[]
  total: number
}

export const getUsers = async (): Promise<UsersResponse> => {
  const response = await api.get("/admin/users")
  return response.data
}

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/admin/users/${id}`)
  return response.data
}