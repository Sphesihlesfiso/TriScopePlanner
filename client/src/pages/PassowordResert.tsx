import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "@/api/endpoints";
import { useState } from "react";
import toast from "react-hot-toast";
export const ResertPasswordCard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add this

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const res = await forgotPassword.postUser({
        userName: "",
        password: "",
        email: email,
      });

      if (res.data.success) {
        toast.success("Email with reset link has been sent to your email");
        navigate("/login");
      } else {
        toast.error("User with such email does not exist.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again. " + error);
    } finally {
      setIsLoading(false); // End loading regardless of success/fail
    }
  };

  return (
    <form onSubmit={submit}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset your account password.</CardTitle>
          <CardDescription>
            Enter the email address associated with your account...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isLoading} // Disable input while loading
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Continue"}
          </Button>
          <Button
            variant="link"
            className="w-full"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Return to login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
