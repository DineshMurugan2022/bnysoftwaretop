export function StatsBlock() {
  return (
    <section className="py-12 border-y border-border bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Projects Completed", value: "250+" },
            { label: "Happy Clients", value: "120+" },
            { label: "Years of Experience", value: "10+" },
            { label: "Team Members", value: "50+" },
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-4xl font-bold text-brand-accent">{stat.value}</h3>
              <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
