import { ReactNode } from 'react'
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react'

interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  onClose?: () => void
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    titleColor: 'text-green-800',
    messageColor: 'text-green-700'
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    titleColor: 'text-red-800',
    messageColor: 'text-red-700'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-800',
    messageColor: 'text-yellow-700'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    messageColor: 'text-blue-700'
  }
}

export default function Notification({ 
  type, 
  title, 
  message, 
  onClose, 
  action, 
  className = '' 
}: NotificationProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div className={`rounded-xl border p-4 shadow-sm ${config.bgColor} ${config.borderColor} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${config.iconColor}`} />
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${config.titleColor}`}>
            {title}
          </h3>
          {message && (
            <div className={`mt-1 text-sm ${config.messageColor}`}>
              {message}
            </div>
          )}
          {action && (
            <div className="mt-3">
              <button
                onClick={action.onClick}
                className={`text-sm font-medium ${config.iconColor} hover:opacity-80 transition-opacity`}
              >
                {action.label} →
              </button>
            </div>
          )}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`text-sm ${config.iconColor} hover:opacity-80 transition-opacity`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
