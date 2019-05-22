const mask = (mask, value) => {
  if (!mask || typeof mask !== 'string') return value
  if (typeof value !== 'string') throw new Error('The value to mask must be a string')

  let index = 0
  let buffer = ''

  const matches = (isMatch, value) => {
    if (isMatch) {
      index++
      const ret = buffer + value
      buffer = ''

      return ret;
    }

    return ''
  }

  const getMaskedChar = index => mask.length > index && mask[index]

  const escapeChar = char => {
    if ('\\' === char) {
      buffer += getMaskedChar(++index)
      return escapeChar(getMaskedChar(++index))
    } else if (!/[0ac*]/i.test(char)) {
      buffer += char
      return escapeChar(getMaskedChar(++index))
    }

    return char
  }

  const getChar = index => escapeChar(getMaskedChar(index))

  return value.split('').map(v => {
    let char = getChar(index)
    if (false === char) return matches(true, '')

    switch (char) {
      case '0':
        return matches(!isNaN(v), v)
      case 'a':
      case 'A':
        return matches(/[a-z]/i.test(v), v)
      case 'C':
        return matches(/[A-Z]/.test(v), v)
      case 'c':
        return matches(/[a-z]/.test(v), v)
      case '*':
        return matches(true, v)
    }
  }).join('').trim()
}

export default mask