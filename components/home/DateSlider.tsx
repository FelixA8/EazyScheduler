import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from "date-fns";
import React, { type ReactElement, useState, useContext, useLayoutEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { DateContext } from "../../store/date-store";

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();

type Week = {
  date: Date;
}[];

const dates = eachWeekOfInterval({
  start: subDays(new Date(), 14),
  end: addDays(new Date(), 28),
}).reduce((acc: Week[], cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });

  const formattedWeek: Week = allDays.map((day) => ({
    date: day,
  }));

  acc.push(formattedWeek);
  return acc;
}, []);

const DateSlider = (): ReactElement => {
  const dateCtx = useContext(DateContext);

  useLayoutEffect(() => {})
  return (
    <PagerView style={styles.container} initialPage={2}>
      {dates.map((week, i) => {
        return (
          <View key={i}>
            <View style={styles.row}>
              {week.map((day, j) => {
                const txt = format(day.date, "EEE");
                return (
                  <View key={j} style={styles.column}>
                    <Pressable
                      onPress={()=>{dateCtx.changeSelectedDate(day.date)}}
                      style={[
                        styles.day,
                        day.date.getDate() === currentDay &&
                          day.date.getMonth() === currentMonth &&
                          styles.currDay,
                          dateCtx.selectedDate.getDate() === day.date.getDate() && styles.selectedDate
                      ]}
                    >
                      <Text style={styles.text}>{txt}</Text>
                      <Text style={styles.text}>{day.date.getDate()}</Text>
                    </Pressable>
                    {day.date.getDate() === currentDay &&
                      day.date.getMonth() === currentMonth && (
                        <View style={styles.dot} />
                      )}
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </PagerView>
  );
};

export default DateSlider;

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: "white",
  },
  day: {
    width: 40,
    padding: 3,
    alignItems: "center",
  },
  currDay: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#00AC1C",
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: "#00AC1C",
    borderRadius: 25,
  },
  selectedDate: {
    backgroundColor: "#2C3138",
    borderRadius: 2,
  }
});
