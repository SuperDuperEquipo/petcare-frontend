import api from "../api/axiosClient"
import type { Tip } from "../types"

export const getTips = async (): Promise<Tip[]> => {
  const response = await api.get("/tips")
  return response.data.tips
}

export const createTip = async (tipData: {
  title: string
  content: string
  species: string
  category: string
}) => {
  const response = await api.post("/tips", tipData)
  return response.data.tip
}