import { Group } from "@/contexts/AuthContext";
import { X, UserPlus, UserMinus, Crown, Shield } from "lucide-react";

interface GroupInfoPanelProps {
  group: Group;
  onClose: () => void;
}

const mockMembers = [
  { id: "2", name: "Prof. Sharma", role: "faculty", online: true },
  { id: "3", name: "Rahul Kumar", role: "student", online: true },
  { id: "4", name: "Priya Singh", role: "student", online: true },
  { id: "5", name: "Amit Patel", role: "student", online: false },
  { id: "6", name: "Sneha Reddy", role: "student", online: false },
  { id: "7", name: "Vikram Joshi", role: "student", online: true },
  { id: "8", name: "Ananya Das", role: "student", online: false },
];

const GroupInfoPanel = ({ group, onClose }: GroupInfoPanelProps) => {
  return (
    <div className="w-72 bg-surface border-l border-border flex flex-col animate-slide-in-left">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-sm">Group Info</h3>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Group Details */}
      <div className="p-4 border-b border-border">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl font-bold text-primary">{group.name.charAt(0)}</span>
        </div>
        <h4 className="font-semibold text-center mb-1">{group.name}</h4>
        <p className="text-xs text-muted-foreground text-center">
          {group.type.charAt(0).toUpperCase() + group.type.slice(1)} Group · {group.memberCount} members
        </p>
      </div>

      {/* Faculty Admin */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-3.5 h-3.5 text-admin" />
          <span className="text-xs font-medium text-muted-foreground">Group Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-faculty/20 flex items-center justify-center text-xs font-semibold text-faculty">
            {group.facultyAdmin.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{group.facultyAdmin}</p>
            <p className="text-[10px] text-muted-foreground">Faculty</p>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">Members</span>
            <div className="flex gap-1">
              <button className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all">
                <UserPlus className="w-3.5 h-3.5" />
              </button>
              <button className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                <UserMinus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="space-y-1">
            {mockMembers.map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    m.role === "faculty" ? "bg-faculty/20 text-faculty" : "bg-secondary text-muted-foreground"
                  }`}>
                    {m.name.charAt(0)}
                  </div>
                  {m.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-online border-2 border-surface" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{m.name}</p>
                  {m.role === "faculty" && (
                    <div className="flex items-center gap-1">
                      <Shield className="w-2.5 h-2.5 text-faculty" />
                      <span className="text-[10px] text-faculty">Faculty</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupInfoPanel;
