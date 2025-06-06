import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
const queryClient = new QueryClient();
const App = () => (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(AuthProvider, { children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(Sonner, {}), _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Index, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) })] }) }) }));
export default App;
