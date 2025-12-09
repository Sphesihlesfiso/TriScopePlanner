
import { Trash,Edit,Calendar ,Clock} from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

import { TaskInputForm } from "./TaskInputForm";
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
                    <Checkbox/>
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
                
                            
                                <TaskInputForm triggerButton={<Button ><Edit/></Button>}formType="Edit Task" />
                <Button><Trash/></Button>
            </div>
                
            </ul>

            <div>
                {task}
            </div>
        
    </div>
    )
}