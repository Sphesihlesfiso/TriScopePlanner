import { Trash, Edit, Calendar, Clock, CheckSquare } from "lucide-react";
import { Button } from "./ui/button";
// import { Checkbox } from "./ui/checkbox";
import { TaskInputForm } from "./TaskInputForm";

type TaskCardProps = {
  title: string;
  task: string;
  start_time: string;
  end_time:string
  id: number;
};
export const TaskCard = ({ title, task, start_time,end_time,id }: TaskCardProps) => {
  const DeleteTask = async () => {
    const response = await fetch(`http://localhost:3000/task/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = response.json();
    console.log(data);
  };
  const addToGoogleCalender = async () => {
    const response = await fetch(
      `http://localhost:3000/googlecalender/task/:${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    response.json();
  };
  return (
    <div className="grid grid-rows-2 gap-3 border p-3 rounded-2xl">
      <ul className="flex justify-between gap-1.5">
        {/* <li>
          <Checkbox />
        </li> */}
        <li>{title}</li>
        <li>
          <ul className="flex gap-1 align-middle justify-center">
            <li>
              <Clock />
            </li>
            <li>
              <p>{start_time}</p>
            </li>
            -
            <li >
              <p>{end_time}</p>
            </li>
          </ul>
        </li>
        <div className="flex align-middle gap-1">
          <Button onClick={addToGoogleCalender}>
            <Calendar />
          </Button>

          <TaskInputForm
            triggerButton={
              <Button>
                <Edit />
              </Button>
            }
            formType="Edit Task"
            httpMethod="PATCH"
            endPoint={`task/` + id}
          />

          <Button onClick={DeleteTask}>
            <Trash />
          </Button>
        </div>
      </ul>

      <div>{task}</div>
    </div>
  );
};
