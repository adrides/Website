export function LegalPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-rocky-primary">Aviso legal</h1>
      <p className="text-rocky-textMuted text-sm">
        Esta página recoge la información legal y condiciones de uso de Rocky.
      </p>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">1. Identidad del responsable</h2>
        <p>
          Rocky — Plataforma comunitaria para amantes de los perros. Si necesitas
          contactarnos, utiliza el formulario disponible en la web o la app.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">2. Condiciones de uso</h2>
        <p>
          El uso de la web y la app implica la aceptación de estas condiciones. Nos reservamos
          el derecho a realizar cambios para mejorar el servicio y la experiencia.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3. Propiedad intelectual</h2>
        <p>
          El nombre, la marca y los recursos visuales de Rocky no pueden utilizarse sin permiso.
        </p>
      </section>
    </div>
  );
}

