import { ReactNode, createContext, useState } from "react";
import { Task } from "../constants/types";

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
  setCompletedTaskInaDay: (task: Task, action: string) => void;
  setUnfinishedTaskInaDay: (task: Task, action: string) => void;
  refreshTasks: () => void;
}

export const TaskContext = createContext<TaskContextType>({
  completedTasks: [],
  unfinishedTasks: [],
  totalTaskCompleted: 0,
  totalTaskUnfinished: 0,
  setTotalTasksCompletedInaDay: (total: number) => {},
  setTotalTasksUnfinishedInaDay: (total: number) => {},
  setCompletedTaskInaDay: (task: Task, action: string) => {},
  setUnfinishedTaskInaDay: (task: Task, action: string) => {},
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

  function setCompletedTaskInaDay(task: Task, action: string) {
    if (action === "add") {
      setCompletedTasks((prevTask) => [...prevTask, task]);
    } else if (action === "remove") {
      setCompletedTasks((prevTask) =>
        prevTask.filter((taskA) => taskA.id !== task.id)
      );
    }
  }

  function setUnfinishedTaskInaDay(task: Task, action: string) {
    if (action === "add") {
      setUnfinishedTasks((prevTask) => [...prevTask, task]);
    } else if (action === "remove") {
      setUnfinishedTasks((prevTask) =>
        prevTask.filter((taskA) => taskA.id !== task.id)
      );
    }
  }

  function refreshTasks() {
    setUnfinishedTasks([]);
    setCompletedTasks([]);
    setTotalTaskCompleted(0);
    setTotalTaskUnfinished(0);
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
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContextProvider;
