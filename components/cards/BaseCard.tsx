import { ReactNode } from "react";
import Link from "next/link";

interface BaseCardProps {
  href?: string;
  children: ReactNode;
  className?: string;
}

export function BaseCard({ href, children, className = "" }: BaseCardProps) {
  const baseClasses = "p-6 bg-card border border-border rounded-[24px] hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between h-full";

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
}
