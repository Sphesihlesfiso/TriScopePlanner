export type InputItemProps = {
  inputType: string;
  inputPlaceholder: string;
  inputLabel: string;
  required: boolean;
};
export type TaskCardProps = {
  title: string;
  startTime: string;
  endTime: string;
  taskId: number;
  description: string;
  scope: string;
  onRefresh: () => void;
};
export type TaskHolderProps = {
  scope: string;
  due: string;
  refreshKey: number;
  onRefresh: () => void;
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
  taskId: number;
  title: string;
  description: string;
  startTime: string;
  scope: string;
  endTime: string;
  onSuccess?: () => void;
};
export type User = {
  userName: string;
  password: string;
  email: string;
};
