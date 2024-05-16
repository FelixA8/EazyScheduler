import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";

interface DateTimeButtonProps {
  date: Date;
  time: Date;
  inputChange: (inputIdentifier: any, enteredValue: any) => void;
}

const DateTimeButton: React.FC<DateTimeButtonProps> = ({
  inputChange,
  date,
  time,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showTimePicker, setShowTimePicker] = useState(false);

  function toggleDatePicker() {
    setShowDatePicker(!showDatePicker);
  }

  function toggleTimePicker() {
    setShowTimePicker(!showTimePicker);
  }

  const onDateChange: any = (
    event: DateTimePickerEvent,
    selectedDate: Date
  ) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;
    if (type == "set") {
      const currentDate = selectedDate;
      inputChange("date", currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  const onTimeChange: any = (
    event: DateTimePickerEvent,
    selectedDate: Date
  ) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;
    if (type == "set") {
      const currentTime = selectedDate;
      inputChange("time", currentTime);
      if (Platform.OS === "android") {
        toggleTimePicker();
      }
    } else {
      toggleTimePicker();
    }
  };

  // Add leading zeros if necessary
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  const minutes =
  time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();

  return (
    <View style={styles.row}>
      <Pressable
        style={[styles.container, { flex: 4 }]}
        onPress={toggleDatePicker}
      >
        <Ionicons name="calendar-outline" size={24} color={"#00AC1C"} />
        <TextInput
          style={styles.input}
          editable={false}
          selectTextOnFocus={false}
          value={`${day}-${month}-${date.getFullYear()}`}
        />
      </Pressable>
      <Pressable
        style={[styles.container, { flex: 2, justifyContent: 'center' }]}
        onPress={toggleTimePicker}
      >
        <Ionicons name="time-outline" size={24} color={"#00AC1C"} />
        <TextInput
          style={styles.input}
          editable={false}
          selectTextOnFocus={false}
          value={`${hours}:${minutes}`}
        />
      </Pressable>
      {showDatePicker && (
        <RNDateTimePicker
          value={date}
          mode="date"
          onChange={onDateChange}
        />
      )}
      {showTimePicker && (
        <RNDateTimePicker
          value={time}
          mode="time"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
};

export default DateTimeButton;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 12,
  },
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
    backgroundColor: Colors.primary500,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: 'center'
  },
  input: {
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: Colors.primary100,
  },
});
