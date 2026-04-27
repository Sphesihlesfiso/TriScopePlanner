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

export const LoginSignIn = () => {
  const [signUp, setSignUp] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [userEmail, setEmail] = useState("");
  const navigate = useNavigate();
  const Submit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    // const endPoint = !signUp ? "login" : "register";
    // console.log(endPoint)

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
        //must do user already taken
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
              : "Enter your email ,name and password to make an account."}
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={(e) => {
                e.preventDefault();
                setSignUp((prev) => !prev);
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
              </div>
              <div className="mb-2">
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setpassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 ">
          <Button type="submit" className="w-full">
            {signUp ? "Sign up" : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
