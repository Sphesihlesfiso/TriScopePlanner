import { Target ,PlusIcon,LogOut} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
export const NavBar = () => {
  return (
    <nav className="sticky p-3.5 border" >
        <div className="flex align-middle justify-between">
            <ul className="flex  gap-4 items-center">
                <li>
                    <Button><Target/></Button>
                </li>

                <li>
                    <h1 className="text-3xl font-bold">Tri-Scope Planner</h1>
                </li>
            </ul>
            <ul className="flex  gap-4 items-center">
                <li>
                    <input type="text" placeholder="Search your task" ></input>
                </li>
                <li>
                   <Button> <PlusIcon/></Button>
                </li>
                <li>
                    <ModeToggle/>
                </li>
                <li>
                    <Button><LogOut/></Button>
                </li>
            </ul>
        </div>
    </nav>
  )
}
