import { RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";

import { verifyUserEmail } from "@/api/endpoints";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyToken } from '../../../server/src/middleware/verifyToken';

export const InputOTPForm =()=> {
  const navigate = useNavigate();
  const [veificationToken, setVerificationToken] = React.useState<string>("");
  const [loading,setLoading]=React.useState<boolean>(true)
  // const [canSubmit, setCanSubmit] = React.useState<boolean>(false);

  const submit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const result = await verifyUserEmail.postToken(
        {
          verificationToken: veificationToken,
        },
        "",
      );
      if (result.data.success) {
        navigate("/");
        toast.success("Successfully verified email.");
      } else {
        toast.error("Failed to to verify the token has expired or wrong.");
      }
    } catch (error) {
       toast.error("Failed to to verify user email."+error);
    }finally{
      setLoading(false)
    }
  };
  return (
    <Card className="mx-auto max-w-md">
      <form onSubmit={submit}>
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">
                Verification code
              </FieldLabel>
              <Button variant="outline" size="sm">
                <RefreshCwIcon />
                Resend Code
              </Button>
            </div>
            <InputOTP
              maxLength={5}
              value={veificationToken}
              id="otp-verification"
              required
              onChange={(veificationToken) =>
                setVerificationToken(veificationToken)
              }
            >
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription></FieldDescription>
          </Field>
        </CardContent>
        <CardFooter>
          <Field>
            <Button
              type={loading ? "button" : "submit"}
              className="w-full"
              disabled={verifyToken.length!=5}
            >
              {loading?"Verifying...":"Verify"}
            </Button>
            <div className="text-sm text-muted-foreground">
              Having trouble signing in?{" "}
              <a
                href="mailto:mabasosphesihle25@gmail.com"
                className="underline underline-offset-4 transition-colors hover:text-primary"
              >
                Contact support
              </a>
            </div>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
}
