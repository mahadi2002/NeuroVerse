import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import {
  Sparkles,
  Smile,
  Flame,
  Stethoscope,
  Users,
  GraduationCap,
  Home,
  Plus,
} from "lucide-react-native";

export default function FloatingBottomBar({
  activeTab,
  onSelectTab,
  onOpenQuickAdd,
  onOpenAria,
}) {
  const insets = useSafeAreaInsets();
  const bottomOffset = insets.bottom > 0 ? insets.bottom : 8;

  const tabs = [
    { id: "home", label: "Today", icon: Home },
    { id: "mood", label: "Mood", icon: Smile },
    { id: "habits", label: "Habits", icon: Flame },
    { id: "therapists", label: "Therapists", icon: Stethoscope },
    { id: "community", label: "Community", icon: Users },
    { id: "courses", label: "Learn", icon: GraduationCap },
  ];

  return (
    <View style={[styles.outerWrapper, { bottom: bottomOffset }]}>
      <View style={styles.pillContainer}>
        {/* Navigation Tabs */}
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => onSelectTab(tab.id)}
              activeOpacity={0.75}
            >
              <Icon
                size={18}
                color={isActive ? "#FFFFFF" : colors.textMuted}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <Text
                style={[styles.tabLabel, isActive && styles.activeTabLabel]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Aria AI Companion Quick Button */}
        <TouchableOpacity
          style={[styles.ariaButton, activeTab === "aria" && styles.activeAriaButton]}
          onPress={onOpenAria}
          activeOpacity={0.8}
        >
          <View style={styles.ariaIconWrapper}>
            <Sparkles size={16} color="#A78BFA" />
          </View>
        </TouchableOpacity>

        {/* Floating Quick Add Button */}
        <TouchableOpacity
          style={styles.quickAddButton}
          onPress={onOpenQuickAdd}
          activeOpacity={0.85}
        >
          <Plus size={20} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    position: "absolute",
    bottom: 18,
    left: 12,
    right: 12,
    alignItems: "center",
    zIndex: 100,
  },
  pillContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    borderRadius: 32,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
    width: "100%",
    justifyContent: "space-between",
  },
  tabButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 16,
  },
  activeTabButton: {
    backgroundColor: "rgba(99, 102, 241, 0.25)",
  },
  tabLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  activeTabLabel: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  ariaButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  activeAriaButton: {
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    borderRadius: 16,
  },
  ariaIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(139, 92, 246, 0.5)",
  },
  quickAddButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});

