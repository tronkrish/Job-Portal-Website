import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";
const NavigationBar = () => {
    return (_jsx("nav", { className: "bg-background border-b", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between h-16", children: [_jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0 flex items-center", children: _jsx(Link, { to: "/", className: "text-xl font-bold", children: "Job Board" }) }), _jsxs("div", { className: "hidden sm:ml-6 sm:flex sm:space-x-8", children: [_jsx(Link, { to: "/", className: "border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium", children: "Jobs" }), _jsx(Link, { to: "/about", className: "border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium", children: "About" })] })] }), _jsx("div", { className: "flex items-center", children: _jsx(AuthStatus, {}) })] }) }) }));
};
export default NavigationBar;
