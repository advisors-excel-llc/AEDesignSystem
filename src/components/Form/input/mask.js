const mask = (mask, value) => {
  let newVal = ''
  let index = 0

  for (let i in mask) {
    if (index >= value.length) {
      break
    }

    let char = mask[i]
    if (char === '0') {
      newVal += !isNaN(value[index]) && value[index] || ''
      index++
    } else if (char === 'a') {
      newVal += isNaN(value[index]) && value[index] || ''
      index++
    } else if (char === '*') {
      newVal += value[index] || ''
      index++
    } else {
      newVal += char
      if (value[i] === char) {
        index++
      }
    }
  }

  if (value.length > mask.length) {
    newVal += value.substr(mask.length)
  }

  return newVal
}

export default mask