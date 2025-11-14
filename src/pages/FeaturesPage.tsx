const features = [
  {
    title: "Planes cerca de ti",
    description:
      "Explora paseos y quedadas creados por otros usuarios en tu zona, con requisitos y nivel de energía claros.",
  },
  {
    title: "Requisitos cuidados",
    description:
      "Tamaño, energía, experiencia, carácter… todo definido para que el plan sea tranquilo y seguro para todos.",
  },
  {
    title: "Chat del plan",
    description:
      "Habla con el resto de participantes antes de quedar: dudas, detalles y última hora en un solo lugar.",
  },
  {
    title: "Perfiles de perros",
    description:
      "Conoce mejor a los perros que asistirán: fotos, edad, tamaño y notas importantes del humano.",
  },
];

export function FeaturesPage() {
  return (
    <section className="space-y-rockyXl">
      <header className="space-y-rockySm max-w-3xl">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-rocky-textMuted">
          Funcionalidades
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-rocky-primary">
          Todo pensado para planes tranquilos y cuidados.
        </h2>
        <p className="text-rocky-textMuted text-base">
          heyrocky nace para hacer más fácil organizar paseos y quedadas con tu
          perro, con toda la información importante visible desde el primer
          momento.
        </p>
      </header>

      <div className="grid gap-rockyLg md:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-rockyXl border border-rocky-border bg-rocky-surface shadow-rockyCard p-rockyLg space-y-rockySm"
          >
            <h3 className="font-semibold text-rocky-primary text-lg">
              {f.title}
            </h3>
            <p className="text-sm text-rocky-textMuted">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
