import { useLayoutEffect, useEffect, useState } from 'react'
import { isBrowser } from 'utils/helpers'
import resolveConfig from 'tailwindcss/resolveConfig'
import config from '../tailwind.config.js'

const fullConfig = resolveConfig(config)

const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect

const getBreakpointValue = (value: string): number =>
  +fullConfig.theme.screens[value].slice(
    0,
    fullConfig.theme.screens[value].indexOf('px')
  )

export const useCurrentBreakpoint = () => {
  const [result, setResult] = useState('xs')

  const setCurrentBreakpoint = () => {
    let currentBreakpoint = 'xs'
    let biggestBreakpointValue = 0
    for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
      const breakpointValue = getBreakpointValue(breakpoint)
      if (
        breakpointValue > biggestBreakpointValue &&
        window.innerWidth >= breakpointValue
      ) {
        biggestBreakpointValue = breakpointValue
        currentBreakpoint = breakpoint
      }
    }
    setResult(currentBreakpoint)
  }

  useIsomorphicEffect(() => {
    if (!isBrowser) return

    setCurrentBreakpoint()
    window.addEventListener('resize', setCurrentBreakpoint)
    return () => window.removeEventListener('resize', setCurrentBreakpoint)
  }, [])

  return result
}

export const useIsMobile = () => ['xs', 'sm'].includes(useCurrentBreakpoint())
