import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  PhoneCall,
  ShieldAlert,
  HeartHandshake,
  Wind,
  Eye,
  Hand,
  Ear,
  Sparkles,
  RefreshCw,
  Play,
  Pause,
  AlertTriangle,
} from "lucide-react-native";
import { colors } from "../theme/colors";

const { width } = Dimensions.get("window");

const HOTLINES = [
  {
    name: "National Crisis & Suicide Lifeline",
    number: "988",
    tel: "tel:988",
    desc: "Free, confidential 24/7 support for anyone in emotional distress or suicidal crisis.",
    badge: "24/7 Toll-Free",
    highlight: true,
  },
  {
    name: "Immediate Emergency Services",
    number: "999 / 911",
    tel: "tel:999",
    desc: "For life-threatening physical emergencies and urgent paramedic intervention.",
    badge: "Urgent",
    highlight: false,
  },
  {
    name: "Kaan Pete Roi Helpline",
    number: "+8801779554391",
    tel: "tel:+8801779554391",
    desc: "First emotional support helpline in Bangladesh offering caring, anonymous listening.",
    badge: "Compassionate Support",
    highlight: false,
  },
  {
    name: "Crisis Text Line",
    number: "SMS: HOME to 741741",
    tel: "sms:741741?body=HOME",
    desc: "Connect with a trained crisis counselor 24/7 over secure text messaging.",
    badge: "Text 24/7",
    highlight: false,
  },
];

const GROUNDING_STEPS = [
  { count: "5", label: "Things you can SEE around you", icon: Eye, desc: "A clock, a pattern on the wall, your shoes, sunlight..." },
  { count: "4", label: "Things you can physically TOUCH", icon: Hand, desc: "The fabric of your pants, cold water, a desk surface..." },
  { count: "3", label: "Things you can HEAR", icon: Ear, desc: "Air conditioner, passing cars, distant bird chirps..." },
  { count: "2", label: "Things you can SMELL", icon: Wind, desc: "Coffee, fresh air, your jacket, hand sanitizer..." },
  { count: "1", label: "Positive thing you can TASTE or SAY", icon: Sparkles, desc: "Take a sip of water or say: 'I am safe in this moment.'" },
];

