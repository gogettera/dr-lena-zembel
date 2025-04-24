
import React from "react";
import { cn } from "@/lib/utils";

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  variant?: "default" | "ordered" | "unordered" | "check" | "bullet";
  spacing?: "default" | "tight" | "loose";
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ children, variant = "default", spacing = "default", className, ...props }, ref) => {
    const Component = variant === "ordered" ? "ol" : "ul";
    
    const variantStyles = {
      default: "",
      ordered: "list-decimal",
      unordered: "list-disc",
      check: "",
      bullet: "list-disc",
    };
    
    const spacingStyles = {
      default: "space-y-2",
      tight: "space-y-1",
      loose: "space-y-4",
    };
    
    return (
      <Component
        ref={ref}
        className={cn(
          "mr-6",
          variantStyles[variant],
          spacingStyles[spacing],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
List.displayName = "List";

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

interface ListItemIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListItemIcon = React.forwardRef<HTMLDivElement, ListItemIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center justify-center ml-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ListItemIcon.displayName = "ListItemIcon";

interface ListItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  secondary?: React.ReactNode;
}

const ListItemText = React.forwardRef<HTMLDivElement, ListItemTextProps>(
  ({ children, secondary, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline", className)}
        {...props}
      >
        <div className="text-dental-navy">{children}</div>
        {secondary && (
          <div className="text-sm text-dental-navy/60">{secondary}</div>
        )}
      </div>
    );
  }
);
ListItemText.displayName = "ListItemText";

export { List, ListItem, ListItemIcon, ListItemText };
