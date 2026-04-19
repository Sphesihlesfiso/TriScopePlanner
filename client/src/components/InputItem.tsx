import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { InputItemProps } from "@/types";
export const InputItem = ({
  inputType,
  inputPlaceholder,
  inputLabel,
  
  
}: InputItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputLabel}>{inputLabel}</Label>
      <Input
        type={inputType}
        required={true}
        placeholder={inputPlaceholder}
        name={inputLabel}
      />
    </div>
  );
};
