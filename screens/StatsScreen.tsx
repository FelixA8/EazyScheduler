import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomNavBarStackParamList, Task } from "../constants/types";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import CalendarSlider from "../components/stats/CalendarSlider";
import CurrentStats from "../components/stats/CurrentStats";
import { useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { SummaryContext } from "../store/summary-store";

type StatsScreenProps = NativeStackScreenProps<
  RootBottomNavBarStackParamList,
  "StatsScreen"
>;

function getDatesOfPreviousWeek() {
  var dates = [];
  var today = new Date();

  for (var i = 0; i < 7; i++) {
    var previousDate = new Date(today);
    previousDate.setDate(today.getDate() - i);
    var year = previousDate.getFullYear();
    var month = previousDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
    var day = previousDate.getDate();
    dates.push(year + "-" + month + "-" + day);
  }

  return dates;
}

const sevenDays = getDatesOfPreviousWeek();

const StatsScreen: React.FC<StatsScreenProps> = () => {
  const sumamryCtx = useContext(SummaryContext);
  const isFocused = useIsFocused()

  return (
    <View style={styles.root}>
      <CalendarSlider />
      <CurrentStats />
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary700,
  },
});
