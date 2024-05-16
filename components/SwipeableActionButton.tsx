import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SwipeableActionButtonProps {
  name: any;
  color: string;
  backgroundColor: string;
}

const SwipeableActionButton: React.FC<SwipeableActionButtonProps> = ({
  backgroundColor,
  color,
  name,
}) => {
  return (
    <View style={[styles.deleteBox, {backgroundColor: backgroundColor}]}>
      <Ionicons name={name} color={color} size={36} />
    </View>
  );
};

export default SwipeableActionButton;

const styles = StyleSheet.create({
  deleteBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 10,
    height: "100%",
  },
});
