import { View } from "react-native";
import { CalendarDetailScreenProps, Task } from "../constants/types";
import { useContext, useEffect, useLayoutEffect } from "react";
import { format } from "date-fns";
import TaskComponent from "../components/TaskComponent";
import { useIsFocused } from "@react-navigation/native";
import { TaskContext } from "../store/task-store";
import { fetchTasksInaDay } from "../util/database";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CalendarDetailScreen: React.FC<CalendarDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const taskCtx = useContext(TaskContext);
  const isFocused = useIsFocused();
  const date = new Date(
    route.params.year,
    route.params.month - 1,
    route.params.date
  );

  useEffect(() => {
    async function getTask() {
      const response: any = await fetchTasksInaDay(date);
      const tasks: Task[] = [];
      var countTask = 0;
      var countUnfinish = 0;
      for (var i = 0; i < response.length; i++) {
        tasks.push({
          id: response[i].id,
          date: response[i].date,
          important: response[i].important === "0" ? false : true,
          isDone: response[i].isDone === "0" ? false : true,
          taskDescription: response[i].taskdescription,
          taskTitle: response[i].tasktitle,
          theme: response[i].theme,
          time: response[i].time,
          urgent: response[i].urgent === "0" ? false : true,
        });
        if (response[i].isDone === "0") {
          countTask++;
        } else if (response[i].isDone === "1") {
          countUnfinish++;
        }
      }
      taskCtx.setCompletedTaskInaDay(
        tasks.filter((task) => task.isDone === true)
      );
      taskCtx.setUnfinishedTaskInaDay(
        tasks.filter((task) => task.isDone === false)
      );
    }
    getTask();
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: format(date, "dd MMM yyyy") });
  }, [navigation]);
  return (
    <GestureHandlerRootView>
      <TaskComponent
        completedTaks={taskCtx.completedTasks}
        unFinishedTasks={taskCtx.unfinishedTasks}
      />
    </GestureHandlerRootView>
  );
};

export default CalendarDetailScreen;
