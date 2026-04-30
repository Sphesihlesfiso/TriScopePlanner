import { Target, PlusIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { TaskInputForm } from "@/components/TaskInputForm";
import { logOut } from "@/api/endpoints";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import React from "react";

interface NavBarProps {
  onRefresh: () => void;
}

export const NavBar = ({ onRefresh }: NavBarProps) => {
  const navigate = useNavigate();

  const signOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await logOut.logout();
    if (res.data.success) {
      navigate("/");
      toast.success("Successfully logged out.");
    } else {
      toast.error("Failed to logout user.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left — logo + title */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shrink-0">
            <Target size={16} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm md:text-base tracking-tight">
              Tri-Scope
            </span>
            <span className="hidden md:block text-[10px] text-muted-foreground tracking-widest uppercase">
              Planner
            </span>
          </div>
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <TaskInputForm
            triggerButton={
              <Button size="sm" className="gap-1.5 font-medium">
                <PlusIcon size={15} />
                <span className="hidden sm:inline">New Task</span>
              </Button>
            }
            formType="Create New Task"
            taskId={0}
            description=""
            title=""
            startTime=""
            scope=""
            endTime=""
            onSuccess={onRefresh}
          />

          <ModeToggle />

          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-destructive transition-colors"
            onClick={signOut}
            title="Sign out"
          >
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </nav>
  );
};
