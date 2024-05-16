import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { useContext } from "react";
import { SummaryContext } from "../../store/summary-store";

const CurrentStats = () => {
  const summaryCtx = useContext(SummaryContext)
  
  return (
    <View style={styles.root}>
      <Text style={styles.textTitle}>Last 7 days</Text>
      <View style={styles.row}>
        <View style={[styles.container, { flex: 1 }]}>
          <Text style={styles.textBold}>{summaryCtx.totalTasksCompleted}</Text>
          <Text style={styles.textSubTitle}>Total Tasks Completed</Text>
        </View>
        <View style={[styles.container, { flex: 1 }]}>
          <Text style={styles.textBold}>{summaryCtx.totalTasksUnfinished}</Text>
          <Text style={styles.textSubTitle}>Total Tasks Unfinished</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.textBold}>{summaryCtx.productivityRate.toFixed(2)}</Text>
        <Text style={styles.textSubTitle}>Productivity Rate</Text>
      </View>
    </View>
  );
};

export default CurrentStats;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
  },
  textTitle: {
    color: "#B6BDC8",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 12,
  },
  container: {
    height: 130,
    backgroundColor: Colors.primary400,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 12,
  },
  textBold: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  textSubTitle: {
    color: "#B6BDC8",
  },
});
