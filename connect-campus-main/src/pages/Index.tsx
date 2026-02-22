import { useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";

const Index = () => {
  const { user } = useAuth();
  return user ? <Dashboard /> : <LoginPage />;
};

export default Index;
