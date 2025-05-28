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
import { User } from "lucide-react";
const signupSchema = z
    .object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
const Signup = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { signup } = useAuth();
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const onSubmit = async (data) => {
        try {
            await signup(data.email, data.password, data.firstName, data.lastName);
            toast({
                title: "Account created",
                description: "Your account has been created successfully. You can now log in.",
            });
            navigate("/login");
        }
        catch (error) {
            toast({
                title: "Registration failed",
                description: "There was a problem creating your account. Please try again.",
                variant: "destructive",
            });
        }
    };
    return (_jsx("div", { className: "flex min-h-[calc(100vh-80px)] items-center justify-center p-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl font-bold", children: "Create an account" }), _jsx(CardDescription, { children: "Enter your information to create an account" })] }), _jsx(CardContent, { children: _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "firstName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "First Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "First name", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "lastName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Last Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Last name", ...field }) }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "your.email@example.com", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "confirmPassword", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Confirm Password" }), _jsx(FormControl, { children: _jsx(Input, { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", className: "w-full", disabled: form.formState.isSubmitting, children: form.formState.isSubmitting ? (_jsx("span", { children: "Creating account..." })) : (_jsxs(_Fragment, { children: [_jsx(User, { className: "mr-2 h-4 w-4" }), " Sign Up"] })) })] }) }) }), _jsx(CardFooter, { className: "flex flex-col space-y-2", children: _jsxs("div", { className: "text-sm text-center text-muted-foreground", children: ["Already have an account?", " ", _jsx(Link, { to: "/login", className: "text-primary hover:underline", children: "Login" })] }) })] }) }));
};
export default Signup;
