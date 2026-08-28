import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export function WorkoutsCard({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.gridTile}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#064e3b", "#059669"]}
        style={styles.tileGradient}
      >
        <View style={styles.topTileRow}>
          <Text style={styles.tileTitle}>Workouts this week</Text>
          <View style={styles.badgeCircleGreen}>
            <Ionicons name="timer-outline" size={24} color="#34d399" />
          </View>
        </View>
        <Text style={styles.tileSubtitle}>See your weekly workout totals.</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function SleepCard({ hours = 7.5, score = 84, onPress }) {
  return (
    <TouchableOpacity
      style={styles.gridTile}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#1e1b4b", "#3730a3"]}
        style={styles.tileGradient}
      >
        <View style={styles.topTileRow}>
          <Text style={styles.tileTitle}>Sleep</Text>
          <View style={styles.moonGraphic}>
            <Ionicons name="moon" size={24} color="#C4B5FD" />
          </View>
        </View>
        <Text style={styles.metricValueLarge}>{hours}h</Text>
        <Text style={styles.tileSubtitle}>Score {score} • Optimal REM</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function HeartRateCard({ bpm = 72, onPress }) {
  return (
    <TouchableOpacity
      style={styles.gridTile}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#881337", "#be123c"]}
        style={styles.tileGradient}
      >
        <View style={styles.topTileRow}>
          <Text style={styles.tileTitle}>Heart Rate</Text>
          <View style={styles.heartGraphic}>
            <Ionicons name="heart" size={24} color="#FECDD3" />
          </View>
        </View>
        <Text style={styles.metricValueLarge}>{bpm} <Text style={styles.metricUnitSmall}>BPM</Text></Text>
        <Text style={styles.tileSubtitle}>68ms HRV • Calm Zone</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function StressCard({ stressLevel = "Calm", score = 24, onPress }) {
  return (
    <TouchableOpacity
      style={styles.gridTile}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#78350f", "#b45309"]}
        style={styles.tileGradient}
      >
        <View style={styles.topTileRow}>
          <Text style={styles.tileTitle}>Stress</Text>
          <View style={styles.spiralGraphic}>
            <MaterialCommunityIcons name="weather-windy" size={24} color="#FEF08A" />
          </View>
        </View>
        <Text style={styles.metricValueLarge}>{score}%</Text>
        <Text style={styles.tileSubtitle}>{stressLevel} • 4-7-8 Pacer</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function WaterCard({ waterMl = 750, targetMl = 2000, onAddWater }) {
  const progress = Math.min(1, waterMl / targetMl);
  return (
    <View style={styles.gridTile}>
      <LinearGradient
        colors={["#0c4a6e", "#0284c7"]}
        style={styles.tileGradient}
      >
        <View style={styles.topTileRow}>
          <Text style={styles.tileTitle}>Hydration</Text>
          <TouchableOpacity
            style={styles.waterAddBtn}
            onPress={onAddWater}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={16} color="#38bdf8" />
          </TouchableOpacity>
        </View>

        <Text style={styles.metricValueLarge}>{waterMl.toLocaleString()}</Text>
        <Text style={styles.tileSubtitle}>{targetMl.toLocaleString()} ml Goal</Text>

        <View style={styles.waterProgressBarBg}>
          <View
            style={[
              styles.waterProgressBarFill,
              { width: `${progress * 100}%` },
            ]}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

export function BloodOxygenCard({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.gridTile}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#1e3a8a", "#2563eb"]}
        style={styles.tileGradient}
      >
        <View style={styles.topTileRow}>
          <Text style={styles.tileTitle}>Blood oxygen</Text>
          <View style={styles.oxygenGraphic}>
            <Ionicons name="water" size={26} color="#bfdbfe" />
          </View>
        </View>
        <Text style={styles.tileSubtitle}>Check if you are getting enough oxygen.</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function BloodPressureCard({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.gridTile}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#9f1239", "#e11d48"]}
        style={styles.tileGradient}
      >
        <View style={styles.topTileRow}>
          <Text style={styles.tileTitle}>Blood pressure</Text>
          <View style={styles.pressureGraphic}>
            <MaterialCommunityIcons name="pulse" size={28} color="#fecdd3" />
          </View>
        </View>
        <Text style={styles.tileSubtitle}>Track blood pressure changes.</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gridTile: {
    flex: 1,
    minHeight: 160,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  tileGradient: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  topTileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tileTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    maxWidth: "65%",
  },
  metricValueLarge: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 4,
    marginBottom: 2,
  },
  metricUnitSmall: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.7)",
  },
  tileSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 16,
    fontWeight: "500",
  },
  waterValue: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 6,
  },
  waterTarget: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
  },
  waterAddBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(56, 189, 248, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  waterProgressBarBg: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  waterProgressBarFill: {
    height: "100%",
    backgroundColor: "#38bdf8",
    borderRadius: 3,
  },
  badgeCircleGreen: {
    opacity: 0.9,
  },
  moonGraphic: {
    opacity: 0.9,
  },
  orangeSlice: {
    opacity: 0.9,
  },
  bubbleGraphic: {
    opacity: 0.9,
  },
  flowerGraphic: {
    opacity: 0.9,
  },
  heartGraphic: {
    opacity: 0.9,
  },
  spiralGraphic: {
    opacity: 0.9,
  },
  oxygenGraphic: {
    opacity: 0.9,
  },
  pressureGraphic: {
    opacity: 0.9,
  },
});
