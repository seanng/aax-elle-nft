import axios from 'lib/axios'

export async function getRandomImage() {
  const { data } = await axios.get('/api/image')
  return data
}
