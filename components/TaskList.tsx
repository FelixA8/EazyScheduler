import { FlatList } from "react-native";
import { Task } from "../constants/types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <FlatList
    scrollEnabled={false}
      data={tasks}
      renderItem={(itemData) => <TaskCard task={itemData.item} />}
    />
  );
};

export default TaskList;
