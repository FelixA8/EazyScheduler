import { ScrollView, StyleSheet, Text, View } from "react-native";
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
  if (unFinishedTasks.length === 0 && completedTaks.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.errorText}>No tasks has been made...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {unFinishedTasks.length !== 0 && (
        <Text style={styles.text}>Ongoing Task</Text>
      )}
      <TaskList tasks={unFinishedTasks} />
      {completedTaks.length !== 0 && (
        <Text style={styles.text}>Completed Task</Text>
      )}
      <TaskList tasks={completedTaks} />
    </ScrollView>
  );
};

export default TaskComponent;

const styles = StyleSheet.create({
  text: {
    color: "white",
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});
