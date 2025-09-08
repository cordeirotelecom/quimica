interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red'
  text?: string
  fullScreen?: boolean
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'blue', 
  text = 'Carregando...', 
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const colorClasses = {
    blue: 'border-blue-600',
    purple: 'border-purple-600',
    green: 'border-green-600',
    orange: 'border-orange-600',
    red: 'border-red-600'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}></div>
        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-gray-200 border-t-transparent rounded-full animate-ping opacity-20`}></div>
      </div>
      {text && (
        <div className={`${textSizeClasses[size]} font-medium text-gray-700 animate-pulse`}>
          {text}
        </div>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}
