import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "faculty" | "student";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  type: "course" | "year" | "section";
  memberCount: number;
  facultyAdmin: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  groupId: string;
  timestamp: string;
  type: "text" | "announcement" | "media";
  mediaUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers: Record<UserRole, User> = {
  admin: { id: "1", username: "Dr. Principal", email: "admin@college.edu", role: "admin" },
  faculty: { id: "2", username: "Prof. Sharma", email: "sharma@college.edu", role: "faculty" },
  student: { id: "3", username: "Rahul Kumar", email: "rahul@college.edu", role: "student" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (_email: string, _password: string, role: UserRole) => {
    setUser(mockUsers[role]);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
