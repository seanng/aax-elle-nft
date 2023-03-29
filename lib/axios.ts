import Axios from 'axios'

const axios =
  typeof window !== 'undefined'
    ? Axios
    : Axios.create({
        // TODO: revert commit to use localhost:3000
        baseURL: process.env.NEXT_PUBLIC_SITE_URL,
      })

export default axios
