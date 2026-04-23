import { Component, ReactNode } from 'react'

type TProps = {
  children: ReactNode
}

type TState = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): TState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-white text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-dark-text mb-6">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button
              onClick={this.handleReset}
              className="bg-brand text-black font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
