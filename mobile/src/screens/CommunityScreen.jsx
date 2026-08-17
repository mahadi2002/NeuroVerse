import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Users,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Plus,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react-native";
import { colors } from "../theme/colors";
import { getCommunityPostsApi } from "../services/api";

const CATEGORIES = [
  "All",
  "Anxiety",
  "Exam Stress",
  "Depression",
  "Sleep Problems",
  "General Support",
];

export default function CommunityScreen({ onOpenCreatePost }) {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, [activeCategory]);

  const loadPosts = async () => {
    setLoading(true);
    const data = await getCommunityPostsApi(activeCategory);
    setPosts(data);
    setLoading(false);
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likes: nextLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Banner */}
      <LinearGradient
        colors={["#0f766e", "#134e4a", "#042f2e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <View style={styles.badge}>
          <Users size={12} color="#5EEAD4" />
          <Text style={styles.badgeText}>SAFE SPACE & PEER SUPPORT</Text>
        </View>
        <Text style={styles.headerTitle}>NeuroLink Community</Text>
        <Text style={styles.headerSubtitle}>
          Share experiences, celebrate recovery milestones, or seek anonymous comfort in a moderated safe space.
        </Text>
      </LinearGradient>

      {/* Category Pills & Post Action */}
      <View style={styles.controlsRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryPills}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                activeCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  activeCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.createPostBtn}
          onPress={onOpenCreatePost}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#0D9488", "#14B8A6"]}
            style={styles.createPostGradient}
          >
            <Plus size={16} color="#FFFFFF" />
            <Text style={styles.createPostBtnText}>Post</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Posts Feed */}
      {loading ? (
        <ActivityIndicator color="#14B8A6" style={{ marginVertical: 30 }} />
      ) : (
        <View style={styles.feedList}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              {/* Post Header */}
              <View style={styles.postHeader}>
                <View style={styles.authorRow}>
                  <View
                    style={[
                      styles.avatarCircle,
                      post.isAnonymous && styles.anonAvatarCircle,
                    ]}
                  >
                    {post.isAnonymous ? (
                      <Shield size={16} color="#5EEAD4" />
                    ) : (
                      <Text style={styles.avatarInitials}>
                        {post.author.charAt(0)}
                      </Text>
                    )}
                  </View>
                  <View>
                    <View style={styles.authorNameRow}>
                      <Text style={styles.authorName}>{post.author}</Text>
                      {post.isAnonymous && (
                        <View style={styles.anonBadge}>
                          <Text style={styles.anonBadgeText}>Anon</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.timeText}>{post.createdAt}</Text>
                  </View>
                </View>

                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{post.category}</Text>
                </View>
              </View>

              {/* Title & Body */}
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent}>{post.content}</Text>

              {/* Actions Footer */}
              <View style={styles.postFooter}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    post.isLiked && styles.actionButtonLiked,
                  ]}
                  onPress={() => toggleLike(post.id)}
                >
                  <Heart
                    size={16}
                    color={post.isLiked ? "#F43F5E" : colors.textMuted}
                    fill={post.isLiked ? "#F43F5E" : "transparent"}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      post.isLiked && { color: "#F43F5E", fontWeight: "700" },
                    ]}
                  >
                    {post.likes}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <MessageSquare size={16} color={colors.textMuted} />
                  <Text style={styles.actionText}>{post.commentsCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Bookmark size={16} color={colors.textMuted} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Share2 size={16} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 110,
  },
  headerCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(20, 184, 166, 0.2)",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20, 184, 166, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
    gap: 6,
  },
  badgeText: {
    color: "#5EEAD4",
    fontSize: 11,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#CCFBF1",
    lineHeight: 18,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 8,
  },
  categoryPills: {
    flexDirection: "row",
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  categoryChipActive: {
    backgroundColor: "rgba(20, 184, 166, 0.15)",
    borderColor: "#14B8A6",
  },
  categoryChipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  categoryChipTextActive: {
    color: "#5EEAD4",
    fontWeight: "700",
  },
  createPostBtn: {
    borderRadius: 16,
    overflow: "hidden",
  },
  createPostGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  createPostBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  feedList: {
    gap: 14,
  },
  postCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
  },
  anonAvatarCircle: {
    backgroundColor: "rgba(20, 184, 166, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(20, 184, 166, 0.4)",
  },
  avatarInitials: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  authorNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  authorName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  anonBadge: {
    backgroundColor: "rgba(20, 184, 166, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  anonBadgeText: {
    color: "#5EEAD4",
    fontSize: 10,
    fontWeight: "700",
  },
  timeText: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 1,
  },
  categoryBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryBadgeText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "600",
  },
  postTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    marginBottom: 6,
  },
  postContent: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionButtonLiked: {
    backgroundColor: "rgba(244, 63, 94, 0.1)",
    borderRadius: 8,
  },
  actionText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
});
