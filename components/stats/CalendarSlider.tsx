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

type Month = {
  date: Date;
}[];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(),
  currDate = date.getDate();

const currentYear = new Date().getFullYear();

const dates = eachMonthOfInterval({
  start: new Date(currentYear - 1, 12, 31),
  end: new Date(currentYear, 12, 31),
}).reduce((acc: Month[], cur) => {
  const allDays = eachDayOfInterval({
    start: addDays(startOfMonth(cur), 1),
    end: addDays(endOfMonth(cur), 1),
  });

  const formattedMonth: Month = allDays.map((day) => ({
    date: day,
  }));

  acc.push(formattedMonth);
  return acc;
}, []);

function isCurrentDay(day: Date): boolean {
  if (
    currDate === day.getDate() &&
    currMonth === day.getMonth() &&
    currYear === day.getFullYear()
  ) {
    return true;
  }
  return false;
}

function isSelectedDay(day: Date, selectedDate: Date): boolean {
  if (
    selectedDate.getDate() === day.getDate() &&
    selectedDate.getMonth() === day.getMonth() &&
    selectedDate.getFullYear() === day.getFullYear()
  ) {
    return true;
  }
  return false;
}

function isCurrentMonth(day: Date, month: number, year: number) {
  if (day.getMonth() === month && day.getFullYear() === year) {
    return false;
  }
  return true;
}

const CalendarSlider = () => {
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date());
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <PagerView style={styles.container} initialPage={currMonth}>
      {dates.map((month, i) => {
        var sortedMonth: Date[] = [];

        for (var i = month[0].date.getDay(); i > 0; i--) {
          sortedMonth.push(
            subDays(
              new Date(
                month[0].date.getFullYear(),
                month[0].date.getMonth(),
                month[0].date.getDate()
              ),
              i
            )
          );
        }
        if (month[0].date.getDay() === 0) {
          for (var i = 7; i > 0; i--) {
            sortedMonth.push(
              subDays(
                new Date(
                  month[0].date.getFullYear(),
                  month[0].date.getMonth(),
                  month[0].date.getDate()
                ),
                i
              )
            );
          }
        }
        for (var i = 0; i < month.length; i++) {
          sortedMonth.push(
            new Date(
              month[i].date.getFullYear(),
              month[i].date.getMonth(),
              month[i].date.getDate()
            )
          );
        }
        if (month[month.length - 1].date.getDay() !== 0) {
          for (var i = month[month.length - 1].date.getDay(); i < 6; i++) {
            sortedMonth.push(
              addDays(
                month[month.length - 1].date,
                i - month[month.length - 1].date.getDay() + 1
              )
            );
          }
        }

        return (
          <View key={month[0].date.toString()}>
            <View style={styles.row}>
              <Text style={styles.monthTitle}>
                {format(month[0].date, "MMMM")}
              </Text>
              <Text style={styles.monthTitle}>
                {format(month[0].date, "y")}
              </Text>
            </View>
            <View style={styles.rowWrap}>
              {dayNames.map((dayName) => (
                <View key={dayName} style={[styles.day]}>
                  <Text style={styles.text}>{dayName}</Text>
                </View>
              ))}
            </View>
            <View style={styles.rowWrap}>
              {sortedMonth.map((day) => (
                <Pressable
                  onPress={() => {
                    setSelectedCalendarDate(day);
                    navigation.navigate("CalendarDetailScreen", {
                      date: day.getDate(),
                      month: day.getMonth(),
                      year: day.getFullYear(),
                    });
                  }}
                  key={Math.random().toString()}
                  style={[
                    styles.day,
                    isCurrentDay(day) && styles.currDay,
                    isSelectedDay(day, selectedCalendarDate) &&
                      styles.selectedDate,
                  ]}
                >
                  <Text
                    style={[
                      styles.text,
                      isCurrentMonth(
                        day,
                        month[0].date.getMonth(),
                        month[0].date.getFullYear()
                      ) && { opacity: 0.3 },
                    ]}
                  >
                    {day.getDate()}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        );
      })}
    </PagerView>
  );
};

export default CalendarSlider;

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  column: {
    flexDirection: "column",
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  rowWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  monthTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  selectedDate: {
    backgroundColor: "#2C3138",
    borderRadius: 2,
  },
  day: {
    width: "14%",
    padding: 3,
    alignItems: "center",
    marginVertical: 3,
  },
  currDay: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#00AC1C",
  },
});
