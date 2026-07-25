import * as Icons from "lucide-react";
import { BentoCard } from "./BentoGrid";
import type { LinkCard as LinkCardType } from "@/types/content";

export function BentoLinkCard({ card }: { card: LinkCardType }) {
  const IconComponent = card.icon ? (Icons as any)[card.icon] : Icons.Link;

  return (
    <BentoCard size={card.size} href={card.url}>
      <div className="relative h-full w-full p-6 flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-link-light rounded-xl flex items-center justify-center text-link">
          {IconComponent && <IconComponent className="w-6 h-6" strokeWidth={2} />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-base font-bold mb-1 truncate">
            {card.title}
          </h3>
          {card.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {card.description}
            </p>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
