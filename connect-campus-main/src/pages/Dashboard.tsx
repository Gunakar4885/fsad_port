import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import GroupSidebar from "@/components/chat/GroupSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import GroupInfoPanel from "@/components/chat/GroupInfoPanel";
import AdminPanel from "@/components/admin/AdminPanel";
import { mockGroups } from "@/data/mockData";
import { MessageSquare, Shield, LogOut, Settings, Users, Upload } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>("1");
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const selectedGroup = mockGroups.find((g) => g.id === selectedGroupId);

  if (!user) return null;

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Navigation Rail */}
      <div className="w-[72px] bg-sidebar flex flex-col items-center py-4 gap-2 border-r border-border">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4 glow-primary">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>

        <button
          onClick={() => setShowAdminPanel(false)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            !showAdminPanel ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
          title="Chats"
        >
          <Users className="w-5 h-5" />
        </button>

        {user.role === "admin" && (
          <button
            onClick={() => setShowAdminPanel(true)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              showAdminPanel ? "bg-admin text-admin-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
            title="Admin Panel"
          >
            <Shield className="w-5 h-5" />
          </button>
        )}

        {user.role === "admin" && (
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            title="Upload Excel"
          >
            <Upload className="w-5 h-5" />
          </button>
        )}

        <div className="flex-1" />

        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
          <Settings className="w-5 h-5" />
        </button>
        <button
          onClick={logout}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary mt-2">
          {user.username.charAt(0)}
        </div>
      </div>

      {showAdminPanel ? (
        <AdminPanel />
      ) : (
        <>
          {/* Group Sidebar */}
          <GroupSidebar
            groups={mockGroups}
            selectedGroupId={selectedGroupId}
            onSelectGroup={setSelectedGroupId}
            userRole={user.role}
          />

          {/* Chat Window */}
          {selectedGroup ? (
            <ChatWindow
              group={selectedGroup}
              onToggleInfo={() => setShowGroupInfo(!showGroupInfo)}
              showInfo={showGroupInfo}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground animate-fade-in">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Select a group to start chatting</p>
              </div>
            </div>
          )}

          {/* Info Panel */}
          {showGroupInfo && selectedGroup && (
            <GroupInfoPanel group={selectedGroup} onClose={() => setShowGroupInfo(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
