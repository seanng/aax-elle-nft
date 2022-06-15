import { HERO_CANVAS_WIDTH, HERO_CANVAS_HEIGHT } from 'shared/constants'

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function getWidthHeightPercentages(
  w = 0,
  h = 0,
  cvWidth = HERO_CANVAS_WIDTH,
  cvHeight = HERO_CANVAS_HEIGHT
) {
  return {
    height: `${(h / cvHeight) * 100}%`,
    width: `${(w / cvWidth) * 100}%`,
  }
}
