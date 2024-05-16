import { ReactNode, createContext, useState } from "react";
import { Task } from "../constants/types";
import { deleteTask } from "../util/database";

interface MyComponentProps {
  children: ReactNode;
}

// Define the type for the context value
interface TaskContextType {
  completedTasks: Task[];
  unfinishedTasks: Task[];
  totalTaskCompleted: number;
  totalTaskUnfinished: number;
  setTotalTasksCompletedInaDay: (total: number) => void;
  setTotalTasksUnfinishedInaDay: (total: number) => void;
  setCompletedTaskInaDay: (tasks: Task[]) => void;
  setUnfinishedTaskInaDay: (tasks: Task[]) => void;
  deleteTask:(id:string, isDone:boolean) => void
  refreshTasks: () => void;
}

export const TaskContext = createContext<TaskContextType>({
  completedTasks: [],
  unfinishedTasks: [],
  totalTaskCompleted: 0,
  totalTaskUnfinished: 0,
  setTotalTasksCompletedInaDay: (total: number) => {},
  setTotalTasksUnfinishedInaDay: (total: number) => {},
  setCompletedTaskInaDay: (tasks: Task[]) => {},
  setUnfinishedTaskInaDay: (tasks: Task[]) => {},
  deleteTask: (id:string, isDone:boolean)=>{},
  refreshTasks: () => {},
});

const TaskContextProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [unfinishedTasks, setUnfinishedTasks] = useState<Task[]>([]);
  const [totalTaskCompleted, setTotalTaskCompleted] = useState(0);
  const [totalTaskUnfinished, setTotalTaskUnfinished] = useState(0);

  function setTotalTasksCompletedInaDay(total: number) {
    setTotalTaskCompleted(total);
  }

  function setTotalTasksUnfinishedInaDay(total: number) {
    setTotalTaskUnfinished(total);
  }

  function setCompletedTaskInaDay(tasks: Task[]) {
    setCompletedTasks(tasks)
  }

  function setUnfinishedTaskInaDay(tasks: Task[]) {
    setUnfinishedTasks(tasks);
  }

  function refreshTasks() {
    setUnfinishedTasks([]);
    setCompletedTasks([]);
    setTotalTaskCompleted(0);
    setTotalTaskUnfinished(0);
  }

  function deleteTask(id:string, isDone:boolean) {
    
    if(isDone) {
      setCompletedTasks((prevTask) => prevTask.filter((task)=>task.id !== id))
    } else {
      setUnfinishedTasks((prevTask) => prevTask.filter((task)=>task.id !== id))
    }
  }

  const value = {
    completedTasks: completedTasks,
    unfinishedTasks: unfinishedTasks,
    totalTaskCompleted: totalTaskCompleted,
    totalTaskUnfinished: totalTaskUnfinished,
    setTotalTasksCompletedInaDay: setTotalTasksCompletedInaDay,
    setTotalTasksUnfinishedInaDay: setTotalTasksUnfinishedInaDay,
    setCompletedTaskInaDay: setCompletedTaskInaDay,
    setUnfinishedTaskInaDay: setUnfinishedTaskInaDay,
    refreshTasks: refreshTasks,
    deleteTask: deleteTask,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContextProvider;
