/**
 * Returns the number formatted for the browser's current language
 * @param number
 */
export const integerToLocaleString = (number: number | string) => {
  const locale = navigator.language || (navigator as any).userLanguage
  const castedValue = Number(number)

  return castedValue ? castedValue.toLocaleString(locale) : null
}

/**
 * Removes all non number characters from {@code maybeNumber}
 *
 * @param maybeNumber
 */
export const localeStringToInteger = (maybeNumber: string) => {
  return Number(maybeNumber?.replace(/\D/g, ''))
}
