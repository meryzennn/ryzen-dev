import { Card } from "@/types/content";
import { SocialCard } from "./SocialCard";
import { ProjectCard } from "./ProjectCard";
import { LinkCard } from "./LinkCard";
import { ContactCard } from "./ContactCard";
import { BaseCard } from "./BaseCard";

export function CardRenderer({ card }: { card: Card }) {
  switch (card.type) {
    case "social":
      return (
        <SocialCard
          platform={card.platform!}
          username={card.username!}
          url={card.url!}
          icon={card.icon}
          followers={card.followers}
        />
      );

    case "project":
      return (
        <ProjectCard
          title={card.title!}
          description={card.description!}
          url={card.url!}
          image={card.image}
          tags={card.tags}
        />
      );

    case "link":
      return (
        <LinkCard
          title={card.title!}
          description={card.description}
          url={card.url!}
          icon={card.icon}
        />
      );

    case "contact":
      return (
        <ContactCard
          email={card.email!}
          title={card.title}
          subject={card.subject}
        />
      );

    case "image":
    case "text":
      // Fallback for unimplemented card types
      return (
        <BaseCard>
          <h3 className="text-lg font-semibold mb-2">{card.title || card.type}</h3>
          <p className="text-sm text-muted-foreground">
            {card.description || `${card.type} card`}
          </p>
        </BaseCard>
      );

    default:
      return null;
  }
}
