import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "./ui/card"
import { TaskCard } from "./taskcard"
type TaskHolderProps = {
    scope :string,
    due :string
;}
export const TaskHolder =({scope,due}:TaskHolderProps)=>{
    return (
        <Card className="w-full h-full border rounded-2xl">
            <CardHeader className="border-b">
                <CardTitle>{scope}</CardTitle>
                <CardDescription>{due}</CardDescription>
            </CardHeader>
            <CardContent>
                <TaskCard/>
            </CardContent>
        </Card>
    )
}
