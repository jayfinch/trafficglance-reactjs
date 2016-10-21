export default function fetchJsonp (url) {
  const success = {
    ok: true,
    json: () => {
      return {}
    }
  }

  return new Promise((resolve, reject) => {
    process.nextTick(
      () => url === 'success-url' ? resolve(success) : reject(Error('bad-response'))
    )
  })
}
