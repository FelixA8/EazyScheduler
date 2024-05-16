import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  addDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfDay,
  endOfMonth,
  format,
  getMonth,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { RootStackParamList } from "../../constants/types";
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import { Colors } from "../../constants/colors";

const CalendarSlider = () => {
  const [selected, setSelected] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Calendar
      theme={{
        backgroundColor: Colors.primary700,
        calendarBackground: Colors.primary700,
        arrowColor: Colors.primary400,
        textInactiveColor: Colors.primary200,
        dayTextColor: "white",
        todayTextColor: "#00AC1C",
        textDisabledColor: Colors.primary200,
        selectedDayBackgroundColor: "#2C3138",
        monthTextColor: "white",
        selectedDayTextColor: "#ffffff",
      }}
      onDayPress={(day) => {
        setSelected(day.dateString);
        navigation.navigate("CalendarDetailScreen", {
          date: day.day,
          month: day.month,
          year: day.year,
        });
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          selectedTextColor: "orange",
        },
      }}
    />
  );
};

export default CalendarSlider;
