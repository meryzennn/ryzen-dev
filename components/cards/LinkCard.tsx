import { BaseCard } from "./BaseCard";
import * as Icons from "lucide-react";

interface LinkCardProps {
  title: string;
  description?: string;
  url: string;
  icon?: string;
}

export function LinkCard({ title, description, url, icon }: LinkCardProps) {
  const IconComponent = icon ? (Icons as any)[icon] : Icons.Link;

  return (
    <BaseCard href={url}>
      <div className="flex items-start gap-3">
        {IconComponent && (
          <div className="w-12 h-12 bg-link-light rounded-xl flex items-center justify-center text-link flex-shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-1 truncate">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </BaseCard>
  );
}
