import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Moon,
  Sparkles,
  ChevronLeft,
  Volume2,
  VolumeX,
  Plus,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react-native";
import { colors } from "../../theme/colors";

export default function SleepDetailModal({ visible, onClose }) {
  const [activeSound, setActiveSound] = useState("rain");
  const [isPlaying, setIsPlaying] = useState(false);

  const soundscapes = [
    { id: "rain", label: "Night Rain", desc: "Pink noise for deep sleep" },
    { id: "delta", label: "Delta Waves (2Hz)", desc: "Deep restorative slow-wave frequency" },
    { id: "ocean", label: "Pacific Tides", desc: "Rhythmic wave cadence" },
    { id: "zen", label: "Theta Meditation", desc: "Subconscious de-stressing" },
  ];

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
              <Text style={styles.headerTitle}>Sleep & Circadian Rhythm</Text>
              <Text style={styles.headerSubtitle}>Restorative recovery & REM architecture</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Sleep Score Banner */}
            <LinearGradient
              colors={["#1e1b4b", "#312e81"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.scoreCard}
            >
              <View style={styles.scoreTop}>
                <View>
                  <Text style={styles.scoreLabel}>LAST NIGHT'S SLEEP</Text>
                  <Text style={styles.scoreValue}>7h 32m</Text>
                </View>
                <View style={styles.scoreBadge}>
                  <Moon size={14} color="#C4B5FD" />
                  <Text style={styles.scoreBadgeText}>Score: 84 (Optimal)</Text>
                </View>
              </View>

              {/* Sleep Phase Breakdown Bar */}
              <View style={styles.phaseBarRow}>
                <View style={[styles.phaseSeg, { flex: 24, backgroundColor: "#6366F1" }]} />
                <View style={[styles.phaseSeg, { flex: 28, backgroundColor: "#A855F7" }]} />
                <View style={[styles.phaseSeg, { flex: 48, backgroundColor: "#38BDF8" }]} />
              </View>

              <View style={styles.phaseLabelsRow}>
                <View style={styles.phaseDotItem}>
                  <View style={[styles.dot, { backgroundColor: "#6366F1" }]} />
                  <Text style={styles.phaseText}>Deep (1h 48m)</Text>
                </View>
                <View style={styles.phaseDotItem}>
                  <View style={[styles.dot, { backgroundColor: "#A855F7" }]} />
                  <Text style={styles.phaseText}>REM (2h 04m)</Text>
                </View>
                <View style={styles.phaseDotItem}>
                  <View style={[styles.dot, { backgroundColor: "#38BDF8" }]} />
                  <Text style={styles.phaseText}>Light (3h 40m)</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Neural Insights */}
            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Sparkles size={16} color="#A78BFA" />
                <Text style={styles.insightTitle}>Cognitive Recovery Insight</Text>
              </View>
              <Text style={styles.insightBody}>
                Your 2h 04m of REM sleep is in the top 10% for emotional consolidation. This supports neuroplasticity, memory encoding, and emotional resilience for today.
              </Text>
            </View>

            {/* Ambient Sleep Soundscapes */}
            <View style={styles.soundCard}>
              <View style={styles.soundHeaderRow}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Volume2 size={18} color="#C4B5FD" />
                  <Text style={styles.soundTitle}>Sleep Soundscapes</Text>
                </View>
                <TouchableOpacity
                  style={[styles.playToggleBtn, isPlaying && styles.playToggleBtnActive]}
                  onPress={() => setIsPlaying(!isPlaying)}
                  activeOpacity={0.8}
                >
                  {isPlaying ? (
                    <VolumeX size={14} color="#FFFFFF" />
                  ) : (
                    <Volume2 size={14} color="#C4B5FD" />
                  )}
                  <Text style={styles.playToggleText}>
                    {isPlaying ? "Pause Ambient" : "Play Sound"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.soundList}>
                {soundscapes.map((s) => {
                  const isSelected = activeSound === s.id;
                  return (
                    <TouchableOpacity
                      key={s.id}
                      style={[styles.soundItem, isSelected && styles.soundItemActive]}
                      onPress={() => setActiveSound(s.id)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.soundItemMeta}>
                        <Text style={[styles.soundName, isSelected && styles.soundNameActive]}>
                          {s.label}
                        </Text>
                        <Text style={styles.soundDesc}>{s.desc}</Text>
                      </View>
                      {isSelected && (
                        <View style={styles.activeCheckDot}>
                          <View style={styles.innerDot} />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Quick Log Sleep Button */}
            <TouchableOpacity style={styles.logBtn} onPress={onClose} activeOpacity={0.85}>
              <LinearGradient
                colors={["#4f46e5", "#6366f1"]}
                style={styles.logGradient}
              >
                <Clock size={16} color="#FFFFFF" />
                <Text style={styles.logBtnText}>Log New Sleep Session</Text>
              </LinearGradient>
            </TouchableOpacity>
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
  scoreCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.35)",
  },
  scoreTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  scoreLabel: {
    color: "#C7D2FE",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  scoreValue: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
  },
  scoreBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(167, 139, 250, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  scoreBadgeText: {
    color: "#E9D5FF",
    fontSize: 11,
    fontWeight: "700",
  },
  phaseBarRow: {
    height: 8,
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden",
    gap: 2,
    marginBottom: 10,
  },
  phaseSeg: {
    height: "100%",
    borderRadius: 2,
  },
  phaseLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  phaseDotItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  phaseText: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "600",
  },
  insightCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(167, 139, 250, 0.2)",
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  insightTitle: {
    color: "#E9D5FF",
    fontSize: 13,
    fontWeight: "700",
  },
  insightBody: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  soundCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 12,
  },
  soundHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  soundTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  playToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(167, 139, 250, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 5,
  },
  playToggleBtnActive: {
    backgroundColor: "#6366F1",
  },
  playToggleText: {
    color: "#E9D5FF",
    fontSize: 11,
    fontWeight: "700",
  },
  soundList: {
    gap: 8,
  },
  soundItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  soundItemActive: {
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    borderColor: "#818CF8",
  },
  soundItemMeta: {
    flex: 1,
  },
  soundName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },
  soundNameActive: {
    color: "#C7D2FE",
  },
  soundDesc: {
    color: colors.textMuted,
    fontSize: 11,
  },
  activeCheckDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#818CF8",
    alignItems: "center",
    justifyContent: "center",
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#818CF8",
  },
  logBtn: {
    borderRadius: 16,
    overflow: "hidden",
  },
  logGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  logBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
