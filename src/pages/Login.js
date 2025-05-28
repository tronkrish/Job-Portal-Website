import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn } from "lucide-react";
const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { login } = useAuth();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            toast({
                title: "Login successful",
                description: "You have been successfully logged in.",
            });
            navigate("/");
        }
        catch (error) {
            toast({
                title: "Login failed",
                description: "Invalid email or password. Please try again.",
                variant: "destructive",
            });
        }
    };
    return (_jsx("div", { className: "flex min-h-[calc(100vh-80px)] items-center justify-center p-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl font-bold", children: "Login" }), _jsx(CardDescription, { children: "Enter your credentials to access your account" })] }), _jsx(CardContent, { children: _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "your.email@example.com", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", className: "w-full", disabled: form.formState.isSubmitting, children: form.formState.isSubmitting ? (_jsx("span", { children: "Logging in..." })) : (_jsxs(_Fragment, { children: [_jsx(LogIn, { className: "mr-2 h-4 w-4" }), " Login"] })) })] }) }) }), _jsx(CardFooter, { className: "flex flex-col space-y-2", children: _jsxs("div", { className: "text-sm text-center text-muted-foreground", children: ["Don't have an account?", " ", _jsx(Link, { to: "/signup", className: "text-primary hover:underline", children: "Sign up" })] }) })] }) }));
};
export default Login;
