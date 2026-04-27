export type InputItemProps = {
  inputType: string;
  inputPlaceholder: string;
  inputLabel: string;
  required: boolean;
};
export type TaskCardProps = {
  title: string;
  task: string;
  startTime: string;
  endTime: string;
  taskId: number;
};
export type TaskHolderProps = {
  scope: string;
  due: string;
};
export type Task = {
  taskId: number;
  title: string;
  description: string;
  startTime: string;
  scope: string;
  endTime: string;
};
export type TaskInputFormProps = {
  triggerButton: React.ReactNode;
  formType: string;
  taskId:number
};
export type User = {
  userName: string;
  password: string;
  email: string;
};
