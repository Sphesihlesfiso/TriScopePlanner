import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react"; // For the loading spinner
import { AxiosError } from "axios";
import { loginUser, signUpUser } from "@/api/endpoints";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const passwordRules = [
  { label: "At least 6 characters", test: (p: string) => p.length >= 6 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  {
    label: "One special character",
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

export const LoginSignIn = () => {
  const navigate = useNavigate();

  const [signUp, setSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [userEmail, setEmail] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);

  const allRulesPassed = passwordRules.every((r) => r.test(password));

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    // Prevent submission if signing up with a weak password
    if (signUp && !allRulesPassed) {
      toast.error("Password does not meet all requirements.");
      return;
    }

    setIsLoading(true);

    try {
      if (!signUp) {
        // --- Login Flow ---
        const results = await loginUser.postUser({
          userName: userName,
          email: userEmail,
          password: password,
        });

        if (results.data.success) {
          toast.success("Successfully logged in.");
          navigate("/home");
        } else {
          toast.error("Invalid credentials.");
        }
      } else {
        // --- Sign Up Flow ---
        const res = await signUpUser.postUser({
          userName: userName,
          email: userEmail,
          password: password,
        });

        if (res.data.success) {
          toast.success("Registration successful! Please verify your email.");
          navigate("/Email-verification");
        } else {
          toast.error("Failed to sign up user.");
        }
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      // Basic Error handling (e.g., 401, 500)
      const msg =
        err.response?.data?.message || "An unexpected error occurred.";
      toast.error(msg);
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{signUp ? "Sign up" : "Sign in"}</CardTitle>
          <CardDescription>
            {signUp
              ? "Create your account to join AfriTech."
              : "Enter your credentials to access your account."}
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              type="button"
              disabled={isLoading}
              onClick={() => {
                setSignUp((prev) => !prev);
                setpassword("");
              }}
            >
              {signUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email Input */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Username Input (Sign Up Only) */}
          {signUp && (
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Sphe"
                required
                disabled={isLoading}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          {/* Password Input */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!signUp && (
                <Button
                  variant="link"
                  size="sm"
                  className="px-0 h-auto"
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </Button>
              )}
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              disabled={isLoading}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onChange={(e) => setpassword(e.target.value)}
            />

            {/* Password Validation Rules - Now using passwordFocused */}
            {signUp && (passwordFocused || password.length > 0) && (
              <ul className="mt-2 space-y-1">
                {passwordRules.map((rule) => {
                  const passed = rule.test(password);
                  return (
                    <li
                      key={rule.label}
                      className="flex items-center gap-2 text-xs"
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${passed ? "bg-green-500" : "bg-zinc-300"}`}
                      />
                      <span
                        className={
                          passed
                            ? "text-green-600 font-medium"
                            : "text-zinc-500"
                        }
                      >
                        {rule.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading
              ? signUp
                ? "Creating Account..."
                : "Signing In..."
              : signUp
                ? "Create Account"
                : "Sign In"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
