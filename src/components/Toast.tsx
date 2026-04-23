import { cn } from '@/utils/cn'
import { type TToast } from '@/store/useToastStore'

type TProps = {
  toast: TToast
  onDismiss: (id: string) => void
}

export const Toast = ({ toast, onDismiss }: TProps) => {
  const bgColor = toast.type === 'success' ? 'bg-brand' : 'bg-red'
  const textColor = toast.type === 'success' ? 'text-black' : 'text-white'

  return (
    <div
      className={cn(
        'px-4 py-3 rounded-md font-semibold text-sm animate-in fade-in slide-in-from-bottom-4 duration-300',
        bgColor,
        textColor,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{toast.message}</span>
        <button
          onClick={() => onDismiss(toast.id)}
          className="text-lg leading-none opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    </div>
  )
}
