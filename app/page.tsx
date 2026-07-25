import { loadContent } from "@/lib/content";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { BentoCardRenderer } from "@/components/bento/BentoCardRenderer";

export default function Home() {
  const content = loadContent();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Profile Card - Featured at top */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-project flex items-center justify-center text-3xl font-bold text-white shadow-xl">
              {content.profile.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {content.profile.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {content.profile.bio}
              </p>
              {content.profile.location && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                  <span>📍</span>
                  {content.profile.location}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <BentoGrid>
          {content.cards
            .filter((card) => card.visible)
            .sort((a, b) => a.position - b.position)
            .map((card) => (
              <BentoCardRenderer key={card.id} card={card} />
            ))}
        </BentoGrid>
      </div>
    </main>
  );
}
