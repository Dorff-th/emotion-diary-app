import axiosInstance from './axiosInstance'

export const createDailyLog = (data) => {
  return axiosInstance.post('/daily-log', data)
}

export const getTodayLogs = () => {
  return axiosInstance.get('/daily-logs/today')
}

export const getLogsByDate = (date) => {
  return axiosInstance.get(`/daily-logs/date?date=${date}`)
}

export const getSummaryByDate = (date) => {
  return axiosInstance.get(`/daily-log/summary?date=${date}`)
}
