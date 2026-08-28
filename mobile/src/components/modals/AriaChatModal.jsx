import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../theme/colors";
import {
  Sparkles,
  Send,
  Trash2,
  X,
  Mic,
  Volume2,
  VolumeX,
  Brain,
  Headphones,
} from "lucide-react-native";
import { chatWithAria } from "../../services/api";

export default function AriaChatModal({
  visible,
  onClose,
  onOpenVoiceMode,
  userMetrics = {},
}) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! I'm Aria, your AI wellness companion. I'm here to listen, support, and help you find calm. Remember, I'm an AI companion, not a medical therapist. What's on your mind today?",
      time: "Just now",
      isPlayingAudio: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef();

  const suggestionChips = [
    "I'm feeling a bit anxious today 🌿",
    "Guide me through a breathing exercise 🧘",
    "How does my sleep affect my mood? 🌙",
    "Tips to boost my focus today ⚡",
  ];

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatWithAria(
        newHistory.map((m) => ({ role: m.role, content: m.content })),
        {
          recent_mood: userMetrics.mood || "Calm",
          sleep_hours: userMetrics.sleepHours || 7.5,
          steps_today: userMetrics.steps || 822,
        }
      );

      const ariaMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          response.reply ||
          "I'm right here with you! Take a deep breath in through your nose, hold gently, and exhale.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isPlayingAudio: false,
      };

      setMessages([...newHistory, ariaMsg]);
    } catch (error) {
      const fallbackMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I heard you. Take things one step at a time today. Would you like to do a quick 4-7-8 breathing reset?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isPlayingAudio: false,
      };
      setMessages([...newHistory, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePlayAudio = (msgId) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, isPlayingAudio: !m.isPlayingAudio } : m
      )
    );
  };

  const handleMicTap = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setInput("I need a moment to decompress from today's work stress.");
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Chat cleared! I'm ready whenever you want to talk or unwind. How are you feeling right now?",
        time: "Just now",
        isPlayingAudio: false,
      },
    ]);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onClose} style={styles.iconBtn} activeOpacity={0.7}>
              <X size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.ariaProfile}>
              <View style={styles.ariaAvatar}>
                <Sparkles size={16} color="#A78BFA" />
              </View>
              <View>
                <Text style={styles.ariaName}>Aria</Text>
                <Text style={styles.ariaStatus}>AI Wellness Companion</Text>
              </View>
            </View>
          </View>

          <View style={styles.headerRight}>
            {/* Live Voice Orb Mode Switcher */}
            <TouchableOpacity
              style={styles.voiceOrbBtn}
              onPress={() => {
                onClose();
                if (onOpenVoiceMode) onOpenVoiceMode();
              }}
              activeOpacity={0.8}
            >
              <Headphones size={15} color="#C084FC" />
              <Text style={styles.voiceOrbBtnText}>Voice Orb</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleClear} style={styles.iconBtn} activeOpacity={0.7}>
              <Trash2 size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((item) => {
            const isAria = item.role === "assistant";
            return (
              <View
                key={item.id}
                style={[
                  styles.messageRow,
                  isAria ? styles.ariaRow : styles.userRow,
                ]}
              >
                {isAria && (
                  <View style={styles.messageAvatar}>
                    <Sparkles size={13} color="#A78BFA" />
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    isAria ? styles.ariaBubble : styles.userBubble,
                  ]}
                >
                  <Text style={styles.messageText}>{item.content}</Text>
                  
                  <View style={styles.bubbleFooter}>
                    {isAria && (
                      <TouchableOpacity
                        style={styles.audioToggleBtn}
                        onPress={() => handleTogglePlayAudio(item.id)}
                      >
                        {item.isPlayingAudio ? (
                          <VolumeX size={13} color="#A78BFA" />
                        ) : (
                          <Volume2 size={13} color="#94A3B8" />
                        )}
                        <Text style={styles.audioToggleText}>
                          {item.isPlayingAudio ? "Speaking..." : "Read Aloud"}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <Text style={styles.timestamp}>{item.time}</Text>
                  </View>
                </View>
              </View>
            );
          })}

          {isLoading && (
            <View style={[styles.messageRow, styles.ariaRow]}>
              <View style={styles.messageAvatar}>
                <Sparkles size={13} color="#A78BFA" />
              </View>
              <View style={[styles.messageBubble, styles.ariaBubble, styles.loadingBubble]}>
                <ActivityIndicator size="small" color="#A78BFA" />
                <Text style={styles.loadingText}>Aria is reflecting...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Suggestion Chips */}
        <View style={styles.suggestionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
            {suggestionChips.map((chip, index) => (
              <TouchableOpacity
                key={index}
                style={styles.chip}
                activeOpacity={0.7}
                onPress={() => handleSend(chip)}
              >
                <Text style={styles.chipText}>{chip}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={isRecording ? "Listening to your voice..." : "Talk to Aria (e.g. feeling stressed)..."}
            placeholderTextColor={isRecording ? "#F43F5E" : colors.textMuted}
            value={input}
            onChangeText={setInput}
            multiline
          />

          <TouchableOpacity
            style={[
              styles.micBtn,
              isRecording && styles.micBtnActive,
            ]}
            onPress={handleMicTap}
            activeOpacity={0.8}
          >
            <Mic size={18} color={isRecording ? "#FFFFFF" : "#A78BFA"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sendBtn,
              input.trim().length > 0 && styles.sendBtnActive,
            ]}
            onPress={() => handleSend()}
            disabled={!input.trim() || isLoading}
            activeOpacity={0.8}
          >
            <Send size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 54,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  voiceOrbBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(192, 132, 252, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(192, 132, 252, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 5,
  },
  voiceOrbBtnText: {
    color: "#E9D5FF",
    fontSize: 11,
    fontWeight: "700",
  },
  ariaProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ariaAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(139, 92, 246, 0.25)",
    borderWidth: 1.5,
    borderColor: "#A78BFA",
    alignItems: "center",
    justifyContent: "center",
  },
  ariaName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  ariaStatus: {
    fontSize: 12,
    color: "#C4B5FD",
    fontWeight: "500",
  },
  messagesList: {
    padding: 20,
    gap: 16,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  ariaRow: {
    justifyContent: "flex-start",
  },
  userRow: {
    justifyContent: "flex-end",
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(139, 92, 246, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  ariaBubble: {
    backgroundColor: "#162338",
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.25)",
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: "#4F46E5",
    borderBottomRightRadius: 4,
  },
  bubbleFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  audioToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 2,
  },
  audioToggleText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "600",
  },
  loadingBubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "#A78BFA",
    fontSize: 13,
    fontStyle: "italic",
  },
  messageText: {
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 21,
  },
  timestamp: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.4)",
  },
  suggestionsContainer: {
    paddingVertical: 8,
    backgroundColor: colors.background,
  },
  chipsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: "#172338",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 28,
    backgroundColor: colors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    gap: 8,
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: "#121D2D",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  micBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.3)",
  },
  micBtnActive: {
    backgroundColor: "#EF4444",
    borderColor: "#F87171",
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#475569",
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnActive: {
    backgroundColor: "#6366F1",
  },
});

