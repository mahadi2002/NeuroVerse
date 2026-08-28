import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

export default function StepsCard({
  steps = 822,
  stepGoal = 6000,
  onSelectActivity,
}) {
  const progress = Math.min(1, steps / stepGoal);

  return (
    <View style={styles.container}>
      {/* Left: Steps Progress */}
      <View style={styles.leftCol}>
        <Text style={styles.label}>Steps</Text>
        <Text style={styles.stepCount}>{steps.toLocaleString()}</Text>
        <Text style={styles.goalText}>
          {stepGoal.toLocaleString()} steps
        </Text>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progress * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Right: Quick Activity Start Buttons */}
      <View style={styles.rightCol}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.activityBtn, { backgroundColor: "#65A30D" }]}
            activeOpacity={0.8}
            onPress={() => onSelectActivity && onSelectActivity("walk")}
          >
            <FontAwesome5 name="walking" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.activityBtn, { backgroundColor: "#84CC16" }]}
            activeOpacity={0.8}
            onPress={() => onSelectActivity && onSelectActivity("run")}
          >
            <FontAwesome5 name="running" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.activityBtn, { backgroundColor: "#EA580C" }]}
            activeOpacity={0.8}
            onPress={() => onSelectActivity && onSelectActivity("bike")}
          >
            <Ionicons name="bicycle" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.activityBtn, { backgroundColor: "#475569" }]}
            activeOpacity={0.8}
            onPress={() => onSelectActivity && onSelectActivity("more")}
          >
            <Ionicons name="list" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  leftCol: {
    flex: 1.1,
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  stepCount: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.textPrimary,
    marginVertical: 4,
  },
  goalText: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 12,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 4,
  },
  rightCol: {
    flex: 0.9,
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: "center",
    gap: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
  },
  activityBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
