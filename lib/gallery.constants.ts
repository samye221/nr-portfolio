export const GALLERY = {
  CONTAINER_WIDTH: '90vw',
  CONTAINER_MAX_WIDTH: 1600,
  CONTAINER_HEIGHT: '85vh',
  PRELOAD_COUNT: 3,
  get SIZES_BREAKPOINT() {
    return Math.round(this.CONTAINER_MAX_WIDTH / 0.9)
  },
  get SIZES() {
    return `(max-width: ${this.SIZES_BREAKPOINT}px) ${this.CONTAINER_WIDTH}, ${this.CONTAINER_MAX_WIDTH}px`
  },
} as const

export const LAYOUT = {
  HEADER_HEIGHT: 80,
  SCROLL_TOLERANCE: 10,
  FADE_DURATION: 200,
} as const

export const ELEMENT_IDS = {
  SELECTED_IMAGE: 'selected-image',
  PROJECT_GRID: 'project-grid',
  PORTFOLIO_GRID: 'portfolio-grid',
} as const
