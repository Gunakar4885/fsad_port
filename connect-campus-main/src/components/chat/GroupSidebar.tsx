import { useState } from "react";
import { Group, UserRole } from "@/contexts/AuthContext";
import { Search, Hash, Users, BookOpen, Plus } from "lucide-react";

interface GroupSidebarProps {
  groups: Group[];
  selectedGroupId: string | null;
  onSelectGroup: (id: string) => void;
  userRole: UserRole;
}

const typeIcons = { course: BookOpen, year: Users, section: Hash };

const GroupSidebar = ({ groups, selectedGroupId, onSelectGroup, userRole }: GroupSidebarProps) => {
  const [search, setSearch] = useState("");

  const filtered = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-72 bg-surface border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm">Groups</h2>
          {(userRole === "admin" || userRole === "faculty") && (
            <button className="w-7 h-7 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search groups..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-secondary/50 border border-border text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto py-1">
        {filtered.map((group, i) => {
          const Icon = typeIcons[group.type];
          const isSelected = group.id === selectedGroupId;
          return (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className={`w-full px-3 py-2.5 flex items-start gap-3 transition-all animate-fade-in ${
                isSelected
                  ? "bg-primary/10 border-l-2 border-l-primary"
                  : "hover:bg-secondary/50 border-l-2 border-l-transparent"
              }`}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                isSelected ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium truncate ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                    {group.name}
                  </span>
                  {group.lastMessageTime && (
                    <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2">
                      {group.lastMessageTime}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs text-muted-foreground truncate">
                    {group.lastMessage || `${group.memberCount} members`}
                  </p>
                  {group.unreadCount && (
                    <span className="flex-shrink-0 ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {group.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GroupSidebar;
