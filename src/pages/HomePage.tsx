export function HomePage() {
  return (
    <section className="grid gap-rockyXl md:grid-cols-2 items-center">
      {/* Texto principal */}
      <div className="space-y-rockyMd">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-rocky-textMuted">
          Para personas con perro
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-rocky-primary leading-tight">
          Planes tranquilos
          <br />
          para perros sociables.
        </h1>

        <p className="text-rocky-textMuted text-lg max-w-xl">
          Rocky conecta a personas con perro para organizar paseos, quedadas y
          actividades en entornos seguros y cuidados, con requisitos claros para
          cada plan.
        </p>

        <div className="flex flex-wrap gap-rockySm">
          <a
            href="#"
            className="inline-flex items-center justify-center px-rockyLg py-rockySm rounded-rockyLg bg-rocky-buttonBg text-white text-sm font-semibold shadow-rockyCard"
          >
            Descargar la app
          </a>
          <a
            href="how-it-works"
            className="inline-flex items-center justify-center px-rockyLg py-rockySm rounded-rockyLg border border-rocky-border bg-rocky-surface text-sm font-semibold text-rocky-primary hover:bg-rocky-card hover:border-rocky-cardShadow"
          >
            Ver cómo funciona
          </a>
        </div>

        <p className="text-xs text-rocky-textMuted">
          Empezamos en Madrid y pronto en más ciudades.
        </p>
      </div>

      {/* Tarjeta simulando UI de la app */}
      <div className="relative flex justify-center">
        <div className="w-full max-w-sm rounded-[32px] bg-rocky-navigator border border-rocky-border shadow-rockyCard p-rockyLg">
          <div className="mb-rockySm flex items-center justify-between">
            <span className="text-xs font-medium text-rocky-textMuted">
              Plan destacado cerca de ti
            </span>
            <span className="text-[10px] px-2 py-1 rounded-full bg-rocky-card text-rocky-primary">
              Hoy · 18:30
            </span>
          </div>

          <div className="rounded-rockyLg bg-rocky-card border border-rocky-border px-rockyLg py-rockyMd space-y-rockySm">
            <h3 className="font-semibold text-rocky-primary text-lg">
              Paseo en grupo por el parque
            </h3>
            <p className="text-sm text-rocky-textMuted">
              5 perros · Parque del Retiro · Ambiente tranquilo
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] px-2 py-1 rounded-full bg-rocky-navigator text-rocky-textMuted">
                Perros sociables
              </span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-rocky-navigator text-rocky-textMuted">
                Tamaño mediano
              </span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-rocky-navigator text-rocky-textMuted">
                Nivel tranquilo
              </span>
            </div>
          </div>

          <p className="mt-rockyMd text-xs text-rocky-textMuted text-center">
            Así verás los planes desde la app: claros, cuidados y con toda la
            info que necesitas antes de quedar.
          </p>
        </div>
      </div>
    </section>
  );
}
