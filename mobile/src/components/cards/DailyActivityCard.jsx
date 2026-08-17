import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { colors } from "../../theme/colors";
import {
  Brain,
  Flame,
  Clock,
  Footprints,
  Sparkles,
} from "lucide-react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
  ClipPath,
  G,
  Circle,
} from "react-native-svg";

const AnimatedG = Animated.createAnimatedComponent(G);

export default function DailyActivityCard({
  steps = 822,
  stepGoal = 6000,
  activeMinutes = 8,
  activeGoal = 30,
  calories = 27,
  calorieGoal = 300,
  onPress,
}) {
  const stepPercent = Math.min(1, steps / stepGoal);
  const activePercent = Math.min(1, activeMinutes / activeGoal);
  const calPercent = Math.min(1, calories / calorieGoal);

  // Overall Brain Energy Charge Percentage
  const overallPercent = Math.round(
    ((stepPercent + activePercent + calPercent) / 3) * 100
  );

  const fillLevel = Math.max(8, overallPercent);
  const fillY = 90 - (fillLevel / 100) * 72; // Dynamic liquid level from bottom to top

  // Continuous Live Wave Animations
  const waveAnim1 = useRef(new Animated.Value(0)).current;
  const waveAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Primary front wave loop
    Animated.loop(
      Animated.timing(waveAnim1, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Secondary back wave loop (counter-flow)
    Animated.loop(
      Animated.timing(waveAnim2, {
        toValue: 1,
        duration: 4500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Original Anatomical Brain Silhouette SVG Path (100x100 ViewBox)
  const brainPath =
    "M 50 18 C 42 18 36 21 32 26 C 26 24 19 28 17 35 C 13 38 12 45 15 51 C 11 57 12 65 17 70 C 19 78 27 82 35 81 C 41 84 48 82 50 78 C 52 82 59 84 65 81 C 73 82 81 78 83 70 C 88 65 89 57 85 51 C 88 45 87 38 83 35 C 81 28 74 24 68 26 C 64 21 58 18 50 18 Z";

  // Detailed Brain Hemisphere Grooves & Sulci Lines
  const brainGrooves = [
    // Central Fissure
    "M 50 20 L 50 77",
    // Left Hemisphere Convolutions
    "M 50 30 C 40 28 32 34 32 40 C 32 46 42 46 50 48",
    "M 50 56 C 38 56 26 50 24 58 C 22 66 34 72 48 72",
    "M 34 42 C 26 44 20 48 22 54",
    "M 44 26 C 36 24 28 28 26 34",
    "M 36 68 C 28 72 32 78 40 76",
    // Right Hemisphere Convolutions
    "M 50 30 C 60 28 68 34 68 40 C 68 46 58 46 50 48",
    "M 50 56 C 62 56 74 50 76 58 C 78 66 66 72 52 72",
    "M 66 42 C 74 44 80 48 78 54",
    "M 56 26 C 64 24 72 28 74 34",
    "M 64 68 C 72 72 68 78 60 76",
  ];

  // Wide seamless multi-cycle waves for horizontal sliding
  const frontWideWave = `M -100 ${fillY} Q -75 ${fillY - 4.5} -50 ${fillY} T 0 ${fillY} T 50 ${fillY} T 100 ${fillY} T 150 ${fillY} T 200 ${fillY} L 200 100 L -100 100 Z`;
  const backWideWave = `M -100 ${fillY + 2} Q -75 ${fillY + 6} -50 ${fillY + 2} T 0 ${fillY + 2} T 50 ${fillY + 2} T 100 ${fillY + 2} T 150 ${fillY + 2} T 200 ${fillY + 2} L 200 100 L -100 100 Z`;
  const frontWideCrest = `M -100 ${fillY} Q -75 ${fillY - 4.5} -50 ${fillY} T 0 ${fillY} T 50 ${fillY} T 100 ${fillY} T 150 ${fillY} T 200 ${fillY}`;

  // Interpolations for horizontal wave translation (repeating 100px cycle)
  const translateX1 = waveAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  const translateX2 = waveAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {/* Top Header Badge */}
      <View style={styles.cardTopRow}>
        <View style={styles.cardTitleGroup}>
          <Text style={styles.title}>Neural & Daily Activity</Text>
          <Text style={styles.subtitle}>
            Mind-body charge across movement & vitality
          </Text>
        </View>
      </View>

      <View style={styles.contentRow}>
        {/* Left Column: 3 Health Metrics */}
        <View style={styles.metricsCol}>
          {/* Steps */}
          <View style={styles.metricItem}>
            <View style={[styles.iconDot, { backgroundColor: "rgba(52, 211, 153, 0.18)" }]}>
              <Footprints size={14} color="#34D399" />
            </View>
            <View style={styles.metricTextWrapper}>
              <Text style={styles.metricValue}>
                {steps} <Text style={styles.metricUnit}>/ {stepGoal} steps</Text>
              </Text>
              <View style={styles.miniProgressTrack}>
                <View
                  style={[
                    styles.miniProgressFill,
                    { width: `${stepPercent * 100}%`, backgroundColor: "#34D399" },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Active Time */}
          <View style={styles.metricItem}>
            <View style={[styles.iconDot, { backgroundColor: "rgba(56, 189, 248, 0.18)" }]}>
              <Clock size={14} color="#38BDF8" />
            </View>
            <View style={styles.metricTextWrapper}>
              <Text style={styles.metricValue}>
                {activeMinutes} <Text style={styles.metricUnit}>/ {activeGoal} mins active</Text>
              </Text>
              <View style={styles.miniProgressTrack}>
                <View
                  style={[
                    styles.miniProgressFill,
                    { width: `${activePercent * 100}%`, backgroundColor: "#38BDF8" },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Calories / Burn */}
          <View style={styles.metricItem}>
            <View style={[styles.iconDot, { backgroundColor: "rgba(192, 132, 252, 0.18)" }]}>
              <Flame size={14} color="#C084FC" />
            </View>
            <View style={styles.metricTextWrapper}>
              <Text style={styles.metricValue}>
                {calories} <Text style={styles.metricUnit}>/ {calorieGoal} kcal</Text>
              </Text>
              <View style={styles.miniProgressTrack}>
                <View
                  style={[
                    styles.miniProgressFill,
                    { width: `${calPercent * 100}%`, backgroundColor: "#C084FC" },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Right Column: High-Contrast Brain with LIVE Animated Multi-Color Liquid Waves */}
        <View style={styles.brainContainer}>
          <Svg width={132} height={132} viewBox="0 0 100 100">
            <Defs>
              {/* Luminous Neon Liquid Gradient */}
              <SvgGradient id="liveFluidGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <Stop offset="0%" stopColor="#4F46E5" stopOpacity="1" />
                <Stop offset="30%" stopColor="#7C3AED" stopOpacity="1" />
                <Stop offset="65%" stopColor="#EC4899" stopOpacity="1" />
                <Stop offset="100%" stopColor="#00F0FF" stopOpacity="1" />
              </SvgGradient>

              {/* Secondary Back Wave Liquid Gradient */}
              <SvgGradient id="backFluidGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <Stop offset="0%" stopColor="#312E81" stopOpacity="0.8" />
                <Stop offset="60%" stopColor="#6D28D9" stopOpacity="0.85" />
                <Stop offset="100%" stopColor="#D946EF" stopOpacity="0.9" />
              </SvgGradient>

              {/* Clip Path to keep liquid precisely inside the Brain contour */}
              <ClipPath id="brainClip">
                <Path d={brainPath} />
              </ClipPath>
            </Defs>

            {/* Unfilled Brain Hollow Glass Vessel (High-Contrast Glass Shell) */}
            <Path
              d={brainPath}
              fill="rgba(15, 23, 42, 0.92)"
              stroke="rgba(192, 132, 252, 0.45)"
              strokeWidth="2.2"
            />

            {/* LIVE Animated Liquid Waves (Clipped inside Brain) */}
            <G clipPath="url(#brainClip)">
              {/* Animated Layer 1: Back Wave (Counter-flowing) */}
              <AnimatedG style={{ transform: [{ translateX: translateX2 }] }}>
                <Path d={backWideWave} fill="url(#backFluidGradient)" />
              </AnimatedG>

              {/* Animated Layer 2: Front Primary Colorful Wave */}
              <AnimatedG style={{ transform: [{ translateX: translateX1 }] }}>
                <Path d={frontWideWave} fill="url(#liveFluidGradient)" />

                {/* Bright Luminous Liquid Surface Crest Line */}
                <Path
                  d={frontWideCrest}
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="1"
                />

                {/* Second Cyan Glow Ring under crest */}
                <Path
                  d={frontWideCrest}
                  stroke="#00F0FF"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.6"
                />
              </AnimatedG>
            </G>

            {/* Brain Anatomical Grooves & Neural Fissures */}
            {brainGrooves.map((d, index) => (
              <Path
                key={index}
                d={d}
                stroke={index === 0 ? "rgba(255, 255, 255, 0.55)" : "rgba(255, 255, 255, 0.35)"}
                strokeWidth={index === 0 ? "2" : "1.3"}
                strokeLinecap="round"
                fill="none"
              />
            ))}

            {/* Neural Synapse Glowing Nodes */}
            <Circle cx="36" cy="38" r="2.5" fill="#FFFFFF" />
            <Circle cx="64" cy="38" r="2.5" fill="#FFFFFF" />
            <Circle cx="42" cy="62" r="2.5" fill="#FFFFFF" />
            <Circle cx="58" cy="62" r="2.5" fill="#FFFFFF" />
            <Circle cx="50" cy="48" r="3" fill="#00F0FF" />
          </Svg>

          {/* Bold, Prominent Charge Percentage Readout */}
          <View style={styles.chargeBadgeRow}>
            <Text style={styles.brainChargeText}>{overallPercent}%</Text>
            <Text style={styles.brainChargeSub}>CHARGED</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.25)",
    marginBottom: 16,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardTitleGroup: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textMuted,
  },
  energyBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(192, 132, 252, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(192, 132, 252, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  energyBadgeText: {
    color: "#E9D5FF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metricsCol: {
    flex: 1,
    gap: 12,
    paddingRight: 8,
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  metricTextWrapper: {
    flex: 1,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 3,
  },
  metricUnit: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.textMuted,
  },
  miniProgressTrack: {
    width: "100%",
    maxWidth: 120,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 2,
    overflow: "hidden",
  },
  miniProgressFill: {
    height: "100%",
    borderRadius: 2,
  },
  brainContainer: {
    width: 132,
    alignItems: "center",
    justifyContent: "center",
  },
  chargeBadgeRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginTop: 2,
    backgroundColor: "rgba(124, 58, 237, 0.18)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(192, 132, 252, 0.35)",
  },
  brainChargeText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  brainChargeSub: {
    color: "#C4B5FD",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});

