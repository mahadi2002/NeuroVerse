import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bell,
  CheckCircle2,
  Clock,
  Flame,
  Smile,
  Wind,
  Sparkles,
  X,
  Plus,
  Send,
} from "lucide-react-native";
import { colors } from "../../theme/colors";
import {
  DEFAULT_NOTIFICATIONS,
  getScheduledReminders,
  scheduleLocalNotification,
} from "../../services/notificationService";

export default function NotificationsModal({
  visible,
  onClose,
  onActionTrigger,
}) {
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const [reminders, setReminders] = useState(getScheduledReminders());
  const [testNotificationSent, setTestNotificationSent] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox"); // 'inbox' | 'schedules'

  if (!visible) return null;

  const handleToggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSendTestNotification = async () => {
    await scheduleLocalNotification(
      "Aria Mental Wellness Alert 🌿",
      "Notice your breath. Take 3 slow, deep abdominal breaths to release tension."
    );

    const newNotif = {
      id: Date.now().toString(),
      title: "Aria Mindful Reset 🌿",
      body: "Notice your breath. Take 3 slow, deep abdominal breaths to release tension.",
      time: "Just now",
      type: "breathe",
      read: false,
      date: "Today",
    };

    setNotifications([newNotif, ...notifications]);
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  const handleNotificationClick = (item) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    if (onActionTrigger) {
      if (item.type === "mood") onActionTrigger("mood");
      else if (item.type === "habit") onActionTrigger("habits");
      else if (item.type === "breathe") onActionTrigger("crisis");
    }
    onClose();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

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
          <View style={styles.modalHeader}>
            <View style={styles.headerTitleGroup}>
              <Text style={styles.modalTitle}>Wellness Notifications</Text>
              {unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>
                    {unreadCount} New
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Segmented Control */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === "inbox" && styles.tabBtnActive,
              ]}
              onPress={() => setActiveTab("inbox")}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  activeTab === "inbox" && styles.tabBtnTextActive,
                ]}
              >
                Alerts & Inbox
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === "schedules" && styles.tabBtnActive,
              ]}
              onPress={() => setActiveTab("schedules")}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  activeTab === "schedules" && styles.tabBtnTextActive,
                ]}
              >
                Daily Schedules
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {activeTab === "inbox" ? (
              <>
                {/* Actions Row */}
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.testBtn}
                    onPress={handleSendTestNotification}
                    activeOpacity={0.8}
                  >
                    <Send size={13} color="#818CF8" />
                    <Text style={styles.testBtnText}>
                      {testNotificationSent ? "Alert Triggered!" : "Test Notification"}
                    </Text>
                  </TouchableOpacity>

                  {unreadCount > 0 && (
                    <TouchableOpacity onPress={handleMarkAllRead}>
                      <Text style={styles.markReadText}>Mark all as read</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Notifications List */}
                <View style={styles.notificationsList}>
                  {notifications.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.notificationCard,
                        !item.read && styles.notificationCardUnread,
                      ]}
                      onPress={() => handleNotificationClick(item)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.cardHeaderRow}>
                        <View style={styles.iconCircle}>
                          {item.type === "mood" ? (
                            <Smile size={16} color="#818CF8" />
                          ) : item.type === "habit" ? (
                            <Flame size={16} color="#F59E0B" />
                          ) : (
                            <Wind size={16} color="#38BDF8" />
                          )}
                        </View>
                        <View style={styles.cardTitleGroup}>
                          <Text style={styles.cardTitle}>{item.title}</Text>
                          <Text style={styles.cardTime}>{item.time}</Text>
                        </View>
                        {!item.read && <View style={styles.unreadDot} />}
                      </View>

                      <Text style={styles.cardBody}>{item.body}</Text>
                      <Text style={styles.tapActionText}>
                        Tap to open & complete →
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <>
                {/* Reminder Schedules */}
                <Text style={styles.scheduleSubtitle}>
                  Customize when NeuroLink sends your daily mindfulness, habit, and reflection prompts:
                </Text>

                <View style={styles.schedulesList}>
                  {reminders.map((rem) => (
                    <View key={rem.id} style={styles.scheduleCard}>
                      <View style={styles.scheduleInfo}>
                        <Text style={styles.scheduleLabel}>{rem.label}</Text>
                        <View style={styles.timeTagRow}>
                          <Clock size={12} color={colors.textMuted} />
                          <Text style={styles.scheduleTime}>{rem.time}</Text>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.scheduleCategory}>
                            {rem.category}
                          </Text>
                        </View>
                      </View>

                      <Switch
                        value={rem.enabled}
                        onValueChange={() => handleToggleReminder(rem.id)}
                        trackColor={{ false: "#334155", true: "#6366F1" }}
                        thumbColor="#FFFFFF"
                      />
                    </View>
                  ))}
                </View>
              </>
            )}
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
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  unreadBadge: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  unreadBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 14,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 12,
  },
  tabBtnActive: {
    backgroundColor: "rgba(99, 102, 241, 0.25)",
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
  },
  tabBtnTextActive: {
    color: "#C7D2FE",
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  testBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  testBtnText: {
    color: "#C7D2FE",
    fontSize: 11,
    fontWeight: "700",
  },
  markReadText: {
    color: "#94A3B8",
    fontSize: 12,
  },
  notificationsList: {
    gap: 10,
  },
  notificationCard: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  notificationCardUnread: {
    borderColor: "rgba(99, 102, 241, 0.3)",
    backgroundColor: "rgba(99, 102, 241, 0.08)",
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cardTitleGroup: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  cardTime: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6366F1",
  },
  cardBody: {
    fontSize: 12,
    color: "#CBD5E1",
    lineHeight: 18,
    marginBottom: 8,
  },
  tapActionText: {
    fontSize: 11,
    color: "#818CF8",
    fontWeight: "700",
  },
  scheduleSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 14,
  },
  schedulesList: {
    gap: 10,
  },
  scheduleCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  timeTagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  scheduleTime: {
    fontSize: 11,
    color: "#C7D2FE",
    fontWeight: "600",
  },
  bulletDot: {
    color: colors.textMuted,
  },
  scheduleCategory: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