export default function CrisisScreen() {
  // 4-7-8 Breathing state
  const [breathPhase, setBreathPhase] = useState("Inhale (4s)");
  const [timerCount, setTimerCount] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setTimerCount((prev) => {
          if (prev <= 1) {
            if (breathPhase.startsWith("Inhale")) {
              setBreathPhase("Hold (7s)");
              return 7;
            } else if (breathPhase.startsWith("Hold")) {
              setBreathPhase("Exhale (8s)");
              return 8;
            } else {
              setBreathPhase("Inhale (4s)");
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathPhase]);

  const handleCall = (url) => {
    Linking.openURL(url).catch((err) =>
      console.warn("Could not open dialer", err)
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Critical Alert Card */}
      <LinearGradient
        colors={["#881337", "#9f1239", "#4c0519"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.alertCard}
      >
        <View style={styles.alertHeader}>
          <ShieldAlert size={28} color="#FDA4AF" />
          <View style={styles.alertHeaderText}>
            <Text style={styles.alertTitle}>Immediate Support & Safety</Text>
            <Text style={styles.alertSubtitle}>
              You are never alone. Confidential crisis counselors are available right now.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => handleCall("tel:988")}
          activeOpacity={0.85}
        >
          <PhoneCall size={20} color="#881337" />
          <Text style={styles.sosButtonText}>Call 988 Crisis Lifeline Now</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* 4-7-8 Panic Relief Breathing Reset */}
      <View style={styles.panicCard}>
        <View style={styles.panicHeader}>
          <View style={styles.panicBadge}>
            <Wind size={14} color="#38BDF8" />
            <Text style={styles.panicBadgeText}>SOMATIC VAGUS RESET</Text>
          </View>
          <Text style={styles.panicTitle}>4-7-8 Panic Relief Breathing</Text>
          <Text style={styles.panicSubtitle}>
            Calm your sympathetic fight-or-flight nervous system in under 2 minutes.
          </Text>
        </View>

        {/* Breathing Animated Circle */}
        <View style={styles.breathingContainer}>
          <View
            style={[
              styles.breathingOuterCircle,
              breathPhase.startsWith("Inhale") && styles.breathingInhale,
              breathPhase.startsWith("Hold") && styles.breathingHold,
              breathPhase.startsWith("Exhale") && styles.breathingExhale,
            ]}
          >
            <Text style={styles.breathPhaseText}>{breathPhase}</Text>
            <Text style={styles.timerCountText}>{timerCount}</Text>
          </View>
        </View>

        {/* Controls */}
        <TouchableOpacity
          style={styles.breathingBtn}
          onPress={() => setIsBreathingActive(!isBreathingActive)}
        >
          <LinearGradient
            colors={isBreathingActive ? ["#475569", "#334155"] : ["#0284C7", "#0369A1"]}
            style={styles.breathingBtnGradient}
          >
            {isBreathingActive ? (
              <Pause size={16} color="#FFFFFF" />
            ) : (
              <Play size={16} color="#FFFFFF" />
            )}
            <Text style={styles.breathingBtnText}>
              {isBreathingActive ? "Pause Exercise" : "Start Guided Breathing"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 5-4-3-2-1 Sensory Grounding Guide */}
      <View style={styles.groundingCard}>
        <View style={styles.sectionHeaderRow}>
          <HeartHandshake size={18} color="#34D399" />
          <Text style={styles.groundingTitle}>5-4-3-2-1 Grounding Technique</Text>
        </View>
        <Text style={styles.groundingSubtitle}>
          Anchor your racing mind back into physical reality step-by-step:
        </Text>

        <View style={styles.groundingStepsList}>
          {GROUNDING_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <View key={idx} style={styles.groundingStepItem}>
                <View style={styles.stepNumBadge}>
                  <Text style={styles.stepNumText}>{step.count}</Text>
                </View>
                <View style={styles.stepDetails}>
                  <View style={styles.stepLabelRow}>
                    <Icon size={14} color="#38BDF8" />
                    <Text style={styles.stepLabel}>{step.label}</Text>
                  </View>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Hotline Directory List */}
      <Text style={styles.sectionTitle}>24/7 Verified Crisis Helplines</Text>
      <View style={styles.hotlinesList}>
        {HOTLINES.map((hotline, i) => (
          <View key={i} style={styles.hotlineCard}>
            <View style={styles.hotlineHeader}>
              <View style={styles.hotlineMeta}>
                <Text style={styles.hotlineName}>{hotline.name}</Text>
                <View style={styles.badgeSmall}>
                  <Text style={styles.badgeSmallText}>{hotline.badge}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.callCircleBtn}
                onPress={() => handleCall(hotline.tel)}
              >
                <PhoneCall size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.hotlineDesc}>{hotline.desc}</Text>
            <TouchableOpacity
              style={styles.hotlineActionRow}
              onPress={() => handleCall(hotline.tel)}
            >
              <Text style={styles.hotlineNumberText}>{hotline.number}</Text>
              <Text style={styles.tapToCallText}>Tap to Connect →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 110,
  },
  alertCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(251, 113, 133, 0.3)",
  },
  alertHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 16,
  },
  alertHeaderText: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 13,
    color: "#FDA4AF",
    lineHeight: 18,
  },
  sosButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    gap: 8,
  },
  sosButtonText: {
    color: "#881337",
    fontSize: 15,
    fontWeight: "800",
  },
  panicCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  panicHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  panicBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 8,
    gap: 6,
  },
  panicBadgeText: {
    color: "#38BDF8",
    fontSize: 11,
    fontWeight: "700",
  },
  panicTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  panicSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  breathingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  breathingOuterCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(2, 132, 199, 0.15)",
    borderWidth: 4,
    borderColor: "#0284C7",
    alignItems: "center",
    justifyContent: "center",
  },
  breathingInhale: {
    borderColor: "#38BDF8",
    backgroundColor: "rgba(56, 189, 248, 0.25)",
    transform: [{ scale: 1.05 }],
  },
  breathingHold: {
    borderColor: "#F59E0B",
    backgroundColor: "rgba(245, 158, 11, 0.25)",
  },
  breathingExhale: {
    borderColor: "#10B981",
    backgroundColor: "rgba(16, 185, 129, 0.25)",
    transform: [{ scale: 0.95 }],
  },
  breathPhaseText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  timerCountText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
  },
  breathingBtn: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 8,
  },
  breathingBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  breathingBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  groundingCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  groundingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  groundingSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  groundingStepsList: {
    gap: 12,
  },
  groundingStepItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 16,
    padding: 12,
    gap: 12,
  },
  stepNumBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    borderWidth: 1,
    borderColor: "#38BDF8",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumText: {
    color: "#38BDF8",
    fontWeight: "800",
    fontSize: 14,
  },
  stepDetails: {
    flex: 1,
  },
  stepLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  stepDesc: {
    fontSize: 11,
    color: colors.textMuted,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 12,
  },
  hotlinesList: {
    gap: 12,
  },
  hotlineCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  hotlineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  hotlineMeta: {
    flex: 1,
    paddingRight: 10,
  },
  hotlineName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  badgeSmall: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  badgeSmallText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "600",
  },
  callCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E11D48",
    alignItems: "center",
    justifyContent: "center",
  },
  hotlineDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 10,
  },
  hotlineActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  hotlineNumberText: {
    color: "#FDA4AF",
    fontSize: 13,
    fontWeight: "700",
  },
  tapToCallText: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "600",
  },
});
