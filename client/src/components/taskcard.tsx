import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
export const TaskCard =() =>{
    return(
        <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
    )
}