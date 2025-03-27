import axios from 'axios'

const axiosInstance = axios.create({
  httpsAgent: new (require('https').Agent)({
    rejectUnauthorized: false // Ignore SSL verification
  }),
  headers: {
    machineid: '15a5fa0cbe6346248b14040169d69096'
  }
})

export const fetchEvents = async () => {
  try {
    const response = await axiosInstance.post(
      'https://devapi.taxmann.dev/learning/api/v1/list/eventIndexList',
      {
        category: [],
        size: 12,
        sort: 'default',
        page: 1,
        filterByDate: false,
        fromDate: '',
        currency_code: 'INR',
        toDate: '',
        type: 'past'
      }
    )
    return response.data
  } catch (error) {
    console.error('Main Process API Error:', error)
    throw error
  }
}
