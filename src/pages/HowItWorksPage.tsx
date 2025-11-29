const steps = [
  {
    step: "1",
    title: "Crea tu perfil y el de tu perro",
    text: "Añade info clave (tamaño, energía, notas de convivencia) y guarda tus favoritos.",
  },
  {
    step: "2",
    title: "Explora el mapa",
    text: "Ve alertas cercanas, rutas con GPX y planes activos. Filtra por tipo, dificultad o estado.",
  },
  {
    step: "3",
    title: "Abre rutas y planes",
    text: "En rutas ves el punto de inicio y el trazado GPX sobre el mapa. En planes ves requisitos, cupos y quién se une.",
  },
  {
    step: "4",
    title: "Únete, crea y chatea",
    text: "Únete a un paseo o crea uno nuevo. Chatea con el grupo y recibe notificaciones de cambios y alertas.",
  },
  {
    step: "5",
    title: "Comparte y confirma",
    text: "Sube fotos, marca favoritos, confirma alertas (“sigue ahí” / “ya no está”) y ayuda a la comunidad.",
  },
];

export function HowItWorksPage() {
  return (
    <section className="space-y-rockyXl">
      <header className="space-y-rockySm max-w-3xl">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-rocky-textMuted">
          Como funciona
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-rocky-primary">
          Todo pasa en un mapa: alertas, rutas con GPX y planes.
        </h2>
        <p className="text-rocky-textMuted text-base">
          En minutos sabes qué ocurre cerca, qué rutas seguir y a qué paseo unirte.
          Sin chats dispersos ni info incompleta.
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
