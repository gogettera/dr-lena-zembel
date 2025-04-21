
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const navigationButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-dental-navy hover:text-dental-orange hover:bg-dental-beige/10",
        primary: "bg-dental-orange text-white hover:bg-dental-orange/90",
        outline: "border border-dental-navy text-dental-navy hover:bg-dental-navy/5",
        ghost: "hover:bg-dental-beige/20 text-dental-navy hover:text-dental-orange",
        active: "text-dental-orange bg-dental-beige/10 font-semibold",
        pill: "rounded-full",
        link: "text-dental-navy underline-offset-4 hover:underline hover:text-dental-orange",
      },
      size: {
        default: "h-9 px-3 py-1.5",
        sm: "h-8 px-2.5 py-1",
        lg: "h-10 px-4 py-2",
        icon: "h-9 w-9",
      },
      animation: {
        none: "",
        fadeIn: "animate-fade-in",
        slideIn: "animate-slide-in",
        scale: "transition-transform hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
);

export interface NavigationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navigationButtonVariants> {
  asChild?: boolean;
  isActive?: boolean;
}

const NavigationButton = React.forwardRef<HTMLButtonElement, NavigationButtonProps>(
  ({ className, variant, size, animation, isActive, asChild = false, ...props }, ref) => {
    // If button is active, use the active variant
    const buttonVariant = isActive ? "active" : variant;
    
    return (
      <button
        className={cn(navigationButtonVariants({ variant: buttonVariant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

NavigationButton.displayName = "NavigationButton";

export { NavigationButton, navigationButtonVariants };
