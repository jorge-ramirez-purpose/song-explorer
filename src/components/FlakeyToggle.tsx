import { useEffect, useState } from 'react'

export const FlakeyToggle = () => {
  const [isFlakey, setIsFlakey] = useState(false)

  useEffect(() => {
    fetch('/flaky')
      .then((response) => response.json())
      .then((data) => setIsFlakey(data.isFlakey))
      .catch(() => {})
  }, [])

  const toggle = () => {
    fetch('/flaky', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => setIsFlakey(data.isFlakey))
      .catch(() => {})
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 text-xs font-semibold px-3 py-2 rounded-full border transition-colors"
      style={{
        borderColor: isFlakey ? '#dc001c' : '#6fc13e',
        color: isFlakey ? '#dc001c' : '#6fc13e',
      }}
    >
      API: {isFlakey ? 'Flakey' : 'Stable'}
    </button>
  )
}
