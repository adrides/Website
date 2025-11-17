import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "@/src/styles/theme";
import RouteService from "@/src/services/routeService";
import { LocationService } from "@/src/services/locationService";
import { Plan, PlansStackParamList } from "@/src/types";
import favoritesService from "@/src/services/favoritesService";
import OptimizedImage from "@/src/components/common/OptimizedImage";
import { AppIcons } from "@/src/assets/icons";

type Nav = StackNavigationProp<PlansStackParamList, "PlansList">;

interface Props {
  plan: Plan;
  onPress?: () => void;
  onJoinPress?: (plan: Plan) => void;
  onChatPress?: (plan: Plan) => void;
  onRecreatePlanPress?: (plan: Plan) => void;
  showDistance?: boolean;
  showBookmark?: boolean;
  context?: "list" | "myPlans";
  myPlansTab?: "upcoming" | "past" | "organized";
}

const difficultyLabel = (d?: string) => {
  const v = (d || "").toLowerCase();
  if (["easy", "low", "baja"].includes(v)) return "Dificultad baja";
  if (["medium", "media"].includes(v)) return "Dificultad media";
  if (["hard", "alta"].includes(v)) return "Dificultad alta";
  return "Dificultad baja";
};

const getCover = (plan: Plan): string => {
  const pick = (
    photo: any,
    q: "thumb" | "medium" | "full" = "medium"
  ): string | null => {
    if (!photo) return null;
    if (typeof photo === "string") return photo;
    if (photo[q]) return photo[q];
    if (photo.url) return photo.url;
    if (photo.src) return photo.src;
    return null;
  };

  // 1) assignedPhotos (forma “rica” de PlansListScreen)
  if (
    Array.isArray((plan as any).assignedPhotos) &&
    (plan as any).assignedPhotos.length > 0
  ) {
    const primary =
      (plan as any).assignedPhotos.find((p: any) => p?.isPrimary) ??
      (plan as any).assignedPhotos[0];
    const url = pick(primary, "medium");
    if (url) return url;
  }

  // 2) campos directos típicos en respuestas “ligeras”
  const direct = [
    (plan as any).coverPhoto,
    (plan as any).coverPhotoUrl,
    (plan as any).coverImage,
    (plan as any).coverImageUrl,
    (plan as any).primaryPhoto,
  ];
  for (const d of direct) {
    const url = pick(d, "medium");
    if (url) return url;
  }

  // 3) arrays genéricos
  const arrays = [
    (plan as any).photos,
    (plan as any).images,
    (plan as any).media,
    (plan as any).planPhotos,
  ].filter(Boolean);
  for (const arr of arrays) {
    if (Array.isArray(arr) && arr.length) {
      const primary = arr.find((p: any) => p?.isPrimary) ?? arr[0];
      const url = pick(primary, "medium");
      if (url) return url;
    }
  }

  // 2b) try additional direct fields and variant maps commonly used by backend
  const extraDirect = [
    (plan as any).cover,
    (plan as any).coverUrl,
    (plan as any).cover_image,
    (plan as any).cover_image_url,
    (plan as any).photo,
    (plan as any).photoUrl,
    (plan as any).image,
    (plan as any).imageUrl,
  ];
  for (const d of extraDirect) {
    const url = pick(d, "medium");
    if (url) return url;
  }

  const variantCandidates = [
    (plan as any).coverPhotoVariants,
    (plan as any).cover_photo_variants,
    (plan as any).photo_variants,
  ];
  for (const v of variantCandidates) {
    if (!v) continue;
    if (v?.medium?.jpeg) return v.medium.jpeg;
    if (v?.medium?.webp) return v.medium.webp;
    if (v?.thumb?.jpeg) return v.thumb.jpeg;
    if (v?.full?.jpeg) return v.full.jpeg;
  }

  // 4) anidados frecuentes
  const nested = [
    (plan as any).route?.featuredPhoto || (plan as any).route?.coverPhoto,
    (plan as any).route?.photos?.[0],
    (plan as any).venue?.coverPhoto,
    (plan as any).venue?.photos?.[0],
  ];
  for (const n of nested) {
    const url = pick(n, "medium");
    if (url) return url;
  }

  // 5) fallback por tipo
  const defaults: Record<string, string> = {
    WALK: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&auto=format&q=75",
    SOCIAL:
      "https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=400&h=300&fit=crop&auto=format&q=75",
    TRAINING:
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=300&fit=crop&auto=format&q=75",
    EXCURSION:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&auto=format&q=75",
    PLAYDATE:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&auto=format&q=75",
  };
  return defaults[plan.type as string] ?? defaults.WALK;
};

const formatStart = (iso?: string) => {
  if (!iso) return { day: "", time: "" };
  const d = new Date(iso);
  return {
    day: format(d, "EEEE, d 'de' LLLL", { locale: es }),
    time: format(d, "HH:mm", { locale: es }),
  };
};

