import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[160px] grid-cols-1 gap-4",
        "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        "w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: ReactNode;
  size?: "1x1" | "1x2" | "2x1" | "2x2";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function BentoCard({
  children,
  size = "1x1",
  className,
  onClick,
  href
}: BentoCardProps) {
  const sizeClasses = {
    "1x1": "col-span-1 row-span-1",
    "1x2": "col-span-1 row-span-2",
    "2x1": "col-span-1 sm:col-span-2 row-span-1",
    "2x2": "col-span-1 sm:col-span-2 row-span-2",
  };

  const baseClasses = cn(
    "group relative overflow-hidden rounded-3xl",
    "bg-card border border-border",
    "transition-all duration-200",
    "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10",
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
}
