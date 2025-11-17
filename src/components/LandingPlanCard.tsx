import React from "react";

// --- Mock de un plan realista (con estructura similar al Plan del móvil) ---
const mockPlan = {
  id: "plan_mock_1",
  title: "Paseo en grupo por el Retiro",
  type: "WALK",
  difficulty: "baja",
  startDate: "2025-03-21T18:30:00+01:00",
  durationMinutes: 90,
  maxParticipants: 8,
  distanceMeters: 2300,
  municipality: "Parque del Retiro, Madrid",
  requirements: {
    neuteredRequired: true,
  },
  coverPhoto: {
    medium:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop&auto=format&q=80",
  },
  organizer: {
    id: "user_1",
    name: "Laura",
    pets: [
      { id: "pet_1", name: "Rocky" },
      { id: "pet_2", name: "Lola" },
    ],
  },
  participants: [
    {
      id: "user_2",
      status: "CONFIRMED",
      pets: [{ pet: { id: "pet_3", name: "Toby" } }],
    },
    {
      id: "user_3",
      status: "CONFIRMED",
      pets: [{ pet: { id: "pet_4", name: "Nala" } }],
    },
  ],
};

// --- Helpers “ligeros” para el landing ---

const difficultyLabel = (d?: string) => {
  const v = (d || "").toLowerCase();
  if (["easy", "low", "baja"].includes(v)) return "Dificultad baja";
  if (["medium", "media"].includes(v)) return "Dificultad media";
  if (["hard", "alta"].includes(v)) return "Dificultad alta";
  return "Dificultad baja";
};

const formatDistance = (meters?: number) => {
  if (!meters) return "";
  if (meters < 1000) return `${meters} m`;
  const km = meters / 1000;
  return `${km.toFixed(1)} km`;
};

const formatDuration = (mins?: number | null) => {
  if (!mins) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h ${m}min`;
  if (h) return `${h}h`;
  return `${m}min`;
};

const calculateEnrolledDogs = (plan: typeof mockPlan): number => {
  const uniquePetIds = new Set<string>();

  plan.organizer?.pets?.forEach((pet) => {
    uniquePetIds.add(pet.id);
  });

  plan.participants?.forEach((participant) => {
    if (participant.status === "CONFIRMED") {
      participant.pets?.forEach((petParticipation: any) => {
        uniquePetIds.add(
          petParticipation.pet?.id || petParticipation.petId || ""
        );
      });
    }
  });

  return uniquePetIds.size;
};

const coverUrl =
  (mockPlan.coverPhoto as any)?.medium ||
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop&auto=format&q=80";

const LandingPlanCard: React.FC = () => {
  const enrolled = calculateEnrolledDogs(mockPlan);
  const max = mockPlan.maxParticipants;
  const duration = formatDuration(mockPlan.durationMinutes);
  const difficulty = difficultyLabel(mockPlan.difficulty);
  const distance = formatDistance(mockPlan.distanceMeters);
  const castrationText = mockPlan.requirements.neuteredRequired
    ? "Exclusivo castrados"
    : "Apto no castrados";

  // Para el landing usamos strings fijos de fecha/hora (mock)
  const dayLabel = "Sábado, 23 de noviembre";
  const timeLabel = "18:30";

  return (
    <div className="w-full max-w-sm rounded-[32px] bg-rocky-navigator border border-rocky-border shadow-rockyCard overflow-hidden">
      {/* Imagen + date pill + bookmark */}
      <div className="relative h-40">
        <img
          src={coverUrl}
          alt="Paseo en grupo por el Retiro"
          className="w-full h-full object-cover"
        />

        {/* Date pill */}
        <div className="absolute top-3 left-3 flex items-center gap-2 rounded-rockySm bg-white/90 px-3 py-1.5">
          <span className="text-[11px] font-semibold text-rocky-primary capitalize">
            {dayLabel}
          </span>
          <span className="text-[11px] font-medium text-rocky-textMuted">
            {timeLabel}
          </span>
        </div>

        {/* Bookmark “dummy” */}
        <button
          type="button"
          className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-white p-1.5 shadow-rockyCard"
          aria-label="Guardar plan"
        >
          {/* Icono simple de marcador */}
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-none stroke-rocky-primary"
            strokeWidth="1.6"
          >
            <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3-6 3V5a1 1 0 0 1 1-1z" />
          </svg>
        </button>
      </div>

      {/* Contenido del card (mismo layout que la app) */}
      <div className="bg-rocky-card px-rockyLg py-rockyMd max-h-60 overflow-y-auto">
        <div className="flex gap-rockySm">
          {/* Columna izquierda */}
          <div className="flex-1 space-y-1.5 pr-rockySm">
            <h3 className="text-lg font-semibold text-rocky-primary truncate">
              {mockPlan.title}
            </h3>

            {(difficulty || duration) && (
              <p className="text-[11px] text-rocky-textMuted truncate">
                {difficulty}
                {difficulty && duration ? "   •   " : ""}
                {duration ? `Est. ${duration}` : ""}
              </p>
            )}

            <p className="text-[11px] text-rocky-textMuted truncate">
              {mockPlan.municipality}
            </p>

            <p className="text-[11px] text-rocky-textMuted truncate">
              {distance && `Este plan está a:   ${distance} de ti`}
            </p>

            <div className="mt-1 flex items-center gap-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-rocky-primary/10">
                <svg
                  viewBox="0 0 24 24"
                  className="w-3 h-3 stroke-rocky-primary"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[11px] text-rocky-textMuted">
                {castrationText}
              </span>
            </div>
          </div>

          {/* Columna derecha (CTA + contador) */}
          <div className="flex w-28 flex-col items-stretch gap-2 shrink-0">
            <button
              type="button"
              className="flex h-16 flex-col items-center justify-center rounded-rockyMd border border-rocky-border bg-white text-[11px] font-semibold text-rocky-primary shadow-rockyCard"
            >
              <span className="text-base leading-none">＋</span>
              <span>Apúntate</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-rocky-textMuted">
              {/* Mini “logo” Rocky simulado */}
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-rocky-primary text-[10px] font-bold text-white">
                R
              </div>
              <span>
                {enrolled}/{max} perros
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPlanCard;