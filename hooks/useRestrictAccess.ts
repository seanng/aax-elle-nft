import axios from 'lib/axios'
import { useEffect, useState } from 'react'

export function useRestrictAccess() {
  const [canAccess, setCanAccess] = useState(false)

  const togglePrompt = async () => {
    const password = prompt('Please enter the password')
    try {
      await axios.post('/api/admin', { password })
      setCanAccess(true)
    } catch (error) {
      togglePrompt()
    }
  }

  useEffect(() => {
    togglePrompt()
  }, [])

  return canAccess
}
