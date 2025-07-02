
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-250 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-dental-primary to-dental-primary-dark text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-red text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5",
        outline:
          "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 shadow-button hover:shadow-button-hover hover:-translate-y-0.5",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-button hover:shadow-button-hover hover:-translate-y-0.5",
        ghost: "hover:bg-gray-100 hover:text-gray-900 text-gray-700",
        link: "text-dental-primary underline-offset-4 hover:underline",
        orange: "bg-gradient-to-r from-dental-coral to-orange text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

