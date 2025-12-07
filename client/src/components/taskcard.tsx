import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Trash,Edit,Calendar ,Clock,X} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
type TaskCardProps ={
    title:string,
    task:string,
    time:string
}
export const TaskCard =({title,task,time}:TaskCardProps) =>{
    return(
        <div className="grid grid-rows-2 gap-3 border p-3 rounded-2xl">
            <ul className="flex justify-between gap-1.5">
                <li>
                    <input type="checkbox" className=""/>
                </li>
                <li>
                    {title}
                </li>
                <li>
                    <ul className="flex gap-1 align-middle justify-center">
                        <li>
                            <Clock/>
                        </li>
                        <li>
                            {time}
                        </li>
                    </ul>

                </li>
                <div className="flex align-middle gap-1">
                <Button><Calendar/></Button>
                    <Popover>
            <PopoverTrigger asChild >
                 <Button ><Edit/></Button>
            </PopoverTrigger>
            <PopoverContent>
                <Card className="border-0">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <h1 className="font-bold">Edit Task</h1> <X/>
                        </CardTitle>
        
                    </CardHeader>
                    <CardContent>
                        <p>The form goes here</p>
                    </CardContent>
                </Card>

            </PopoverContent>
        </Popover>
               
                <Button><Trash/></Button>
            </div>
                
            </ul>

            <div>
                {task}
            </div>
        
    </div>
    )
}