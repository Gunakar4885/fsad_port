import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { MessageSquare, Shield, GraduationCap, BookOpen, Eye, EyeOff } from "lucide-react";

const roleConfig: Record<UserRole, { label: string; icon: typeof Shield; color: string }> = {
  admin: { label: "Admin", icon: Shield, color: "bg-admin text-admin-foreground" },
  faculty: { label: "Faculty", icon: BookOpen, color: "bg-faculty text-faculty-foreground" },
  student: { label: "Student", icon: GraduationCap, color: "bg-student text-student-foreground" },
};

const LoginPage = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md animate-fade-in relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight">CampusConnect</h1>
              <p className="text-xs text-muted-foreground">AI-Powered College Communication</p>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-6 text-center">Sign in to your account</h2>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {(Object.keys(roleConfig) as UserRole[]).map((role) => {
              const config = roleConfig[role];
              const Icon = config.icon;
              return (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                    selectedRole === role
                      ? `${config.color} border-transparent shadow-lg`
                      : "border-border hover:border-muted-foreground/30 hover:bg-secondary/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{config.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`${selectedRole}@college.edu`}
                className="w-full h-11 px-4 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-11 px-4 pr-11 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all placeholder:text-muted-foreground/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full h-11 rounded-xl font-medium text-sm transition-all duration-200 ${roleConfig[selectedRole].color} hover:opacity-90 active:scale-[0.98]`}
            >
              Sign in as {roleConfig[selectedRole].label}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Demo mode — click sign in with any credentials
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
