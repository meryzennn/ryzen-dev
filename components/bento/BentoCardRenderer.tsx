import type { Card } from "@/types/content";
import { BentoSocialCard } from "./BentoSocialCard";
import { BentoProjectCard } from "./BentoProjectCard";
import { BentoLinkCard } from "./BentoLinkCard";
import { BentoContactCard } from "./BentoContactCard";

export function BentoCardRenderer({ card }: { card: Card }) {
  switch (card.type) {
    case "social":
      return <BentoSocialCard card={card} />;
    case "project":
      return <BentoProjectCard card={card} />;
    case "link":
      return <BentoLinkCard card={card} />;
    case "contact":
      return <BentoContactCard card={card} />;
    case "image":
    case "text":
      // Fallback for unimplemented card types
      return null;
    default:
      return null;
  }
}
