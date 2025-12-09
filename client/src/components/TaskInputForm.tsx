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
  const [start_time, setUserTime] = React.useState("");
  const [tittle, setTaskTitle] = React.useState("");
  const [description, setTaskDescription] = React.useState("");
  const today = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString().slice(0, 8);

  console.log(time, start_time);

  const Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tittle, description, date, start_time }),
    });
    const data = await response.json();
    console.log("Server response:", data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{formType}</DialogTitle>
        </DialogHeader>
        <form onSubmit={Submit}>
          <div className="grid grid-rows-4 gap-0.5 items-center w-full">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                placeholder="Enter task tittle..."
                required={true}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                required={true}
                placeholder="Enter task Description..."
                onChange={(e) => setTaskDescription(e.target.value)}
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
              <div className="flex">
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 ">
                    <Label htmlFor="time-picker" className="px-1">
                      Start Time
                    </Label>
                    <Input
                      type="time"
                      id="time-picker"
                      step="1"
                      // disabled={start_time < time}
                      onChange={(e) => setUserTime(e.target.value)}
                      defaultValue={time}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <Label htmlFor="time-picker" className="px-1">
                      End Time
                    </Label>
                    <Input
                      type="time"
                      id="time-picker"
                      step="1"
                      // disabled={start_time < time}
                      onChange={(e) => setUserTime(e.target.value)}
                      defaultValue={time}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Scope</Label>
              <Select>
                <SelectTrigger className="flex w-full">
                  <SelectValue placeholder="Daily(tactical)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Daily">Daily (tactical)</SelectItem>
                    <SelectItem value="Weekly">Weekly (strategic)</SelectItem>
                    <SelectItem value="Monthly">Monthly (visionary)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">
                {formType === "Edit Task" ? "Save changes" : "Create Task"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
