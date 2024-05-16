import { Button, StyleSheet, TextInput, View } from "react-native";
import Input from "./Input";
import { useLayoutEffect, useState } from "react";
import { Task } from "../../constants/types";
import { isValid, min } from "date-fns";
import DateTimeButton from "./DateTimeButton";
import ImportantUrgentSwitch from "./ImportantUrgentSwitch";
import IconButton from "../IconButton";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

interface TaskFormProps {
  onCancel: () => void;
  onSubmit: (task: Task) => void;
  defaultValues: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const navigation = useNavigation();
  function saveButton() {
    return (
      <IconButton
        backgroundColor={Colors.primary700}
        color="#FFF"
        icon={"save-outline"}
        onPress={onPress}
        size={24}
        style={{}}
      />
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({ headerRight: saveButton });
  }, [navigation, onPress]);
  var hours;
  var minutes;
  var seconds;
  if (defaultValues) {
    [hours, minutes, seconds] = defaultValues.time
      .toString()
      .split(":")
      .map(Number);
  }

  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.taskTitle.toString() : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.taskDescription.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? new Date(defaultValues.date) : new Date(),
      isValid: true,
    },
    time: {
      value: defaultValues
        ? new Date(2000, 0, 1, hours, minutes, seconds)
        : new Date(),
      isValid: true,
    },
    important: {
      value: defaultValues ? defaultValues.important : false,
      isValid: true,
    },
    isDone: {
      value: defaultValues ? defaultValues.isDone : false,
      isValid: true,
    },
    urgent: {
      value: defaultValues ? defaultValues.urgent : false,
      isValid: true,
    },
    theme: {
      value: defaultValues ? defaultValues.theme.toString() : false,
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier: any, enteredValue: any) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function onPress() {
    const titleIsValid = inputs.title.value.trim().length > 0;
    if (!titleIsValid) {
      setInputs((curInputs) => {
        return {
          ...curInputs,
          title: { value: curInputs.title.value, isValid: titleIsValid },
        };
      });
      return;
    }
    onSubmit({
      date: inputs.date.value,
      important: inputs.important.value,
      isDone: inputs.isDone.value,
      taskDescription: inputs.description.value,
      taskTitle: inputs.title.value,
      theme: "default",
      time: inputs.time.value,
      urgent: inputs.urgent.value,
      id: defaultValues ? defaultValues?.id : "-1".toString(),
    });
  }

  return (
    <View style={styles.root}>
      <Input
        label="Title"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "title"),
          value: inputs.title.value,
        }}
        invalid={!inputs.title.isValid}
        style={{}}
      />
      <Input
        label="Description"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
          multiline: true,
        }}
        invalid={!inputs.description.isValid}
        style={{}}
      />
      <DateTimeButton
        date={inputs.date.value}
        time={inputs.time.value}
        inputChange={inputChangedHandler}
      />
      <ImportantUrgentSwitch
        isImportant={inputs.important.value}
        isUrgent={inputs.urgent.value}
        inputChange={inputChangedHandler}
      />
    </View>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
  },
});
