const faqs = [
  {
    q: "¿La app es gratuita?",
    a: "Sí, el registro y el uso básico son gratuitos. Podremos añadir extras opcionales más adelante.",
  },
  {
    q: "¿En qué ciudades funciona?",
    a: "Empezamos en Madrid y ampliamos según la comunidad. Las alertas y rutas se adaptan a tu ubicación.",
  },
  {
    q: "¿Cómo veo las rutas en el mapa?",
    a: "Toca el pin de ruta: verás el punto de inicio y el recorrido trazado en el mapa, con distancia y duración.",
  },
  {
    q: "¿Puedo subir fotos de rutas?",
    a: "Sí, las rutas admiten varias fotos. En planes puedes compartir fotos con el grupo.",
  },
  {
    q: "¿Qué pasa con las alertas?",
    a: "Puedes crear alertas con ubicación y fotos. La comunidad confirma estado (“sigue ahí” / “ya no está”) y recibe avisos cercanos.",
  },
  {
    q: "¿Hay chat y notificaciones?",
    a: "Sí, tienes chat en planes y mensajes directos. Recibes notificaciones de alertas, planes y recordatorios.",
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
          Lo clave de Rocky en pocas respuestas.
        </h2>
        <p className="text-rocky-textMuted text-base">
          Si tienes alguna pregunta más concreta sobre tu zona o tus rutas, escríbenos.
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
                —
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
          href="mailto:hello@heyrockyapp.com"
          className="inline-flex items-center justify-center px-rockyLg py-rockySm rounded-rockyLg bg-rocky-buttonBg text-white text-sm font-semibold shadow-rockyCard"
        >
          Contactar por email
        </a>
      </div>
    </section>
  );
}
