import Axios from 'axios'

const axios =
  typeof window !== 'undefined'
    ? Axios
    : Axios.create({
        baseURL: process.env.NEXT_PUBLIC_SITE_URL,
      })

export default axios
