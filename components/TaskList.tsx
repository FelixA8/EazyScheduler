import { FlatList } from "react-native";
import { Task } from "../constants/types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <FlatList
    style={{paddingHorizontal: 12}}
    scrollEnabled={false}
      data={tasks}
      renderItem={(itemData) => <TaskCard task={itemData.item} />}
    />
  );
};

export default TaskList;
