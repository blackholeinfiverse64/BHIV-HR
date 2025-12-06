import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef(({ className, variant = 'neo', ...props }, ref) => {
  const variants = {
    neo: 'rounded-2xl bg-card text-card-foreground shadow-[8px_8px_16px_hsl(220_13%_85%),-8px_-8px_16px_hsl(0_0%_100%)] dark:shadow-[10px_10px_20px_hsl(0_0%_3%),-10px_-10px_20px_hsl(0_0%_15%)] transition-all duration-300 hover:scale-[1.02] border border-border/30',
    glass: 'rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-2 border-gray-300/50 dark:border-gray-600/50 shadow-2xl transition-all duration-300',
    gradient: 'rounded-2xl bg-gradient-to-br from-card to-card/50 shadow-xl border border-border/50 transition-all duration-300',
    flat: 'rounded-2xl bg-card text-card-foreground border border-border/50 transition-all duration-300',
  }

  return (
    <div
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    />
  )
})
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-heading text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
