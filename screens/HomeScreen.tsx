import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  RootBottomNavBarStackParamList,
  RootStackParamList,
  Task,
} from "../constants/types";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { DateContext } from "../store/date-store";
import { TaskContext } from "../store/task-store";
import { fetchTasksInaDay } from "../util/database";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateSlider from "../components/home/DateSlider";
import TaskComponent from "../components/TaskComponent";
import IconButton from "../components/IconButton";

type HomeScreenProps = NativeStackScreenProps<
  RootBottomNavBarStackParamList,
  "HomeScreen"
>;

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const dateCtx = useContext(DateContext);
  const taskCtx = useContext(TaskContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getTask() {
      setIsLoading(true);
      const response: any = await fetchTasksInaDay(dateCtx.selectedDate);
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
      setIsLoading(false);
    }
    getTask();
  }, [isFocused, dateCtx.selectedDate]);

  function navigateToAddScreen() {
    navigation.navigate("ModifyTask", { isEditing: false, taskValue: null });
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.root}>
        <IconButton
          style={styles.floatingButton}
          backgroundColor="#FFFFFF"
          color="#0B2447"
          icon="add"
          size={36}
          onPress={navigateToAddScreen}
        />
        <DateSlider />
        <TaskComponent
          completedTaks={taskCtx.completedTasks}
          unFinishedTasks={taskCtx.unfinishedTasks}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary700,
  },
  floatingButton: {
    position: "absolute",
    zIndex: 99,
    bottom: 10,
    right: 10,
    padding: 8,
  },
});
