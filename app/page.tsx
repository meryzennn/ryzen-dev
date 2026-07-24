import { loadContent } from "@/lib/content";
import { CardRenderer } from "@/components/cards/CardRenderer";

export default function Home() {
  const content = loadContent();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">

          {/* Sticky Sidebar */}
          <div className="w-full md:w-[480px] flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-card rounded-[24px] p-10 shadow-lg border border-border">
                {/* Profile Section */}
                <div className="flex flex-col gap-6">
                  <div className="w-[120px] h-[120px] rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
                    {content.profile.name.charAt(0)}
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tight">
                      {content.profile.name}
                    </h1>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {content.profile.bio}
                    </p>
                    {content.profile.location && (
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>📍</span>
                        {content.profile.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-8 md:mt-0">
            {/* Cards Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {content.cards
                .filter((card) => card.visible)
                .sort((a, b) => a.position - b.position)
                .map((card) => (
                  <CardRenderer key={card.id} card={card} />
                ))}
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}
