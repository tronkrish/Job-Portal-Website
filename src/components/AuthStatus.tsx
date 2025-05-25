
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, User } from "lucide-react";

const AuthStatus = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <span className="hidden md:inline text-sm">
          Welcome, {user.firstName}
        </span>
        <Button variant="ghost" size="sm" onClick={() => logout()}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
        <LogIn className="h-4 w-4 mr-2" />
        Login
      </Button>
      <Button onClick={() => navigate("/signup")}>
        <User className="h-4 w-4 mr-2" />
        Sign Up
      </Button>
    </div>
  );
};

export default AuthStatus;