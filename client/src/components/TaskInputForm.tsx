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
  httpMethod :string;
  endPoint:string;
};

export const TaskInputForm = ({
  triggerButton,
  formType,
  httpMethod,
  endPoint
}: TaskDInputFormProps) => {
  const today = new Date().toLocaleDateString();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>(new Date());

  const [start_time, setStartTime] = React.useState("09:00");
  const [end_time, setEndTime] = React.useState("11:00");
  const [tittle, setTaskTitle] = React.useState("");
  const [scope, setScope] = React.useState("Daily");
  const [description, setTaskDescription] = React.useState("");

  function ValidateForm(): void {
    if (tittle === "") {
      alert("Title cannot be empty");
    } else if (description === "") {
      alert("Description cannot be empty");
    } else if (end_time <= start_time) {
      alert("End time cannot be earlier or equal to start time");
    }
  }
  
  const Submit = async () => {
    
    const response = await fetch(`http://localhost:3000/${endPoint}`, {
      method: httpMethod,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tittle,
        description,
        date,
        scope,
        start_time,
        end_time,
      }),

    });
    const data = await response.json();
    console.log("Server response:", data);
  };


  
  const  EditTask =async ()=>{

    const responce = await fetch(`http://localhost:3000`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json"}
    }
    );

    return responce.json()
  }
 
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
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                placeholder="Enter task tittle..."
                required={true}
                onChange={(e) => setTaskTitle(e.target.value)}
                value="sphesihle"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor ="description">Description</Label>
              <Textarea
                required={true}
                placeholder="Enter task Description..."
                onChange={(e) => setTaskDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="flex gap-2 w-full justify-between">
              <div className="flex  flex-1/2 flex-col gap-2">
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
              <div className="flex ">
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 ">
                    <Label htmlFor="time-picker" className="px-1">
                      Start Time
                    </Label>
                    <Input
                      type="time"
                      id="time-picker"
                      value={start_time}
                      onChange={(e) => setStartTime(e.target.value)}
                      defaultValue={start_time}
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
                      defaultValue={end_time}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Scope</Label>
              <Select value={scope} onValueChange={(value) => setScope(value)}>
                <SelectTrigger className="flex w-full">
                  <SelectValue placeholder="Daily(tactical)" />
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
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={ValidateForm}
                type={
                  tittle === "" ||
                  description === "" ||
                  parseInt(end_time.split(":").join("")) <=
                    parseInt(start_time.split(":").join(""))
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
