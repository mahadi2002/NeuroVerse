import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { colors } from "../theme/colors";
import { Ionicons, Feather } from "@expo/vector-icons";
import Svg, { Polygon, Line, Circle } from "react-native-svg";

export default function FitnessScreen({ onOpenAria }) {
  const whatsNewVideos = [
    {
      id: "1",
      title: "Daily Stretch for Those Who Sit for Long Hours",
      duration: "16:41",
      channel: "QUAT",
      bgGradient: ["#fef08a", "#eab308"],
      tag: "Mobility",
    },
    {
      id: "2",
      title: "Burn Fat in 10 Minutes with Full-Body",
      duration: "10:36",
      channel: "LILLIUS",
      bgGradient: ["#f472b6", "#db2777"],
      tag: "HIIT",
    },
    {
      id: "3",
      title: "Essential Running Guide 01 - Breathing Method",
      duration: "04:20",
      channel: "NeuroLink",
      bgGradient: ["#bae6fd", "#0284c7"],
      tag: "Breathwork",
    },
  ];

  const homeGymVideos = [
    {
      id: "4",
      title: "Stretching Shower - Full Body Refresh",
      duration: "16:41",
      channel: "QUAT",
      bgGradient: ["#fed7aa", "#f97316"],
      tag: "Recovery",
    },
    {
      id: "5",
      title: "Ballet Burn for Full-Body Posture & Strength",
      duration: "11:45",
      channel: "QUAT",
      bgGradient: ["#ddd6fe", "#8b5cf6"],
      tag: "Strength",
    },
  ];

  // 5-Axis Radar chart polygon points
  const radarPoints = "50,15 85,38 75,80 25,80 15,38";
  const radarFillPoints = "50,25 78,42 68,72 32,70 24,42";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Fitness Title Header */}
      <View style={styles.topRow}>
        <Text style={styles.screenTitle}>Fitness</Text>
        <View style={styles.topActions}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="heart-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="filter-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Fitness Index Radar Chart Card */}
      <View style={styles.fitnessIndexCard}>
        <View style={styles.fitnessIndexLeft}>
          <Text style={styles.indexTitle}>Fitness index</Text>
          <Text style={styles.indexDesc}>
            Get weekly workout targets and content tailored to your training
            focus.
          </Text>
        </View>

        {/* 5-Point Radar Polygon Chart */}
        <View style={styles.radarWrapper}>
          <Svg width={100} height={100} viewBox="0 0 100 100">
            {/* Outer Background Web */}
            <Polygon
              points={radarPoints}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Middle Web */}
            <Polygon
              points="50,30 72,46 64,70 36,70 28,46"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
              fill="none"
            />
            {/* Filled Polygon (Green) */}
            <Polygon
              points={radarFillPoints}
              stroke="#22C55E"
              strokeWidth="2"
              fill="rgba(34, 197, 94, 0.45)"
            />
          </Svg>
        </View>
      </View>

      {/* Section 1: What's New */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>What's new</Text>
          <View style={styles.orangeDot} />
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.videoScroll}
      >
        {whatsNewVideos.map((video) => (
          <TouchableOpacity
            key={video.id}
            style={styles.videoCard}
            activeOpacity={0.85}
          >
            {/* Thumbnail Canvas */}
            <View style={[styles.thumbnail, { backgroundColor: video.bgGradient[0] }]}>
              <View style={styles.playBadge}>
                <Ionicons name="play" size={14} color="#EF4444" />
              </View>
              <Text style={styles.videoTagText}>{video.tag}</Text>
            </View>

            {/* Video Meta */}
            <Text style={styles.videoTitle} numberOfLines={2}>
              {video.title}
            </Text>
            <Text style={styles.videoMeta}>
              {video.duration} • {video.channel}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section 2: Your Home, Your Gym */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Your Home, Your Gym – Train Like a Pro</Text>
          <View style={styles.orangeDot} />
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.videoScroll}
      >
        {homeGymVideos.map((video) => (
          <TouchableOpacity
            key={video.id}
            style={styles.videoCardLarge}
            activeOpacity={0.85}
          >
            {/* Thumbnail */}
            <View style={[styles.thumbnailLarge, { backgroundColor: video.bgGradient[0] }]}>
              <View style={styles.playBadge}>
                <Ionicons name="play" size={16} color="#EF4444" />
              </View>
              <Text style={styles.videoTagText}>{video.tag}</Text>
            </View>

            <Text style={styles.videoTitle} numberOfLines={2}>
              {video.title}
            </Text>
            <Text style={styles.videoMeta}>
              {video.duration} • {video.channel}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  fitnessIndexCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 24,
  },
  fitnessIndexLeft: {
    flex: 1,
    marginRight: 16,
  },
  indexTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  indexDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  radarWrapper: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  orangeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F97316",
  },
  videoScroll: {
    gap: 14,
    marginBottom: 24,
  },
  videoCard: {
    width: 155,
  },
  videoCardLarge: {
    width: 220,
  },
  thumbnail: {
    width: "100%",
    height: 145,
    borderRadius: 20,
    padding: 12,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  thumbnailLarge: {
    width: "100%",
    height: 140,
    borderRadius: 20,
    padding: 12,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  playBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  videoTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1E293B",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 18,
    marginBottom: 4,
  },
  videoMeta: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
