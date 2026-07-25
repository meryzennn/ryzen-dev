import { Mail } from "lucide-react";
import { BentoCard } from "./BentoGrid";
import type { ContactCard as ContactCardType } from "@/types/content";

export function BentoContactCard({ card }: { card: ContactCardType }) {
  const mailto = card.subject
    ? `mailto:${card.email}?subject=${encodeURIComponent(card.subject)}`
    : `mailto:${card.email}`;

  return (
    <BentoCard size={card.size} href={mailto}>
      <div className="relative h-full w-full p-6 flex flex-col items-center justify-center text-center">
        {/* Icon background */}
        <div className="absolute inset-0 bg-gradient-to-br from-contact/10 via-transparent to-transparent" />

        {/* Icon */}
        <div className="relative w-16 h-16 bg-contact-light rounded-2xl flex items-center justify-center text-contact mb-4">
          <Mail className="w-8 h-8" strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-lg font-bold mb-2">
            {card.title || "Get in touch"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {card.email}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
