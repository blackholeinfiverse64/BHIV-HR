import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95',
        secondary:
          'bg-secondary text-secondary-foreground hover:shadow-xl hover:shadow-secondary/30 hover:scale-105 active:scale-95',
        destructive:
          'bg-destructive text-destructive-foreground hover:shadow-xl hover:shadow-destructive/30 hover:scale-105 active:scale-95',
        outline:
          'border-2 border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent/50 hover:scale-105 active:scale-95',
        ghost:
          'hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95',
        link: 'text-primary underline-offset-4 hover:underline',
        success:
          'bg-success text-success-foreground hover:shadow-xl hover:shadow-success/30 hover:scale-105 active:scale-95',
        warning:
          'bg-warning text-warning-foreground hover:shadow-xl hover:shadow-warning/30 hover:scale-105 active:scale-95',
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
