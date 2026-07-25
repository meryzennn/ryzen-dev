import { BaseCard } from "./BaseCard";
import { Mail } from "lucide-react";

interface ContactCardProps {
  email: string;
  title?: string;
  subject?: string;
}

export function ContactCard({ email, title = "Get in touch", subject }: ContactCardProps) {
  const mailto = subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;

  return (
    <BaseCard href={mailto}>
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 bg-contact-light rounded-xl flex items-center justify-center text-contact">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <p className="text-lg font-bold mb-1">{title}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
    </BaseCard>
  );
}
