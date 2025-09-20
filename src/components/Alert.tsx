import { AlertTriangle, CheckCircle, Info, OctagonAlert } from 'lucide-react'
import { HTMLAttributes, ReactNode } from 'react'

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  icon?: ReactNode
  children?: ReactNode
}

export const Alert = ({ title, icon, children, className, ...props }: AlertProps) => (
  <div
    className={`p-3 rounded-md flex flex-col gap-2 [&_p]:mb-0 [&_p]:text-sm mb-4 ${className}`}
    {...props}
  >
    {title && (
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-medium">{title}</h4>
      </div>
    )}
    {children && (
      <div className="text-sm leading-relaxed">{children}</div>
    )}
  </div>
)

export const InfoAlert = ({ title, children, className, ...props }: AlertProps) => (
  <Alert
    {...props}
    title={title}
    icon={<Info className="flex-shrink-0" size={18} />}
    className={`bg-blue-50 border-l-4 border-blue-400 text-blue-800 ${className || ''}`}
  >
    {children}
  </Alert>
)

export const WarningAlert = ({ title, children, className, ...props }: AlertProps) => (
  <Alert
    {...props}
    title={title}
    icon={<AlertTriangle className="flex-shrink-0" size={18} />}
    className={`bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 ${className || ''}`}
  >
    {children}
  </Alert>
)

export const SuccessAlert = ({ title, children, className, ...props }: AlertProps) => (
  <Alert
    {...props}
    title={title}
    icon={<CheckCircle className="flex-shrink-0" size={18} />}
    className={`bg-green-50 border-l-4 border-green-400 text-green-800 ${className || ''}`}
  >
    {children}
  </Alert>
)

export const DangerAlert = ({ title, children, className, ...props }: AlertProps) => (
  <Alert
    {...props}
    title={title}
    icon={<OctagonAlert className="flex-shrink-0" size={18} />}
    className={`bg-red-50 border-l-4 border-red-400 text-red-800 ${className || ''}`}
  >
    {children}
  </Alert>
)
