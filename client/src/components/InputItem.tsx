import { Input } from "./ui/input"
import { Label } from "./ui/label"
type InputItemProps ={
    inputType:string,
    inputPlaceholder :string,
    inputLabel:string
    
}
export const InputItem = ({inputType,inputPlaceholder,inputLabel}:InputItemProps) => {
    return (
        <div className="flex flex-col gap-2">
        <Label htmlFor={inputLabel}>{inputLabel}</Label>
        <Input type={inputType} placeholder={inputPlaceholder}  name={inputLabel}/>
        </div>
    )
}