const formatDuration = (plan: Plan) => {
  // No mostrar duración para planes SOCIAL
  if (plan.type === "SOCIAL") {
    return null;
  }

  // If backend already provides duration as string like "1h 30m", just return it
  if (typeof plan.duration === "string" && /[hm]/i.test(plan.duration)) {
    return plan.duration;
  }

  // If backend gives duration in minutes as number or string, normalize it
  const mins =
    typeof plan.duration === "number"
      ? plan.duration
      : (plan as any).durationMinutes ?? parseInt(plan.duration || "0", 10);

  if (!mins || isNaN(mins)) return null;

  const h = Math.floor(mins / 60);
  const m = mins % 60;

  if (h && m) return `${h}h ${m}min`;
  if (h) return `${h}h`;
  return `${m}min`;
};

// 🔥 FIXED: Count ONLY dogs (pets), NOT users
const calculateEnrolledDogs = (plan: Plan): number => {
  // Use a Set to track unique pet IDs across ALL participants including organizer
  const uniquePetIds = new Set<string>();

  // Add organizer's pets
  if (plan.organizer?.pets) {
    plan.organizer.pets.forEach((pet: any) => {
      uniquePetIds.add(pet.id);
    });
  }

  // Add participant pets (confirmed only)
  plan.participants?.forEach((participant: any) => {
    if (participant.status === "CONFIRMED") {
      participant.pets?.forEach((petParticipation: any) => {
        // Add petId to set (automatically deduplicates shared pets)
        uniquePetIds.add(petParticipation.pet?.id || petParticipation.petId);
      });
    }
  });

  const total = uniquePetIds.size;

  console.log("🐕 Unique dog count (including organizer):", {
    planId: plan.id,
    planTitle: plan.title,
    uniquePetIds: Array.from(uniquePetIds),
    totalUniqueDogs: total,
    maxParticipants: plan.maxParticipants,
    organizerPets: plan.organizer?.pets?.length || 0,
    participantPets:
      plan.participants?.reduce(
        (count: number, p: any) =>
          p.status === "CONFIRMED" ? count + (p.pets?.length || 0) : count,
        0
      ) || 0,
  });

  return total;
};

