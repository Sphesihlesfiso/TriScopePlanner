import { InputItem } from "./InputItem";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "./ui/label";


  


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select,SelectContent,SelectItem,SelectGroup,SelectValue,SelectTrigger } from "./ui/select";


type TaskDInputFormProps ={
    triggerButton :React.ReactNode,
    formType :string
}

export const TaskInputForm =({triggerButton,formType } :TaskDInputFormProps) => {
  return (
         <Dialog>
      <form>
        <DialogTrigger asChild>
          {triggerButton}
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>{formType}</DialogTitle>
           
          </DialogHeader>
          <div className="grid grid-rows-4 gap-0.5 items-center w-full">
           
            <InputItem  inputType="text" inputPlaceholder="Enter task tittle..." inputLabel="Title"/>
            <Label htmlFor="description">Description</Label>
            <Textarea placeholder="Enter task Description..."  />
            
            <Label htmlFor="description">Scope</Label>
            <Select >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Daily(Tactical)"/>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
      
  )
}
