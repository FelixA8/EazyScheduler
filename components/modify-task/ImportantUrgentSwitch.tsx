import { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

interface ImportantUrgentSwitchProps {
  isImportant: boolean;
  isUrgent: boolean;
  inputChange: (inputIdentifier: any, enteredValue: any) => void;
}

const ImportantUrgentSwitch: React.FC<ImportantUrgentSwitchProps> = ({
  inputChange,
  isImportant,
  isUrgent,
}) => {
  const [important, setImportant] = useState(isImportant);
  const [urgent, setUrgent] = useState(isUrgent);
  function importantHandler() {
    setImportant(!important);
    inputChange("important", !important);
  }

  function urgentHandler() {
    setUrgent(!urgent);
    inputChange("urgent", !urgent);
  }

  return (
    <View style={styles.root}>
      <Pressable
        style={({ pressed }) => {
          return [
            pressed && styles.buttonPress,
            styles.button,
            { backgroundColor: important ? "#CBC200" : "#0097AC" },
          ];
        }}
        onPress={importantHandler}
      >
        <Text style={styles.text}>
          {important ? "IT'S IMPORTANT" : "IT'S NOT IMPORTANT"}
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => {
          return [
            pressed && styles.buttonPress,
            styles.button,
            { backgroundColor: urgent ? "#CBC200" : "#0097AC" },
          ];
        }}
        onPress={urgentHandler}
      >
        <Text style={styles.text}>
          {urgent ? "IT'S URGENT" : "IT'S NOT URGENT"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonPress: {
    opacity: 0.8,
  },
});

export default ImportantUrgentSwitch;
