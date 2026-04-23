import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

type TProps = {
  onIntersect: () => void
}

export const InfiniteScrollSentinel = ({ onIntersect }: TProps) => {
  const reference = useIntersectionObserver(onIntersect, { rootMargin: '100px' })
  return <div ref={reference} className="h-4" />
}
