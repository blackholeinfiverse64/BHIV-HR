import { forwardRef } from 'react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`flex h-12 w-full rounded-xl border-2 ${
              error ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
            } bg-background ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3 text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${
              error ? 'focus:ring-destructive/20' : 'focus:ring-primary/20'
            } placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export default FormInput
