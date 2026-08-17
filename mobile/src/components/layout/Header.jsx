import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../theme/colors";
import {
  Bell,
  ShieldAlert,
  Sparkles,
  Activity,
  Heart,
  Moon,
  Zap,
  Smile,
  Droplets,
} from "lucide-react-native";

export default function Header({
  activeTab,
  activeFilter,
  onSelectFilter,
  onOpenProfile,
  onOpenCrisis,
  onOpenNotifications,
  notificationCount = 2,
}) {
  const homeFilters = [
    { id: "all", label: "Overview", icon: Activity },
    { id: "mood", label: "Mind", icon: Smile },
    { id: "sleep", label: "Sleep", icon: Moon },
    { id: "stress", label: "Stress", icon: Zap },
    { id: "heart", label: "Heart", icon: Heart },
    { id: "water", label: "Hydration", icon: Droplets },
  ];

  return (
    <View style={styles.container}>
      {/* Top Brand & Action Row */}
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>NeuroLink</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>AI Active</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          {/* Quick SOS Crisis Button */}
          <TouchableOpacity
            style={styles.sosButton}
            onPress={onOpenCrisis}
            activeOpacity={0.8}
          >
            <ShieldAlert size={15} color="#FB7185" />
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            activeOpacity={0.7}
            onPress={onOpenNotifications}
          >
            <Bell size={18} color="#CBD5E1" />
            {notificationCount > 0 && (
              <View style={styles.badge} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileBtn}
            activeOpacity={0.8}
            onPress={onOpenProfile}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>NL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sub Filter Pills Bar on Home Tab */}
      {activeTab === "home" && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {homeFilters.map((cat) => {
            const isActive = activeFilter === cat.id;
            const Icon = cat.icon;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.filterPill,
                  isActive && styles.filterPillActive,
                ]}
                onPress={() => onSelectFilter(cat.id)}
                activeOpacity={0.7}
              >
                <Icon
                  size={14}
                  color={isActive ? "#FFFFFF" : colors.textMuted}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(139, 92, 246, 0.18)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.35)",
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#A78BFA",
    marginRight: 5,
  },
  liveText: {
    color: "#C4B5FD",
    fontSize: 10,
    fontWeight: "700",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sosButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(225, 29, 72, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(225, 29, 72, 0.4)",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  sosText: {
    color: "#FB7185",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardBgAlt,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "rgba(99, 102, 241, 0.4)",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  filterScroll: {
    paddingHorizontal: 18,
    gap: 8,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  filterPillActive: {
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    borderColor: "#818CF8",
  },
  filterText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#C7D2FE",
    fontWeight: "700",
  },
});

