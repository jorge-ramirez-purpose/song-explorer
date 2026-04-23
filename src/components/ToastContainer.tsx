import { useToastStore } from '@/store/useToastStore'
import { Toast } from '@/components/Toast'

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onDismiss={removeToast} />
        </div>
      ))}
    </div>
  )
}
