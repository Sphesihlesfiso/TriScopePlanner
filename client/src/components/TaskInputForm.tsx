import { InputItem } from "./InputItem";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "./ui/label";

import { ChevronDownIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
} from "./ui/select";

type TaskDInputFormProps = {
  triggerButton: React.ReactNode;
  formType: string;
};

export const TaskInputForm = ({
  triggerButton,
  formType,
}: TaskDInputFormProps) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const today = new Date().toLocaleDateString();
  console.log(date);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>{formType}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-rows-4 gap-0.5 items-center w-full">
            <InputItem
              inputType="text"
              inputPlaceholder="Enter task tittle..."
              inputLabel="Title"
            />
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                required={true}
                placeholder="Enter task Description..."
              />
            </div>
            <div className="flex gap-4 w-full ">
              <div className="flex  flex-1 flex-col gap-2">
                <Label htmlFor="description">Due Date</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : today}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                     
                      hideNavigation={true}
                      disabled={(date) => date < new Date()}
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor="time-picker" className="px-1">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="10:30:00"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Scope</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Daily(Tactical)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Daily">Daily (Tactical)</SelectItem>
                    <SelectItem value="Weekly">Weekly (Strategic)</SelectItem>
                    <SelectItem value="Monthly">Monthly (Visionary)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {formType === "Edit Task" ? "Save changes" : "Create Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
