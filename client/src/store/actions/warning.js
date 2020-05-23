// ACTION TYPES
export const SHOW_WARNING = 'SHOW_WARNING'
export const CLEAR_WARNING = 'CLEAR_WARNING'

// ACTION CREATOR
export const showWarning = msg => ({type: SHOW_WARNING, msg})
export const clearWarning = () => ({type: CLEAR_WARNING})