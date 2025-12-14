export function HomePage() {
  return (
    <section className="grid gap-rockyXl md:grid-cols-2 items-center">
      {/* Texto principal */}
      <div className="space-y-rockyMd">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-rocky-textMuted">
          Tu mapa de alertas, rutas y planes
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-rocky-primary leading-tight">
          Paseos seguros,
          <br />
          rutas y comunidad perruna.
        </h1>

        <p className="text-rocky-textMuted text-lg max-w-xl">
          Rocky te muestra alertas cercanas, rutas detalladas y planes para unirte o crear.
          Chatea, guarda favoritos, comparte fotos y mantente al dia con notificaciones.
        </p>

        <div className="flex flex-wrap gap-rockySm">
          <a
            href="#"
            className="inline-flex items-center justify-center px-rockyLg py-rockySm rounded-rockyLg bg-rocky-buttonBg text-white text-sm font-semibold shadow-rockyCard"
          >
            Descargar la app
          </a>
          <a
            href="/how-it-works"
            className="inline-flex items-center justify-center px-rockyLg py-rockySm rounded-rockyLg border border-rocky-border bg-rocky-surface text-sm font-semibold text-rocky-primary hover:bg-rocky-card hover:border-rocky-cardShadow"
          >
            Ver como funciona
          </a>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-rocky-textMuted">
          <span className="px-3 py-1 rounded-full bg-rocky-card">Alertas en mapa</span>
          <span className="px-3 py-1 rounded-full bg-rocky-card">Rutas detalladas</span>
          <span className="px-3 py-1 rounded-full bg-rocky-card">Chat y comunidad</span>
          <span className="px-3 py-1 rounded-full bg-rocky-card">Fotos y favoritos</span>
        </div>

        <p className="text-xs text-rocky-textMuted">
          Empezamos en Madrid y pronto en mas ciudades.
        </p>
      </div>

      {/* Tarjeta simulando UI de la app */}
      <div className="relative flex justify-center">
        <div className="w-full max-w-sm rounded-[32px] bg-rocky-navigator border border-rocky-border shadow-rockyCard p-rockyLg">
          <div className="mb-rockySm flex items-center justify-between">
            <span className="text-xs font-medium text-rocky-textMuted">
              Ruta destacada cerca de ti
            </span>
            <span className="text-[10px] px-2 py-1 rounded-full bg-rocky-card text-rocky-primary">
              Verificada
            </span>
          </div>

          <div className="rounded-rockyLg bg-rocky-card border border-rocky-border px-rockyLg py-rockyMd space-y-rockySm">
            <h3 className="font-semibold text-rocky-primary text-lg">
              Paseo por Madrid Rio
            </h3>
            <p className="text-sm text-rocky-textMuted">
              6 km · 90 min · Terreno mixto · Punto de inicio marcado
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] px-2 py-1 rounded-full bg-rocky-navigator text-rocky-textMuted">
                Ver recorrido
              </span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-rocky-navigator text-rocky-textMuted">
                Alertas cercanas
              </span>
              <span className="text-[10px] px-2 py-1 rounded-full bg-rocky-navigator text-rocky-textMuted">
                Fotos
              </span>
            </div>
          </div>

          <p className="mt-rockyMd text-xs text-rocky-textMuted text-center">
            Tambien veras planes, alertas verificadas y fotos de la comunidad, todo en el mismo mapa.
          </p>
        </div>
      </div>
    </section>
  );
}
