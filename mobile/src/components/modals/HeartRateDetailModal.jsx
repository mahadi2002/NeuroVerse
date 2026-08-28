import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Heart,
  Activity,
  Sparkles,
  ChevronLeft,
  ShieldCheck,
  Watch,
  Wind,
} from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../theme/colors";

export default function HeartRateDetailModal({ visible, onClose, bpm = 72 }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 450,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backBtn} activeOpacity={0.7}>
              <ChevronLeft size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Heart Rate & HRV Coherence</Text>
              <Text style={styles.headerSubtitle}>Vagal tone & autonomic balance</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Heart Rate Banner */}
            <LinearGradient
              colors={["#881337", "#4c0519"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroCard}
            >
              <View style={styles.heroTop}>
                <View>
                  <Text style={styles.heroLabel}>CURRENT RESTING PULSE</Text>
                  <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6 }}>
                    <Text style={styles.heroBpm}>{bpm}</Text>
                    <Text style={styles.heroUnit}>BPM</Text>
                  </View>
                </View>

                {/* Animated Pulsing Heart Icon */}
                <Animated.View style={[styles.heartCircle, { transform: [{ scale: pulseAnim }] }]}>
                  <Heart size={26} color="#FECDD3" fill="#E11D48" />
                </Animated.View>
              </View>

              {/* Simulated ECG Rhythm Wave */}
              <View style={styles.ecgWrapper}>
                <Svg width="100%" height={40} viewBox="0 0 300 40">
                  <Path
                    d="M 0 20 L 40 20 L 50 8 L 60 32 L 70 20 L 110 20 L 120 4 L 130 36 L 140 20 L 190 20 L 200 10 L 210 30 L 220 20 L 300 20"
                    stroke="#FDA4AF"
                    strokeWidth="2.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>

              <Text style={styles.heroFooter}>
                Steady sinus rhythm. Sympathetic activation is low and relaxed.
              </Text>
            </LinearGradient>

            {/* HRV Resilience Meter */}
            <View style={styles.hrvCard}>
              <View style={styles.hrvHeader}>
                <View>
                  <Text style={styles.hrvLabel}>HEART RATE VARIABILITY (HRV)</Text>
                  <Text style={styles.hrvValue}>68 ms <Text style={styles.hrvSub}>RMSSD</Text></Text>
                </View>
                <View style={styles.hrvBadge}>
                  <ShieldCheck size={14} color="#34D399" />
                  <Text style={styles.hrvBadgeText}>High Resilience</Text>
                </View>
              </View>

              <Text style={styles.hrvDesc}>
                Higher HRV indicates healthy adaptability of the parasympathetic brake (vagus nerve), helping you buffer daily stressors smoothly.
              </Text>
            </View>

            {/* Resonance Coherence Practice */}
            <View style={styles.coherenceCard}>
              <View style={styles.coherenceHeader}>
                <Wind size={18} color="#FB7185" />
                <Text style={styles.coherenceTitle}>0.1 Hz Heart Coherence</Text>
              </View>
              <Text style={styles.coherenceText}>
                Synchronize your heart rate with respiratory sinus arrhythmia (RSA) by inhaling for 5.5s and exhaling for 5.5s.
              </Text>

              <View style={styles.coherenceStepsRow}>
                <View style={styles.stepBox}>
                  <Text style={styles.stepNum}>5.5s</Text>
                  <Text style={styles.stepLabel}>Inhale</Text>
                </View>
                <Text style={{ color: "#FDA4AF", fontSize: 16, fontWeight: "700" }}>➔</Text>
                <View style={styles.stepBox}>
                  <Text style={styles.stepNum}>5.5s</Text>
                  <Text style={styles.stepLabel}>Exhale</Text>
                </View>
                <Text style={{ color: "#FDA4AF", fontSize: 16, fontWeight: "700" }}>=</Text>
                <View style={[styles.stepBox, { backgroundColor: "rgba(244, 63, 94, 0.2)" }]}>
                  <Text style={[styles.stepNum, { color: "#FECDD3" }]}>Peak</Text>
                  <Text style={styles.stepLabel}>Coherence</Text>
                </View>
              </View>
            </View>

            {/* Wearables Sync Status */}
            <View style={styles.syncCard}>
              <Watch size={18} color="#94A3B8" />
              <View style={{ flex: 1 }}>
                <Text style={styles.syncTitle}>Smart Wearable Connected</Text>
                <Text style={styles.syncSub}>Synced via Health Connect (Continuous vitals)</Text>
              </View>
              <View style={styles.activeDot} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetContainer: {
    backgroundColor: "#0B1320",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "88%",
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },
  heroCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(225, 29, 72, 0.35)",
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  heroLabel: {
    color: "#FECDD3",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  heroBpm: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
  },
  heroUnit: {
    color: "#FDA4AF",
    fontSize: 14,
    fontWeight: "700",
  },
  heartCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(225, 29, 72, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  ecgWrapper: {
    height: 40,
    marginVertical: 4,
  },
  heroFooter: {
    color: "#FFE4E6",
    fontSize: 12,
    lineHeight: 16,
  },
  hrvCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 10,
  },
  hrvHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  hrvLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  hrvValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  hrvSub: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: "600",
  },
  hrvBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(52, 211, 153, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 5,
  },
  hrvBadgeText: {
    color: "#6EE7B7",
    fontSize: 11,
    fontWeight: "700",
  },
  hrvDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  coherenceCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(225, 29, 72, 0.2)",
    gap: 10,
  },
  coherenceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  coherenceTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  coherenceText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  coherenceStepsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 12,
    borderRadius: 14,
  },
  stepBox: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  stepNum: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  stepLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "600",
  },
  syncCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    gap: 12,
  },
  syncTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  syncSub: {
    color: colors.textMuted,
    fontSize: 11,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#34D399",
  },
});
