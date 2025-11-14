const steps = [
  {
    step: "1",
    title: "Crea tu perfil y el de tu perro",
    text: "Añade información básica como tamaño, edad, nivel de energía y notas importantes para que otros humanos sepan con quién van a quedar.",
  },
  {
    step: "2",
    title: "Explora planes cerca de ti",
    text: "Filtra por zona, horario, tipo de actividad y requisitos para encontrar planes que encajen con tu perro y contigo.",
  },
  {
    step: "3",
    title: "Únete y chatea con el grupo",
    text: "Haz preguntas, confirma detalles y asegura que todo el mundo está en la misma página antes de la quedada.",
  },
  {
    step: "4",
    title: "Disfruta del paseo",
    text: "Queda en el punto de encuentro acordado, conoced al resto de la manada y deja que los perros hagan su magia.",
  },
];

export function HowItWorksPage() {
  return (
    <section className="space-y-rockyXl">
      <header className="space-y-rockySm max-w-3xl">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-rocky-textMuted">
          Cómo funciona
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-rocky-primary">
          Diseñado para organizar planes en minutos, no en horas.
        </h2>
        <p className="text-rocky-textMuted text-base">
          Desde el primer paso hasta el momento de quedar en el parque, heyrocky
          te acompaña con un flujo sencillo y claro.
        </p>
      </header>

      <ol className="grid gap-rockyLg md:grid-cols-2">
        {steps.map((s) => (
          <li
            key={s.step}
            className="relative rounded-rockyXl border border-rocky-border bg-rocky-surface/80 shadow-rockyCard p-rockyLg space-y-rockySm"
          >
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rocky-card text-rocky-primary text-sm font-semibold mb-rockySm">
              {s.step}
            </div>
            <h3 className="font-semibold text-rocky-primary">{s.title}</h3>
            <p className="text-sm text-rocky-textMuted">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
