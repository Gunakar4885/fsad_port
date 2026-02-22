import { useState } from "react";
import { Upload, Users, FileSpreadsheet, CheckCircle, BarChart3, Shield, BookOpen, GraduationCap } from "lucide-react";

const AdminPanel = () => {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done">("idle");

  const handleUpload = () => {
    setUploadStatus("uploading");
    setTimeout(() => setUploadStatus("done"), 2000);
  };

  const stats = [
    { label: "Total Students", value: "1,240", icon: GraduationCap, color: "text-student" },
    { label: "Total Faculty", value: "68", icon: BookOpen, color: "text-faculty" },
    { label: "Active Groups", value: "42", icon: Users, color: "text-primary" },
    { label: "Messages Today", value: "3,891", icon: BarChart3, color: "text-admin" },
  ];

  const recentGroups = [
    { name: "CSE - 3rd Year - Section A", members: 60, status: "Active", faculty: "Prof. Sharma" },
    { name: "CSE - 3rd Year - Section B", members: 58, status: "Active", faculty: "Prof. Gupta" },
    { name: "ECE - 2nd Year", members: 90, status: "Active", faculty: "Prof. Mehta" },
    { name: "MECH - 4th Year", members: 80, status: "Active", faculty: "Prof. Singh" },
    { name: "Full Stack Development", members: 45, status: "Active", faculty: "Prof. Sharma" },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <div className="w-10 h-10 rounded-xl bg-admin/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-admin" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage groups, users, and communication</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="glass-card rounded-xl p-4 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <span className="text-2xl font-bold">{s.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Excel Upload */}
        <div className="glass-card rounded-xl p-6 mb-8 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-accent" />
            Upload Student Data (Excel)
          </h2>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
            {uploadStatus === "idle" && (
              <>
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Drag & drop your .xlsx file here</p>
                <p className="text-xs text-muted-foreground mb-4">Roll No, Name, Course, Year, Section, Email</p>
                <button
                  onClick={handleUpload}
                  className="px-5 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all active:scale-95"
                >
                  Browse Files
                </button>
              </>
            )}
            {uploadStatus === "uploading" && (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
                <p className="text-sm">Processing student data & creating groups...</p>
                <p className="text-xs text-muted-foreground">AI is automatically organizing groups by course, year, and section</p>
              </div>
            )}
            {uploadStatus === "done" && (
              <div className="space-y-3">
                <CheckCircle className="w-10 h-10 text-accent mx-auto" />
                <p className="text-sm font-medium text-accent">Upload Complete!</p>
                <p className="text-xs text-muted-foreground">240 students imported · 12 groups created automatically</p>
                <button
                  onClick={() => setUploadStatus("idle")}
                  className="px-4 h-8 rounded-lg bg-secondary text-sm hover:bg-secondary/80 transition-all"
                >
                  Upload Another
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Groups Table */}
        <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            All Groups
          </h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Group Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Faculty Admin</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Members</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentGroups.map((g, i) => (
                  <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                    <td className="p-3 font-medium">{g.name}</td>
                    <td className="p-3 text-muted-foreground">{g.faculty}</td>
                    <td className="p-3 text-center">{g.members}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent font-medium">
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
