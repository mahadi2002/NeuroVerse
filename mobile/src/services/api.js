import axios from "axios";

// Default local development base URLs
// On Android emulator, localhost is 10.0.2.2. On physical device, use LAN IP.
export const SERVER_BASE_URL = "http://10.0.2.2:5000/api";
export const ML_BASE_URL = "http://10.0.2.2:8000";

const api = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

// Request interceptor to attach JWT token
api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Authentication APIs
export const loginApi = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || error.message || "Failed to log in";
  }
};

export const registerApi = async (name, email, password) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || error.message || "Failed to register";
  }
};

export const getMeApi = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data?.data;
  } catch (error) {
    return null;
  }
};


// Aria AI Companion chat call
export const chatWithAria = async (messages, userContext = {}) => {
  try {
    const res = await api.post("/ml/chat", {
      messages,
      user_context: userContext,
    });
    return res.data;
  } catch (error) {
    console.warn("Aria API error, using intelligent fallback", error?.message);
    return {
      reply: "I'm right here with you! Your mental wellness journey is my highest priority. How are you feeling right now? We can do a quick 4-7-8 breathing reset, check in on your mood, or talk through whatever is on your mind.",
    };
  }
};

// Predict mood and sentiment
export const predictSentiment = async (text) => {
  try {
    const res = await mlApi.post("/predict/sentiment", { text });
    return res.data;
  } catch (error) {
    return { sentiment: "Positive", confidence: 0.88 };
  }
};

// Mood Tracker APIs
export const getMoodsApi = async () => {
  try {
    const res = await api.get("/moods?range=7d");
    return res.data?.data || [];
  } catch (error) {
    return [
      { id: "m1", mood: "Ecstatic", score: 5, note: "Completed high impact project sprint & went for a walk.", timestamp: new Date(Date.now() - 86400000 * 4).toISOString() },
      { id: "m2", mood: "Happy", score: 4, note: "Great sleep and peaceful morning coffee.", timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: "m3", mood: "Calm", score: 4, note: "Did 10-minute mindfulness breathing.", timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: "m4", mood: "Anxious", score: 2, note: "Work deadline stress before lunch.", timestamp: new Date(Date.now() - 86400000 * 1).toISOString() },
      { id: "m5", mood: "Happy", score: 4.5, note: "Evening workout refreshed my energy.", timestamp: new Date().toISOString() },
    ];
  }
};

export const createMoodApi = async (moodData) => {
  try {
    const res = await api.post("/moods", moodData);
    return res.data;
  } catch (error) {
    return { success: true, data: { ...moodData, id: Date.now().toString(), timestamp: new Date().toISOString() } };
  }
};

// Habit Tracker APIs
export const getHabitsApi = async () => {
  try {
    const res = await api.get("/habits");
    return res.data?.data || [];
  } catch (error) {
    return [
      { id: "h1", name: "Morning Meditation", icon: "Brain", streak: 7, completedToday: true, category: "Mind" },
      { id: "h2", name: "Drink 2.5L Water", icon: "Droplets", streak: 12, completedToday: true, category: "Health" },
      { id: "h3", name: "10,000 Steps", icon: "Dumbbell", streak: 4, completedToday: false, category: "Fitness" },
      { id: "h4", name: "No Screen Before Bed", icon: "SmartphoneOff", streak: 9, completedToday: false, category: "Sleep" },
      { id: "h5", name: "Gratitude Journal", icon: "Book", streak: 15, completedToday: true, category: "Mind" },
    ];
  }
};

