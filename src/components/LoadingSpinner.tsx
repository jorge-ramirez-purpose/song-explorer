type TProps = {
  size?: 'small' | 'large'
}

export const LoadingSpinner = ({ size = 'large' }: TProps) => {
  const sizeClasses = size === 'small' ? 'h-4 w-4 border' : 'h-8 w-8 border-2'
  const paddingClasses = size === 'small' ? 'py-2' : 'py-8'

  return (
    <div className={`flex justify-center items-center ${paddingClasses}`}>
      <div className={`animate-spin rounded-full ${sizeClasses} border-dark-border border-t-brand`} />
    </div>
  )
}
