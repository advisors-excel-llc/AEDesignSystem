export function wait(seconds) {
  return new Promise((res) => {
    setTimeout(res, seconds)
  })
}