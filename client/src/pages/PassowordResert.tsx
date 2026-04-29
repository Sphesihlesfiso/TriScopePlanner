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
  const submit = async () => {
    const res = await forgotPassword.postUser({
      userName: "",
      password: "",
      email: email,
    });
    if (res.data.success) {
      navigate("/login");
      toast.success("Email with resert link has been sent to your email");
    } else {
      toast.error("User with such email does not exist.");
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Resert your account passoword.</CardTitle>
        <CardDescription>
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Continue
        </Button>
        <Button
          variant="link"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Return to sign-up
        </Button>
      </CardFooter>
    </Card>
  );
};
