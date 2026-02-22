import { useState } from "react";
import { Group, useAuth } from "@/contexts/AuthContext";
import { mockMessages } from "@/data/mockData";
import { Phone, Video, Info, Send, Paperclip, Smile, Megaphone } from "lucide-react";

interface ChatWindowProps {
  group: Group;
  onToggleInfo: () => void;
  showInfo: boolean;
}

const ChatWindow = ({ group, onToggleInfo, showInfo }: ChatWindowProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const messages = mockMessages.filter((m) => m.groupId === group.id);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Chat Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-border bg-surface/50">
        <div>
          <h3 className="font-semibold text-sm">{group.name}</h3>
          <p className="text-xs text-muted-foreground">{group.memberCount} members · {group.facultyAdmin}</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all" title="Voice Call">
            <Phone className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all" title="Video Call">
            <Video className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleInfo}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
              showInfo ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
            title="Group Info"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg, i) => {
          const isOwn = msg.senderId === user?.id;
          const isAnnouncement = msg.type === "announcement";

          if (isAnnouncement) {
            return (
              <div key={msg.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="mx-auto max-w-lg p-4 rounded-xl bg-admin/10 border border-admin/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Megaphone className="w-4 h-4 text-admin" />
                    <span className="text-xs font-semibold text-admin">Announcement</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-[10px] text-muted-foreground mt-1.5">— {msg.senderName}</p>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in ${isOwn ? "flex-row-reverse" : ""}`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold ${
                msg.senderRole === "faculty" ? "bg-faculty/20 text-faculty" :
                msg.senderRole === "admin" ? "bg-admin/20 text-admin" :
                "bg-student/20 text-student"
              }`}>
                {msg.senderName.charAt(0)}
              </div>
              <div className={`max-w-md ${isOwn ? "text-right" : ""}`}>
                <div className="flex items-baseline gap-2 mb-0.5">
                  {!isOwn && (
                    <span className={`text-xs font-semibold ${
                      msg.senderRole === "faculty" ? "text-faculty" :
                      msg.senderRole === "admin" ? "text-admin" :
                      "text-student"
                    }`}>
                      {msg.senderName}
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                </div>
                <div className={`inline-block px-3.5 py-2 rounded-2xl text-sm ${
                  isOwn
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary rounded-bl-md"
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="px-5 py-3 border-t border-border bg-surface/50">
        <div className="flex items-center gap-2">
          <button type="button" className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 h-10 px-4 rounded-xl bg-secondary/50 border border-border text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
          />
          <button type="button" className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <Smile className="w-4 h-4" />
          </button>
          <button
            type="submit"
            className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
