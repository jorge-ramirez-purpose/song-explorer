import { useEffect, useRef } from 'react'

export const useIntersectionObserver = (
  onIntersect: () => void,
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onIntersect()
    }, options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [onIntersect, options])

  return ref
}
