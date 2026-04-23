import { create } from 'zustand'

export type TToast = {
  id: string
  message: string
  type: 'success' | 'error'
}

type TToastStore = {
  toasts: TToast[]
  addToast: (message: string, type: TToast['type'], duration?: number) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<TToastStore>((set) => ({
  toasts: [],

  addToast: (message, type, duration = 3000) => {
    const id = Math.random().toString(36).slice(2)
    const toast: TToast = { id, message, type }

    set((state) => ({ toasts: [...state.toasts, toast] }))

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
      }, duration)
    }
  },

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
