import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'link' | 'outline' | 'file' | 'send'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseStyles =
      'cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      default: 'bg-[#333333] text-white hover:bg-[#444444] focus-visible:ring-[#555555]',
      primary: 'bg-[var(--primary)] text-white hover:bg-[#059669] focus-visible:ring-[var(--primary)]',
      secondary: 'bg-[#222222] text-white hover:bg-[#333333] border border-[#333333]',
      ghost: 'hover:bg-[#222222] text-white cursor-pointer',
      link: 'underline-offset-4 hover:underline text-white',
      outline: 'border border-[var(--primary)]/50 bg-transparent text-white hover:bg-[#222222]',
      file: 'w-9 h-9 rounded-full bg-[#333333] hover:bg-[#444444] p-0',
      send: 'w-9 h-9 rounded-full bg-[#333333] hover:bg-[#444444] p-0'
    }

    const sizes = {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 rounded-md',
      lg: 'h-11 px-8 rounded-md',
      icon: 'h-10 w-10'
    }

    const variantStyle = variants[variant] || variants.default
    const sizeStyle = sizes[size] || sizes.default

    return (
      <button
        className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', ...props }, ref) => {
    const baseStyles =
      'flex w-full rounded-md border border-[#333333] bg-[#222222] px-3 py-2 text-sm text-white placeholder:text-[#888888] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#555555] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'

    return <input type={type} className={`${baseStyles} ${className}`} ref={ref} {...props} />
  }
)

Input.displayName = 'Input'

// Card Component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-white shadow-sm ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-2xl font-semibold leading-none tracking-tight text-white ${className}`}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <p ref={ref} className={`text-sm text-[#888888] ${className}`} {...props}>
      {children}
    </p>
  )
})

CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

// Badge Component
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'online' | 'offline'
  children?: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'

    const variants = {
      default: 'border-transparent bg-[#333333] text-white hover:bg-[#444444]',
      secondary: 'border-transparent bg-[#222222] text-white hover:bg-[#333333]',
      destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
      outline: 'text-white border-[#333333]',
      online: 'border-transparent bg-[var(--primary)] text-white',
      offline: 'border-transparent bg-[#6b7280] text-white'
    }

    const variantStyle = variants[variant] || variants.default

    return (
      <div ref={ref} className={`${baseStyles} ${variantStyle} ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

// Export components

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, ...props }, ref) => {
    const baseStyles =
      'flex w-full rounded-md border border-[#333333] bg-[#222222] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#555555] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'

    return (
      <select ref={ref} className={`${baseStyles} ${className}`} {...props}>
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'

interface SwitcherProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switcher = React.forwardRef<HTMLButtonElement, SwitcherProps>(
  ({ className = '', checked = false, onCheckedChange, ...props }, ref) => {
    const baseStyles =
      'relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#555555] disabled:opacity-50 disabled:pointer-events-none'
    const bg = checked ? 'bg-[#10b981]' : 'bg-[#333333]'
    const knob = 'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
    const knobPos = checked ? 'translate-x-6' : 'translate-x-1'

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        ref={ref}
        className={`${baseStyles} ${bg} ${className}`}
        onClick={() => onCheckedChange?.(!checked)}
        {...props}
      >
        <span className={`${knob} ${knobPos}`} />
      </button>
    )
  }
)

Switcher.displayName = 'Switcher'

interface UrlHighlightProps {
  url: string
  className?: string
}
const UrlHighlight = React.forwardRef<HTMLDivElement, UrlHighlightProps>(
  ({ url, className = '' }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }

    const baseStyles =
      'flex items-center bg-[#1a1a1a] border border-[#333333] rounded-md px-3 py-2 gap-2'

    return (
      <div ref={ref} className={`${baseStyles} ${className}`}>
        <code className="flex-1 text-sm font-mono text-[#10b981] bg-transparent border-none outline-none">
          {url}
        </code>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-6 px-2 text-xs hover:bg-[#333333]"
        >
          {copied ? '✓' : '📋'}
        </Button>
      </div>
    )
  }
)

UrlHighlight.displayName = 'UrlHighlight'

// Radio Component
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className = '', label, description, id, ...props }, ref) => {
    const baseStyles =
      'w-4 h-4 text-[var(--primary)] bg-[var(--bg-d-color)] border-[var(--border-color)] focus:ring-[var(--primary)] appearance-none rounded-full relative before:content-[""] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-[var(--primary)] before:rounded-full before:opacity-0 checked:before:opacity-100'

    return (
      <div className="flex items-center gap-3">
        <input
          type="radio"
          ref={ref}
          id={id}
          className={`${baseStyles} ${className}`}
          {...props}
        />
        {label && (
          <div className="flex-1">
            <label htmlFor={id} className="text-sm text-white cursor-pointer">
              {label}
            </label>
            {description && (
              <p className="text-xs text-[#888888] mt-1">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

export {
  Switcher,
  Select,
  Button,
  UrlHighlight,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Radio
}
