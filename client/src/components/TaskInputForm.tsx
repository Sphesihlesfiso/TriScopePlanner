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
import toast from "react-hot-toast";

import type { TaskInputFormProps } from "@/types";
import { postTask, editTask } from "@/api/endpoints";

export const TaskInputForm = ({
  triggerButton,
  formType,
  taskId,
  description,
  title,
  startTime,
  scope,
  endTime,
}: TaskInputFormProps) => {
  const today = new Date().toLocaleDateString();
  const [startDateOpen, setOpen] = React.useState(false);
  const [endDateOpen, setEndDateOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>(new Date());

  const [userStartTime, setStartTime] = React.useState(startTime);
  const [userEndTime, setEndTime] = React.useState(endTime);
  const [userTitle, setTaskTitle] = React.useState(title);
  const [userScope, setScope] = React.useState(scope);
  const [userDescription, setTaskDescription] = React.useState(description);
  function ValidateForm(): void {
    if (userTitle === "") {
      alert("Title cannot be empty");
    } else if (userDescription === "") {
      alert("Description cannot be empty");
    } else if (userEndTime <= userStartTime) {
      alert("End time cannot be earlier or equal to start time");
    }
  }

  const Submit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (formType === "Edit Task") {
      editTask.patchTask(taskId, {
        scope: userScope,
        taskId: taskId,
        title: userTitle,
        description: userDescription,
        startTime: userStartTime,
        endTime: userEndTime,
      });
      toast.success("Changes saved");
    } else {
      postTask.create({
        scope: userScope,
        taskId: taskId,
        title: userTitle,
        description: userDescription,
        startTime: userStartTime,
        endTime: userEndTime,
      });
      toast.success("Task created");
    }
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
            <div className="space-y-2">
              <Label htmlFor="userTitle">Title</Label>
              <Input
                type="text"
                placeholder="Enter task Title..."
                required
                onChange={(e) => setTaskTitle(e.target.value)}
                value={userTitle}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userDescription">Description</Label>
              <Textarea
                required
                placeholder="Enter task Description..."
                onChange={(e) => setTaskDescription(e.target.value)}
                value={userDescription}
              />
            </div>

            <div className="flex gap-2 w-full justify-between">
              <div className="flex flex-col gap-2">
                <Label htmlFor="userDescription">Scope</Label>
                <Select onValueChange={(value) => setScope(value)}>
                  <SelectTrigger className="flex w-full">
                    <SelectValue placeholder="Daily" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {userScope != "Daily" && (
                <div className="flex flex-row gap-2">
                  <div className="flex  flex-1/2 flex-col gap-2">
                    <Label htmlFor="userDescription">Start Date</Label>
                    <Popover open={startDateOpen} onOpenChange={setOpen}>
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
                          onSelect={(d) => {
                            if (d) {
                              setDate(d);
                              setOpen(false);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex  flex-1/2 flex-col gap-2">
                    <Label htmlFor="userDescription">Start Date</Label>
                    <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
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
                          onSelect={(d) => {
                            if (d) {
                              setDate(d);
                              setOpen(false);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
              {userScope == "Daily" && (
                <div className="flex ">
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-2 ">
                      <Label htmlFor="time-picker" className="px-1">
                        Start Time
                      </Label>
                      <Input
                        type="time"
                        id="time-picker"
                        onChange={(e) => setStartTime(e.target.value)}
                        defaultValue={userStartTime}
                        required
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <Label htmlFor="time-picker" className="px-1">
                        Finish Time
                      </Label>
                      <Input
                        type="time"
                        id="time-picker"
                        onChange={(e) => setEndTime(e.target.value)}
                        defaultValue={userEndTime}
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={ValidateForm}
                type={
                  userTitle === "" ||
                  userDescription === "" ||
                  parseInt(userEndTime.split(":").join("")) <=
                    parseInt(userStartTime.split(":").join(""))
                    ? "button"
                    : "submit"
                }
              >
                {formType === "Edit Task" ? "Save changes" : "Create Task"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
