import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useParams
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { resertPassword } from "@/api/endpoints";

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

export const CreatePassword = () => {
  const { resertToken } = useParams<{ resertToken: string }>(); // Grabs token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);

  const allRulesPassed = passwordRules.every((r) => r.test(password));
  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;
  const canSubmit = allRulesPassed && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    try {
      // Note: Passing the token to your API endpoint

      const res = await resertPassword.postToken({
        resertToken: resertToken,
        newPassword: password,
      },resertToken!);

      if (res.data.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("An error occurred. The link may be expired. " + error);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {(passwordFocused || password.length > 0) && (
              <ul className="space-y-1.5 mt-2">
                {passwordRules.map((rule) => (
                  <li
                    key={rule.label}
                    className="flex items-center gap-2 text-xs"
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${rule.test(password) ? "bg-green-500" : "bg-slate-300"}`}
                    />
                    <span
                      className={
                        rule.test(password)
                          ? "text-green-600"
                          : "text-slate-500"
                      }
                    >
                      {rule.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={
                confirmPassword && !passwordsMatch
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
              required
            />
            {confirmPassword && (
              <p
                className={`text-xs ${passwordsMatch ? "text-green-600" : "text-red-500"}`}
              >
                {passwordsMatch
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="my-1">
          <Button type="submit" className="w-full mt-2" disabled={!canSubmit}>
            Update Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
