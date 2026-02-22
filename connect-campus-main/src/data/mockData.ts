import { Group, Message } from "@/contexts/AuthContext";

export const mockGroups: Group[] = [
  { id: "1", name: "CSE - 3rd Year", type: "year", memberCount: 120, facultyAdmin: "Prof. Sharma", lastMessage: "Assignment deadline extended", lastMessageTime: "2m ago", unreadCount: 3 },
  { id: "2", name: "CSE - 3rd Year - Section A", type: "section", memberCount: 60, facultyAdmin: "Prof. Sharma", lastMessage: "Lab session tomorrow at 9 AM", lastMessageTime: "15m ago", unreadCount: 1 },
  { id: "3", name: "CSE - 3rd Year - Section B", type: "section", memberCount: 60, facultyAdmin: "Prof. Gupta", lastMessage: "Project submissions open", lastMessageTime: "1h ago" },
  { id: "4", name: "ECE - 2nd Year", type: "year", memberCount: 90, facultyAdmin: "Prof. Mehta", lastMessage: "Mid-sem results published", lastMessageTime: "3h ago", unreadCount: 5 },
  { id: "5", name: "MECH - 4th Year", type: "year", memberCount: 80, facultyAdmin: "Prof. Singh", lastMessage: "Placement drive next week", lastMessageTime: "5h ago" },
  { id: "6", name: "Full Stack Development", type: "course", memberCount: 45, facultyAdmin: "Prof. Sharma", lastMessage: "React project due Friday", lastMessageTime: "30m ago", unreadCount: 2 },
];

export const mockMessages: Message[] = [
  { id: "1", content: "Good morning everyone! 📚", senderId: "2", senderName: "Prof. Sharma", senderRole: "faculty", groupId: "1", timestamp: "9:00 AM", type: "text" },
  { id: "2", content: "📢 Assignment deadline has been extended to next Friday. Please submit your FSAD project reports by then.", senderId: "2", senderName: "Prof. Sharma", senderRole: "faculty", groupId: "1", timestamp: "9:05 AM", type: "announcement" },
  { id: "3", content: "Thank you sir! That's really helpful.", senderId: "3", senderName: "Rahul Kumar", senderRole: "student", groupId: "1", timestamp: "9:10 AM", type: "text" },
  { id: "4", content: "Sir, can we use React for the frontend?", senderId: "4", senderName: "Priya Singh", senderRole: "student", groupId: "1", timestamp: "9:15 AM", type: "text" },
  { id: "5", content: "Yes, React or Angular both are acceptable. Make sure to implement proper authentication.", senderId: "2", senderName: "Prof. Sharma", senderRole: "faculty", groupId: "1", timestamp: "9:20 AM", type: "text" },
  { id: "6", content: "Will there be a demo session before submission?", senderId: "5", senderName: "Amit Patel", senderRole: "student", groupId: "1", timestamp: "9:25 AM", type: "text" },
  { id: "7", content: "📢 Demo sessions will be scheduled next week. Each team gets 15 minutes.", senderId: "2", senderName: "Prof. Sharma", senderRole: "faculty", groupId: "1", timestamp: "9:30 AM", type: "announcement" },
  { id: "8", content: "Got it, thanks! 🙏", senderId: "3", senderName: "Rahul Kumar", senderRole: "student", groupId: "1", timestamp: "9:32 AM", type: "text" },
];
