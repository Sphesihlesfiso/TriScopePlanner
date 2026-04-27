import { Target, PlusIcon, LogOut, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { TaskInputForm } from "@/components/TaskInputForm";
import {
  InputGroupAddon,
  InputGroupInput,
  InputGroup,
} from "@/components/ui/input-group";
import { logOut } from "@/api/endpoints";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export const NavBar = () => {
  const navigate=useNavigate()
  const signOut = async (e:React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    const res= await logOut.logout();
    if (res.data.success){
      navigate("/login") 
    toast.success("Successfully loged out.")}
    else{
      toast.error("Failed to logout user.")
    }
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
                <Button className="sm:gap-0.5 md:flex flex-row gap-1.5">
                  <PlusIcon /> New Task
                </Button>
              }
              formType="Create New Task"
              taskId={0}
             
            ></TaskInputForm>
          </li>
          <li>
            <ModeToggle />
          </li>
          <li>
            <Button type="button" onClick={signOut}>
              <LogOut />
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
