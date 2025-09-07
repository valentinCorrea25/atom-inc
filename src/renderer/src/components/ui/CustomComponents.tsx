import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost" | "outline" | "file" | "send" | "icon";
  size?: "default" | "sm" | "lg";
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    let buttonClass = "";
    
    // Aplicar estilos según la variante
    switch (variant) {
      case "primary":
        buttonClass = "send-btn";
        break;
      case "outline":
        buttonClass = "file-btn";
        break;
      case "ghost":
        buttonClass = "";
        break;
      case "icon":
        buttonClass = "file-btn";
        break;
      default:
        buttonClass = "download-btn";
    }
    
    return (
      <button
        className={`${buttonClass} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        className={`${className}`}
        id="messageInput"
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

// Card Component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`file-attachment ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Badge Component
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "online" | "offline";
  children?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    let badgeClass = "user-status";
    
    if (variant === "secondary") {
      badgeClass += " offline";
    } else if (variant === "online") {
      badgeClass += " online";
    } else if (variant === "offline") {
      badgeClass += " offline";
    }
    
    return (
      <div
        ref={ref}
        className={`${badgeClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

// Export components
export { Button, Input, Card, Badge };