const PlanCard: React.FC<Props> = ({
  plan,
  onPress,
  onJoinPress,
  onChatPress,
  onRecreatePlanPress,
  showDistance = true,
  showBookmark = true,
  context = "list",
  myPlansTab,
}) => {
  const navigation = useNavigation<Nav>();
  const { day, time } = useMemo(
    () => formatStart(plan.startDate),
    [plan.startDate]
  );

  const [isFavorited, setIsFavorited] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const result = await favoritesService.isFavorited("PLAN", plan.id);
        if (result.success && result.data) {
          setIsFavorited(result.data.isFavorited);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    if (showBookmark) {
      checkFavoriteStatus();
    }
  }, [plan.id, showBookmark]);

  const handlePress = () => {
    if (onPress) return onPress();
    navigation.navigate("PlanDetail", { planId: plan.id });
  };

  const handleBookmarkPress = async () => {
    try {
      setBookmarkLoading(true);

      const metadata = favoritesService.extractPlanMetadata(plan);
      const result = await favoritesService.toggleFavorite(
        "PLAN",
        plan.id,
        metadata
      );

      if (result.success && result.data) {
        setIsFavorited(result.data.isFavorited);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const getCTA = () => {
    if (context === "myPlans" && myPlansTab) {
      if (myPlansTab === "past") {
        return {
          icon: "refresh-outline" as const,
          label: "Recrear",
          onPress: () => {
            if (onRecreatePlanPress) {
              onRecreatePlanPress(plan);
            }
          },
        };
      } else {
        return {
          icon: "chatbubble-outline" as const,
          label: "Chatear",
          onPress: () => {
            if (onChatPress) {
              onChatPress(plan);
            }
          },
        };
      }
    } else {
      return {
        icon: "add" as const,
        label: "Apúntate",
        onPress: () => {
          if (onJoinPress) {
            onJoinPress(plan);
          } else {
            navigation.navigate("Plans", {
              screen: "JoinPlan",
              params: { planId: plan.id },
            });
          }
        },
      };
    }
  };

  const distance =
    plan.distance != null
      ? LocationService.formatDistance(plan.distance)
      : plan.estimatedDistance
      ? RouteService.formatDistance(plan.estimatedDistance as any)
      : undefined;

  const duration = formatDuration(plan);
  const showDifficulty = plan.type !== "SOCIAL"; // No mostrar dificultad para SOCIAL
  const diff = showDifficulty
    ? difficultyLabel((plan as any).difficulty)
    : null;
  const municipality =
    (plan as any).locationName ||
    (plan as any).address ||
    (plan as any).municipality ||
    "Cerca de ti";

  const requireNeutered = plan.requirements?.neuteredRequired || false;
  const castrationText = requireNeutered
    ? "Exclusivo castrados"
    : "Apto no castrados";

  // 🔥 ONLY COUNT DOGS
  const enrolled = calculateEnrolledDogs(plan);
  const max = plan.maxParticipants;

  const coverImageUrl = getCover(plan);
  const cta = getCTA();

  return (
    <View style={styles.cardShadow}>
      <View style={styles.cardWrap}>
        <OptimizedImage
          source={{ uri: coverImageUrl }}
          style={styles.bgImage}
          resizeMode="cover"
          placeholder="skeleton"
          quality="medium"
          lazy={false}
        />

        {!!day && (
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>{day}</Text>
            {!!time && <Text style={styles.dateTimeText}>{time}</Text>}
          </View>
        )}

        {showBookmark && (
          <View style={styles.cornerIcon}>
            <TouchableOpacity
              onPress={handleBookmarkPress}
              disabled={bookmarkLoading}
              style={[
                styles.bookmarkButton,
                isFavorited && styles.bookmarkButtonActive,
              ]}
            >
              <Ionicons
                name={isFavorited ? "bookmark" : "bookmark-outline"}
                size={18}
                color={isFavorited ? colors.primary : colors.primary}
              />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
          <View style={{ height: 160 }} />
        </TouchableOpacity>

        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: 220 }}
          contentContainerStyle={styles.content}
        >
          <View style={styles.cols}>
            <View style={styles.leftCol}>
              <Text style={styles.title} numberOfLines={1}>
                {plan.title ||
                  plan.name ||
                  (plan.type === "SOCIAL" ? "Evento Social" : "Paseo")}
              </Text>

              {/* Solo mostrar dificultad y duración si NO es SOCIAL */}
              {(diff || duration) && (
                <Text style={styles.meta} numberOfLines={1}>
                  {diff}
                  {diff && duration ? "   •   " : ""}
                  {duration ? `Est. ${duration}` : ""}
                </Text>
              )}

              <Text style={styles.location} numberOfLines={1}>
                {municipality}
              </Text>

              <Text style={styles.meta} numberOfLines={1}>
                {distance ? `Este plan está a:   ${distance}` : ""}
              </Text>

              <View style={styles.checkWithText}>
                <View style={styles.roundCheck}>
                  <Ionicons name="checkmark" size={12} color="#fff" />
                </View>
                <Text style={styles.castrationText}>{castrationText}</Text>
              </View>
            </View>

            <View style={styles.rightCol}>
              <TouchableOpacity
                onPress={cta.onPress}
                activeOpacity={0.9}
                style={styles.joinCtaBox}
              >
                <Ionicons name={cta.icon} size={22} color={colors.primary} />
                <Text style={styles.joinCtaLabel}>{cta.label}</Text>
              </TouchableOpacity>

              <View style={styles.countWrap}>
                <Image
                  source={AppIcons.rocky}
                  style={styles.appIcon}
                  resizeMode="contain"
                />
                <Text style={styles.countText}>
                  {enrolled}/{max}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,

    // 🌗 Sombra solo debajo (iOS)
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.9,
    shadowRadius: borderRadius.lg,
    // Android
    elevation: 8,
    // Fondo transparente para que la sombra se vea sobre el background de la lista
    backgroundColor: "transparent",
  },

  cardWrap: {
    position: "relative",
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
  },

  datePill: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: borderRadius.xs,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    gap: 8,
  },
  datePillText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    textTransform: "capitalize",
  },
  dateTimeText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  cornerIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 10,
  },
  bookmarkButton: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: borderRadius.round,
    padding: 6,
  },
  bookmarkButtonActive: {
    backgroundColor: "rgba(255,255,255,0.9)",
  },

  content: {
    padding: spacing.sm,
  },

  cols: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  leftCol: {
    flex: 1,
    paddingRight: spacing.sm,
    gap: 6,
  },
  rightCol: {
    alignItems: "flex-start",
    gap: spacing.xs,
  },

  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
  },
  meta: { fontSize: typography.fontSize.xs, color: colors.text.secondary },

  checkWithText: { flexDirection: "row", alignItems: "center", gap: 8 },
  roundCheck: {
    width: 18,
    height: 18,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primaryLightExtra,
    alignItems: "center",
    justifyContent: "center",
  },
  castrationText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
  },

  joinCtaBox: {
    width: "100%",
    height: 64,
    backgroundColor: "#fff",
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    gap: 2,
    ...shadows.xs,
  },

  joinCtaLabel: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary,
    lineHeight: typography.fontSize.xs + 4,
  },

  countWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  appIcon: { width: 18, height: 18, opacity: 0.9 },
  countText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily.medium,
  },

  location: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },

  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 160,
  },
});

export default PlanCard;