import { ScrollView, Text } from "react-native";
import { Task } from "../constants/types";
import TaskList from "./TaskList";

interface TaskComponentProps {
  unFinishedTasks: Task[];
  completedTaks: Task[];
}

const TaskComponent: React.FC<TaskComponentProps> = ({
  completedTaks,
  unFinishedTasks,
}) => {
  return (
    <ScrollView>
      <Text>UnFinished Task</Text>
      <TaskList tasks={unFinishedTasks} />
      <Text>Completed Task</Text>
      <TaskList tasks={completedTaks} />
    </ScrollView>
  );
};

export default TaskComponent;
