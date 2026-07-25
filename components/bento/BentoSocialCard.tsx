import * as Icons from "lucide-react";
import { BentoCard } from "./BentoGrid";
import type { SocialCard as SocialCardType } from "@/types/content";

export function BentoSocialCard({ card }: { card: SocialCardType }) {
  const IconComponent = card.icon ? (Icons as any)[card.icon] : Icons.Share2;

  return (
    <BentoCard size={card.size} href={card.url}>
      <div className="relative h-full w-full p-6 flex flex-col">
        {/* Icon background blob */}
        <div className="absolute top-6 right-6 w-20 h-20 bg-social/10 rounded-2xl blur-2xl" />

        {/* Icon */}
        <div className="relative w-14 h-14 bg-social-light rounded-2xl flex items-center justify-center text-social mb-auto">
          {IconComponent && <IconComponent className="w-7 h-7" strokeWidth={2} />}
        </div>

        {/* Content */}
        <div className="relative mt-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {card.platform}
          </p>
          <p className="text-xl font-bold mb-3 leading-tight">
            {card.username}
          </p>

          {card.followers && (
            <div className="inline-flex items-center gap-2 bg-social text-social-foreground px-3 py-1.5 rounded-xl text-xs font-semibold">
              <Icons.Users className="w-3.5 h-3.5" />
              {card.followers}
            </div>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
