import { CANVAS_WIDTH, CANVAS_HEIGHT } from 'shared/constants'

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function getWidthHeightPercentages(w = 0, h = 0) {
  return {
    height: `${(h / CANVAS_HEIGHT) * 100}%`,
    width: `${(w / CANVAS_WIDTH) * 100}%`,
  }
}
