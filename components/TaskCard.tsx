import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList, Task } from "../constants/types";
import { Swipeable } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import SwipeableActionButton from "./SwipeableActionButton";
import { Colors } from "../constants/colors";
import { changeDoneTask, deleteTask, fetchTasksInaDay } from "../util/database";
import { useContext } from "react";
import { TaskContext } from "../store/task-store";
import { DateContext } from "../store/date-store";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dateCtx = useContext(DateContext);
  const taskCtx = useContext(TaskContext);

  function navigateToAddScreen() {
    navigation.navigate("ModifyTask", { isEditing: true, taskValue: task });
  }

  async function changeIsDoneStatus() {
    await changeDoneTask(task.id, !task.isDone);
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
  }

  async function removeTask() {
    await deleteTask(task.id);
    taskCtx.deleteTask(task.id, task.isDone);
  }

  const leftSwipe = (dragX: any) => {
    return (
      <TouchableOpacity activeOpacity={0.3} onPress={removeTask}>
        <SwipeableActionButton
          name={"trash-outline"}
          color="white"
          backgroundColor="#AC0000"
        />
      </TouchableOpacity>
    );
  };

  const rightSwipe = (dragX: any) => {
    return (
      <TouchableOpacity activeOpacity={0.3} onPress={changeIsDoneStatus}>
        <SwipeableActionButton
          name={task.isDone ? "play-back-outline" : "checkmark-outline"}
          color="white"
          backgroundColor="#0097AC"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginVertical: 6 }}>
      <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
        <Pressable
          style={styles.rowBetween}
          onPress={() => {
            navigateToAddScreen();
          }}
        >
          <View>
            <Text style={styles.title}>{task.taskTitle}</Text>
            <View style={styles.row}>
              <View
                style={task.important ? styles.yellowBlock : styles.blueBlock}
              />
              <Text style={styles.smallText}>
                {task.important ? "important" : "not important"}
              </Text>
            </View>
            <View style={styles.row}>
              <View
                style={task.urgent ? styles.yellowBlock : styles.blueBlock}
              />
              <Text style={styles.smallText}>
                {task.urgent ? "urgent" : "not urgent"}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.timeText}>{`${task.time
              .toString()
              .substring(0, 5)}`}</Text>
            <Text style={styles.smallText}>starts at</Text>
          </View>
        </Pressable>
        <View style={styles.line} />
      </Swipeable>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
  },
  textIcon: {
    fontSize: 20,
    borderRadius: 5,
    color: "#0097AC",
    fontWeight: "bold",
    marginRight: 12,
    paddingHorizontal: 12,
  },
  iconContainer: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
    position: "absolute",
    right: "10%",
    top: "10%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rowBetween: {
    backgroundColor: Colors.primary500,
    shadowColor: "white",
    shadowOpacity: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  yellowBlock: {
    width: 5,
    height: 5,
    backgroundColor: "#CBC200",
    marginRight: 12,
  },
  blueBlock: {
    width: 5,
    height: 5,
    backgroundColor: "#0097AC",
    marginRight: 12,
  },
  smallText: {
    fontSize: 12,
    color: "white",
  },
  timeText: {
    textAlign: "right",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  line: {
    backgroundColor: "#8592A3",
    height: 3,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
