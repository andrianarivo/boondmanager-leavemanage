export function parseFloatOrZero(value: string | undefined) {
  const cleanVal = value?.replace(',', '.')
  return parseFloat(cleanVal || '0')
}
