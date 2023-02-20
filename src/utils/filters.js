const dayjs = require('dayjs')

const filterTimes = (val, format = 'YYYY-MM-DD') => {
  if (!isNull(val)) {
    return dayjs(val).format(format)
  } else {
    return '--'
  }
}

export const isNull = (date) => {
  if (!date) return true
  if (JSON.stringify(date) === '{}') return true
  if (JSON.stringify(date) === '[]') return true
  return false
}

export default app => {
  app.config.globalProperties.$filters = {
    filterTimes
  }
}
