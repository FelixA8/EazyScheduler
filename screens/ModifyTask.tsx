import { NavigationContainerProps, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { ModifyTaskProps, Task } from "../constants/types";
import { useLayoutEffect } from "react";
import TaskForm from "../components/modify-task/TaskForm";
import IconButton from "../components/IconButton";
import { Colors } from "../constants/colors";
import { insertTask, updateTask } from "../util/database";

const ModifyTask: React.FC<ModifyTaskProps> = ({ navigation, route }) => {
  const isEdit = route.params.isEditing;

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEdit ? "Edit Task" : "Add Task" });
  }, [navigation, isEdit]);

  if (isEdit) {
    return (
      <View>
        <TaskForm
          onCancel={() => {}}
          onSubmit={onSubmit}
          defaultValues={route.params.taskValue}
        />
      </View>
    );
  }

  async function onSubmit(task: Task) {
    if (task.id === "-1") {
      const response = await insertTask(task);
      navigation.pop();
      return response;
    } else {
      const response = await updateTask(task);
      navigation.pop();
      return response;
    }
  }

  return (
    <View>
      <TaskForm onCancel={() => {}} onSubmit={onSubmit} defaultValues={null} />
    </View>
  );
};

export default ModifyTask;