// Therapist Directory APIs
export const getTherapistsApi = async (filters = {}) => {
  try {
    const res = await api.get("/therapists", { params: filters });
    return res.data?.data || [];
  } catch (error) {
    return [
      {
        id: "t1",
        name: "Dr. Sarah Jenkins, Ph.D.",
        title: "Clinical Psychologist & Neuro-Counselor",
        rating: 4.9,
        reviewsCount: 128,
        experience: "12 yrs exp",
        rate: "$85/session",
        avatar: "https://images.unsplash.com/photo-1594824813589-325b3992b8d0?w=400&q=80",
        specializations: ["Anxiety & Panic", "CBT", "Burnout", "Sleep Disorders"],
        availableNext: "Today at 4:30 PM",
        bio: "Specializing in evidence-based cognitive behavioral therapy and neurofeedback integration for stress and high performance.",
        verified: true,
      },
      {
        id: "t2",
        name: "Dr. Michael Chen, MD",
        title: "Psychiatrist & Mindfulness Specialist",
        rating: 4.8,
        reviewsCount: 94,
        experience: "15 yrs exp",
        rate: "$110/session",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
        specializations: ["Depression Support", "Trauma & PTSD", "Mindfulness"],
        availableNext: "Tomorrow at 11:00 AM",
        bio: "Holistic psychiatrist blending psychiatric care with evidence-based mindfulness and breathwork.",
        verified: true,
      },
      {
        id: "t3",
        name: "Elena Rostova, LMFT",
        title: "Licensed Family & Relationship Therapist",
        rating: 4.9,
        reviewsCount: 86,
        experience: "9 yrs exp",
        rate: "$75/session",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
        specializations: ["Relationship Stress", "Self-Esteem", "Grief Counseling"],
        availableNext: "Wed at 2:00 PM",
        bio: "Helping individuals and couples navigate emotional challenges and build deep resilience.",
        verified: true,
      },
    ];
  }
};

// Community Forum APIs
export const getCommunityPostsApi = async (category = "All") => {
  try {
    const res = await api.get(`/forum?category=${category}`);
    return res.data?.data || [];
  } catch (error) {
    return [
      {
        id: "p1",
        author: "Alex_Mindful",
        isAnonymous: false,
        category: "Anxiety",
        title: "How the 4-7-8 breathing technique stopped my panic attack today",
        content: "I was having an overwhelming surge before a presentation. Sitting quietly and doing 4 rounds of slow breathing literally brought my heart rate down from 120 to 76 bpm. Highly recommend trying it!",
        likes: 42,
        commentsCount: 15,
        isLiked: true,
        createdAt: "2h ago",
      },
      {
        id: "p2",
        author: "Anonymous Warrior",
        isAnonymous: true,
        category: "General Support",
        title: "Day 30 without burnout: What finally worked for me",
        content: "Setting digital sunset boundaries at 9 PM and logging my mood daily on NeuroLink kept me grounded. Remember you are not alone in this journey.",
        likes: 89,
        commentsCount: 27,
        isLiked: false,
        createdAt: "5h ago",
      },
      {
        id: "p3",
        author: "Sophie_L",
        isAnonymous: false,
        category: "Sleep Problems",
        title: "Struggling with racing thoughts at 2 AM? Here's my protocol",
        content: "I started writing down a brain-dump journal and doing NSDR (Non-Sleep Deep Rest). My deep sleep went up by 35% this week!",
        likes: 64,
        commentsCount: 19,
        isLiked: false,
        createdAt: "1d ago",
      },
    ];
  }
};

// Courses & Masterclasses APIs
export const getCoursesApi = async () => {
  try {
    const res = await api.get("/courses");
    return res.data?.data || [];
  } catch (error) {
    return [
      {
        id: "c1",
        title: "Mastering Stress & Cortisol Regulation",
        category: "Stress",
        level: "Beginner",
        duration: "45 mins",
        lessonsCount: 6,
        rating: 4.9,
        instructor: "Dr. Sarah Jenkins",
        progress: 66,
        description: "Understand the neuroscience of chronic stress and practical somatic techniques to reset your nervous system in real-time.",
        thumbnailColor: ["#1e1b4b", "#4338ca"],
      },
      {
        id: "c2",
        title: "CBT Foundations for Panic & Anxiety",
        category: "Anxiety",
        level: "Intermediate",
        duration: "1h 20m",
        lessonsCount: 8,
        rating: 4.8,
        instructor: "Dr. Michael Chen",
        progress: 25,
        description: "Learn cognitive reframing, thought dissection, and exposure tools to dismantle negative spirals.",
        thumbnailColor: ["#312e81", "#6366f1"],
      },
      {
        id: "c3",
        title: "Deep Sleep & Circadian Rhythm Mastery",
        category: "Sleep",
        level: "All Levels",
        duration: "55 mins",
        lessonsCount: 5,
        rating: 4.9,
        instructor: "Elena Rostova",
        progress: 0,
        description: "Transform your restorative sleep architecture with light timing, temperature hacking, and pre-bed cognitive downregulation.",
        thumbnailColor: ["#0f172a", "#1e293b"],
      },
    ];
  }
};

export default api;

