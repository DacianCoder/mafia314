export const getCookieSliceOr = (slice: string, defaultValue: any = null) => {
  try {
    return JSON.parse(localStorage.getItem(slice) || '')
  } catch (e) {
    return defaultValue
  }
}
