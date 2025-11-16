export function PrivacyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-rocky-primary">Política de privacidad</h1>
      <p className="text-rocky-textMuted text-sm">
        Explicamos cómo recopilamos, usamos y protegemos tus datos en Rocky.
      </p>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">1. Datos que tratamos</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Datos de cuenta (nombre, email, avatar)</li>
          <li>Preferencias y ajustes de notificaciones</li>
          <li>Datos necesarios para funcionalidades (por ejemplo ubicación si la consientes)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">2. Finalidades</h2>
        <p>
          Prestación del servicio, seguridad comunitaria y mejora del producto. No vendemos tus datos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3. Tus derechos</h2>
        <p>
          Puedes solicitar acceso, rectificación o eliminación escribiéndonos desde la sección de contacto.
        </p>
      </section>
    </div>
  );
}

