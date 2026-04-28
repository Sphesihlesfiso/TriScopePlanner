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
  endTime,
  scope,
}: TaskInputFormProps) => {
  const [open, setOpen] = React.useState(false);

  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [startDateOpen, setStartDateOpen] = React.useState(false);
  const [endDateOpen, setEndDateOpen] = React.useState(false);

  const [userStartTime, setStartTime] = React.useState<string>(
    startTime === "" ? "09:00" : startTime,
  );
  const [userEndTime, setEndTime] = React.useState(
    endTime === "" ? "10:00" : endTime,
  );
  const [userTitle, setTaskTitle] = React.useState(title);
  const [userScope, setScope] = React.useState(scope === "" ? "Daily" : scope);
  const [userDescription, setTaskDescription] = React.useState(description);

  const formatDate = (d: Date) =>
    `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const Submit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    // Validate daily times
    if (userScope === "Daily" && userEndTime <= userStartTime) {
      toast.error("Finish time must be after start time");
      return;
    }

    // Validate date range for Weekly/Monthly
    if (userScope !== "Daily" && endDate < startDate) {
      toast.error("Due date must be on or after start date");
      return;
    }

    const resolvedStartTime =
      userScope === "Daily" ? userStartTime : formatDate(startDate);
    const resolvedEndTime =
      userScope === "Daily" ? userEndTime : formatDate(endDate);

    if (formType === "Edit Task") {
      editTask.patchTask(taskId, {
        scope: userScope,
        taskId: taskId,
        title: userTitle,
        description: userDescription,
        startTime: resolvedStartTime,
        endTime: resolvedEndTime,
      });
      toast.success("Changes saved");
    } else {
      postTask.create({
        scope: userScope,
        taskId: taskId,
        title: userTitle,
        description: userDescription,
        startTime: resolvedStartTime,
        endTime: resolvedEndTime,
      });
      toast.success("Task created");
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
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
                <Label htmlFor="userScope">Scope</Label>
                <Select
                  defaultValue={userScope}
                  onValueChange={(value) => setScope(value)}
                  required={true}
                >
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

              {userScope !== "Daily" && (
                <div className="flex flex-row gap-2">
                  {/* Start Date */}
                  <div className="flex flex-1/2 flex-col gap-2">
                    <Label>Start Date</Label>
                    <Popover
                      open={startDateOpen}
                      onOpenChange={setStartDateOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="start-date-picker"
                          className="justify-between font-normal"
                        >
                          {startDate.toLocaleDateString()}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={startDate}
                          hideNavigation={true}
                          disabled={(d) => d < new Date()}
                          onSelect={(d) => {
                            if (d) {
                              setStartDate(d);
                              if (d > endDate) setEndDate(d);
                              setStartDateOpen(false);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Due Date */}
                  <div className="flex flex-1/2 flex-col gap-2">
                    <Label>Due Date</Label>
                    <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="end-date-picker"
                          className="justify-between font-normal"
                        >
                          {endDate.toLocaleDateString()}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={endDate}
                          hideNavigation={true}
                          disabled={(d) => d < startDate}
                          onSelect={(d) => {
                            if (d) {
                              setEndDate(d);
                              setEndDateOpen(false);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}

              {userScope === "Daily" && (
                <div className="flex">
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="start-time-picker" className="px-1">
                        Start Time
                      </Label>
                      <Input
                        type="time"
                        id="start-time-picker"
                        onChange={(e) => setStartTime(e.target.value)}
                        value={userStartTime}
                        required
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <Label htmlFor="end-time-picker" className="px-1">
                        Finish Time
                      </Label>
                      <Input
                        type="time"
                        id="end-time-picker"
                        onChange={(e) => setEndTime(e.target.value)}
                        value={userEndTime}
                        required
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
            {/* No DialogClose here — dialog only closes after validation passes in Submit */}
            <Button type="submit">
              {formType === "Edit Task" ? "Save changes" : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
