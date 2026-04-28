import { loginUser } from "@/api/endpoints";
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

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../api/endpoints";

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
  const [signUp, setSignUp] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [userEmail, setEmail] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const allRulesPassed = passwordRules.every((r) => r.test(password));

  const Submit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (signUp && !allRulesPassed) {
      toast.error("Password does not meet all requirements.");
      return;
    }

    if (!signUp) {
      const results = await loginUser.postUser({
        userName: userName,
        email: userEmail,
        password: password,
      });
      if (results.data.success) {
        navigate("/");
        toast.success("Succsesfully loged in.");
      } else {
        toast.error("Failed to log in, invalid credentials.");
      }
    } else {
      const res = await signUpUser.postUser({
        userName: userName,
        email: userEmail,
        password: password,
      });
      if (res.data.success) {
        toast.success("Verify your email.");
        navigate("/Email-verification");
      } else {
        toast.error("Failed to sign-up user.");
      }
    }
  };

  return (
    <Card className="w-full max-w-md">
      <form onSubmit={Submit}>
        <CardHeader>
          <CardTitle>{signUp ? "Sign up" : "Sign in"}</CardTitle>
          <CardDescription>
            {!signUp
              ? "Enter your email below to sign in to your account"
              : "Enter your email, name and password to make an account."}
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={(e) => {
                e.preventDefault();
                setSignUp((prev) => !prev);
                setpassword("");
              }}
            >
              {!signUp ? "Sign up" : "Sign in"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
              />
            </div>
            {signUp && (
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Jane"
                  onChange={(e) => {
                    e.preventDefault();
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {!signUp && (
                  <Button
                    variant="link"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/forgot-passoword");
                    }}
                  >
                    Forgot your password?
                  </Button>
                )}
              </div>
              <div className="mb-1">
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  onChange={(e) => {
                    e.preventDefault();
                    setpassword(e.target.value);
                  }}
                />
              </div>

              {/* Password rules — only shown on sign up when focused or partially filled */}
              {signUp && (passwordFocused || password.length > 0) && (
                <ul className="flex flex-col gap-1.5 mt-1">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(password);
                    return (
                      <li
                        key={rule.label}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-200 ${
                            passed ? "bg-green-500" : "bg-muted-foreground/30"
                          }`}
                        />
                        <span
                          className={`transition-colors duration-200 ${
                            passed ? "text-green-600" : "text-muted-foreground"
                          }`}
                        >
                          {rule.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            {signUp ? "Sign up" : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
