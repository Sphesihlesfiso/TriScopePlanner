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
import { useState } from "react";

export const LoginSignIn = () => {
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const Submit = async () => {
    const response = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    console.log("Server response:", data);
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
            <Button variant="link" onClick={() => setSignUp((prev) => !prev)}>
              {!signUp ? "Sign up" : "Sign in"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            {signUp && (
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Jane"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            {signUp ? "Sign up" : "Login"}
          </Button>
          <Button variant="outline" className="w-full">
            {signUp ? "Sign up with Google" : "Login with Google"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
