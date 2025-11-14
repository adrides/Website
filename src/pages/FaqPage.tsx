const faqs = [
  {
    q: "¿La app es gratuita?",
    a: "Sí. El registro y el uso básico de la app son gratuitos. Más adelante podremos añadir opciones extra para quien quiera sacar aún más partido a los planes.",
  },
  {
    q: "¿En qué ciudades está disponible?",
    a: "Empezamos en Madrid y ampliaremos poco a poco a más ciudades en función de la demanda y la comunidad.",
  },
  {
    q: "¿Es seguro quedar con otros usuarios?",
    a: "Trabajamos con perfiles detallados de personas y perros, requisitos por plan y herramientas de reporte para mantener la comunidad cuidada.",
  },
  {
    q: "¿Necesito que mi perro sea súper sociable?",
    a: "No. Precisamente por eso hay requisitos: puedes buscar planes tranquilos, con pocos perros o un nivel de energía más bajo para que se sienta cómodo.",
  },
];

export function FaqPage() {
  return (
    <section className="space-y-rockyXl">
      <header className="space-y-rockySm max-w-3xl">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-rocky-textMuted">
          Preguntas frecuentes
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-rocky-primary">
          Resolvemos las dudas más habituales.
        </h2>
        <p className="text-rocky-textMuted text-base">
          Y si tienes alguna pregunta más concreta sobre tu perro o tu ciudad,
          puedes escribirnos directamente.
        </p>
      </header>

      <div className="space-y-rockySm">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-rockyXl border border-rocky-border bg-rocky-surface/90 p-rockyMd"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
              <span className="font-medium text-rocky-text">
                {item.q}
              </span>
              <span className="text-xs text-rocky-textMuted group-open:hidden">
                +
              </span>
              <span className="text-xs text-rocky-textMuted hidden group-open:inline">
                −
              </span>
            </summary>
            <p className="mt-rockySm text-sm text-rocky-textMuted">
              {item.a}
            </p>
          </details>
        ))}
      </div>

      <div className="rounded-rockyXl border border-rocky-border bg-rocky-navigator p-rockyLg space-y-rockySm">
        <h3 className="font-semibold text-rocky-primary">
          ¿Tienes otra pregunta?
        </h3>
        <p className="text-sm text-rocky-textMuted">
          Escríbenos y te respondemos lo antes posible.
        </p>
        <a
          href="mailto:hola@heyrockyapp.com"
          className="inline-flex items-center justify-center px-rockyLg py-rockySm rounded-rockyLg bg-rocky-buttonBg text-white text-sm font-semibold shadow-rockyCard"
        >
          Contactar por email
        </a>
      </div>
    </section>
  );
}
