import { Target, PlusIcon, LogOut, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { TaskInputForm } from "@/components/TaskInputForm";
import { InputGroupAddon, InputGroupInput,InputGroup } from "@/components/ui/input-group";
export const NavBar = () => {
  const logOutUser = async () => {
    const response = await fetch(`http://localhost:3000/logout`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response.json();
  };

  return (
    <nav className="sticky p-3.5 border">
      <div className="flex align-middle justify-between">
        <ul className="flex gap-1.5 md:gap-4 items-center">
          <li className="hidden sm:hidden md:block lg:block">
            <Button>
              <Target />
            </Button>
          </li>

          <li>
            <h1 className="lg:text-3xl font-bold">Tri-Scope Planner</h1>
          </li>
        </ul>
        <ul className="flex flex-row gap-0.5 lg:gap-4 items-center ">
          <li>
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </li>
          <li>
            <TaskInputForm
              triggerButton={
                <Button className="sm:gap-0.5 md:flex flex-row gap-1.5" >
                  <PlusIcon /> New Task
                </Button>
              }
              formType="Create New Task"
              httpMethod="POST"
              endPoint="task"
            ></TaskInputForm>
          </li>
          <li>
            <ModeToggle />
          </li>
          <li>
            <Button type="button">
              <LogOut onClick={logOutUser} />
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
