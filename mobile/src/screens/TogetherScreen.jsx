import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { colors } from "../theme/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TogetherScreen() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      author: "Alex W.",
      badge: "Verified Member",
      time: "2h ago",
      tag: "Sleep Routine",
      content:
        "Started doing 10 minutes of box breathing with Aria before sleeping and my sleep score went from 68 to 86 in 4 days! Anyone else tried this?",
      likes: 34,
      replies: 12,
      isLiked: false,
    },
    {
      id: "2",
      author: "Elena R.",
      badge: "Student",
      time: "5h ago",
      tag: "Stress Relief",
      content:
        "Finals week has been overwhelming, but taking 5-min walk breaks whenever my heart rate spikes helped me stay grounded. We got this!",
      likes: 58,
      replies: 19,
      isLiked: true,
    },
    {
      id: "3",
      author: "Marcus K.",
      badge: "Wellness Coach",
      time: "1d ago",
      tag: "Daily Motivation",
      content:
        "Remember: consistency beats intensity every time. 2,000 steps today is infinitely better than 0 steps waiting for the 'perfect day'.",
      likes: 112,
      replies: 28,
      isLiked: false,
    },
  ]);

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Title Header */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.screenTitle}>Together</Text>
          <Text style={styles.screenSubtitle}>NeuroLink Community & Safe Space</Text>
        </View>

        <TouchableOpacity style={styles.newPostBtn} activeOpacity={0.8}>
          <Ionicons name="create-outline" size={18} color="#FFFFFF" />
          <Text style={styles.newPostText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Community Topic Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
      >
        {["All Discussions", "Sleep Hacks", "Mindfulness", "Fitness Goals", "Q&A"].map(
          (topic, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.topicChip, i === 0 && styles.topicChipActive]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.topicChipText,
                  i === 0 && styles.topicChipTextActive,
                ]}
              >
                {topic}
              </Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Posts Feed */}
      <View style={styles.feedContainer}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Author Row */}
            <View style={styles.postHeader}>
              <View style={styles.authorGroup}>
                <View style={styles.authorAvatar}>
                  <Text style={styles.avatarInitial}>{post.author[0]}</Text>
                </View>
                <View>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <Text style={styles.postTime}>
                    {post.time} • {post.badge}
                  </Text>
                </View>
              </View>

              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{post.tag}</Text>
              </View>
            </View>

            {/* Post Content */}
            <Text style={styles.postContent}>{post.content}</Text>

            {/* Actions Bar */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.actionBtn}
                activeOpacity={0.7}
                onPress={() => toggleLike(post.id)}
              >
                <Ionicons
                  name={post.isLiked ? "heart" : "heart-outline"}
                  size={18}
                  color={post.isLiked ? "#EF4444" : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.actionCount,
                    post.isLiked && { color: "#EF4444" },
                  ]}
                >
                  {post.likes}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                <Ionicons
                  name="chatbubble-outline"
                  size={17}
                  color={colors.textSecondary}
                />
                <Text style={styles.actionCount}>{post.replies}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                <Ionicons
                  name="share-social-outline"
                  size={17}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Bottom padding for floating bar */}
      <View style={{ height: 110 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  screenSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  newPostBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  newPostText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  chipsScroll: {
    gap: 8,
    marginBottom: 20,
  },
  topicChip: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  topicChipActive: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    borderColor: "#3B82F6",
  },
  topicChipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  topicChipTextActive: {
    color: "#60A5FA",
    fontWeight: "700",
  },
  feedContainer: {
    gap: 14,
  },
  postCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  authorGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  postTime: {
    fontSize: 11,
    color: colors.textMuted,
  },
  tagBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  postContent: {
    fontSize: 14,
    color: "#E2E8F0",
    lineHeight: 21,
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
    paddingTop: 12,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionCount: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "600",
  },
});
