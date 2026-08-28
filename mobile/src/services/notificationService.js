// Notification service for mental wellness check-ins, habit streaks, and crisis checkups
export const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif_1",
    title: "Morning Mindful Check-in ☀️",
    body: "Take 30 seconds to log how you're feeling and set a positive intention for today.",
    time: "8:30 AM",
    type: "mood",
    read: false,
    date: "Today",
  },
  {
    id: "notif_2",
    title: "Habit Streak at Risk 🔥",
    body: "You're 1 habit away from keeping your 15-day consistency streak alive!",
    time: "2:15 PM",
    type: "habit",
    read: false,
    date: "Today",
  },
  {
    id: "notif_3",
    title: "Aria's Evening Downregulation 🌙",
    body: "Prepare your nervous system for deep restorative sleep with a 2-minute breath reset.",
    time: "9:30 PM",
    type: "breathe",
    read: true,
    date: "Yesterday",
  },
];

export const getScheduledReminders = () => {
  return [
    { id: "rem_1", label: "Morning Mood Check-In", time: "08:30 AM", enabled: true, category: "Mind" },
    { id: "rem_2", label: "Midday Stress Reset", time: "01:30 PM", enabled: true, category: "Wellness" },
    { id: "rem_3", label: "Evening Gratitude & Journal", time: "09:00 PM", enabled: true, category: "Reflection" },
    { id: "rem_4", label: "Digital Sunset Reminder", time: "10:00 PM", enabled: false, category: "Sleep" },
  ];
};

export const scheduleLocalNotification = async (title, body, triggerSeconds = 2) => {
  console.log(`[NeuroLink Notification Scheduled]: ${title} - ${body} (in ${triggerSeconds}s)`);
  return {
    success: true,
    id: Date.now().toString(),
    title,
    body,
    scheduledAt: new Date(Date.now() + triggerSeconds * 1000).toISOString(),
  };
};
