import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  User,
  Mail,
  Flame,
  Calendar,
  Phone,
  Shield,
  Bell,
  CloudSync,
  LogOut,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react-native";
import { colors } from "../theme/colors";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen({ visible, onClose }) {
  const { user, isGuest, logout, updateUserProfile } = useAuth();

  const [safetyContact, setSafetyContact] = useState(
    user?.safetyContact || "+1 (555) 234-5678"
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!visible) return null;

  const handleSaveSafetyContact = () => {
    updateUserProfile({ safetyContact });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Account & Settings</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* User Profile Card */}
            <LinearGradient
              colors={["#1e1b4b", "#312e81"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.userCard}
            >
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </Text>
              </View>

              <View style={styles.userInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.userName}>
                    {user?.name || "Guest Explorer"}
                  </Text>
                  {isGuest ? (
                    <View style={styles.guestBadge}>
                      <Text style={styles.guestBadgeText}>Guest</Text>
                    </View>
                  ) : (
                    <View style={styles.memberBadge}>
                      <Sparkles size={10} color="#C7D2FE" />
                      <Text style={styles.memberBadgeText}>Pro Member</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.userEmail}>{user?.email || "Offline"}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Flame size={12} color="#F59E0B" />
                    <Text style={styles.metaText}>
                      {user?.streakDays || 7} Day Streak
                    </Text>
                  </View>
                  <Text style={styles.bulletDot}>•</Text>
                  <View style={styles.metaItem}>
                    <Calendar size={12} color={colors.textMuted} />
                    <Text style={styles.metaText}>
                      Joined {user?.memberSince || "Aug 2026"}
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>

            {/* Emergency Safety Contact */}
            <Text style={styles.sectionHeader}>Emergency Crisis Contact</Text>
            <View style={styles.settingCard}>
              <Text style={styles.settingDesc}>
                Designated trusted contact notified during severe panic or crisis checks.
              </Text>
              <View style={styles.inputRow}>
                <Phone size={16} color="#FB7185" />
                <TextInput
                  style={styles.contactInput}
                  value={safetyContact}
                  onChangeText={setSafetyContact}
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor={colors.textMuted}
                />
                <TouchableOpacity
                  style={styles.saveContactBtn}
                  onPress={handleSaveSafetyContact}
                >
                  <Text style={styles.saveContactText}>
                    {savedSuccess ? "Saved!" : "Save"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Preferences */}
            <Text style={styles.sectionHeader}>Preferences & Privacy</Text>
            <View style={styles.settingCard}>
              <View style={styles.toggleRow}>
                <View style={styles.toggleLabelGroup}>
                  <Bell size={16} color="#818CF8" />
                  <Text style={styles.toggleTitle}>Daily Mood Reminders</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#334155", true: "#6366F1" }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.toggleRow}>
                <View style={styles.toggleLabelGroup}>
                  <Shield size={16} color="#34D399" />
                  <Text style={styles.toggleTitle}>Biometric App Lock</Text>
                </View>
                <Switch
                  value={biometricsEnabled}
                  onValueChange={setBiometricsEnabled}
                  trackColor={{ false: "#334155", true: "#10B981" }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                logout();
                onClose();
              }}
              activeOpacity={0.8}
            >
              <LogOut size={18} color="#EF4444" />
              <Text style={styles.logoutBtnText}>
                {isGuest ? "Exit Guest Mode" : "Sign Out"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "85%",
    paddingBottom: 24,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.3)",
    marginBottom: 20,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  userName: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(99, 102, 241, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  memberBadgeText: {
    color: "#C7D2FE",
    fontSize: 10,
    fontWeight: "700",
  },
  guestBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  guestBadgeText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  bulletDot: {
    color: colors.textMuted,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textSecondary,
    marginBottom: 8,
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  settingCard: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    marginBottom: 18,
  },
  settingDesc: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 10,
  },
  contactInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    paddingVertical: 6,
  },
  saveContactBtn: {
    backgroundColor: "#FB7185",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveContactText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  toggleLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  toggleTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    marginVertical: 10,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.25)",
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
    marginTop: 8,
  },
  logoutBtnText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },
});
