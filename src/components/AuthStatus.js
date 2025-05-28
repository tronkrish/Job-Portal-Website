import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, User } from "lucide-react";
const AuthStatus = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    if (isAuthenticated && user) {
        return (_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "hidden md:inline text-sm", children: ["Welcome, ", user.firstName] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => logout(), children: [_jsx(LogOut, { className: "h-4 w-4 mr-2" }), "Logout"] })] }));
    }
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate("/login"), children: [_jsx(LogIn, { className: "h-4 w-4 mr-2" }), "Login"] }), _jsxs(Button, { onClick: () => navigate("/signup"), children: [_jsx(User, { className: "h-4 w-4 mr-2" }), "Sign Up"] })] }));
};
export default AuthStatus;
