import { GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  onPress():void;
  icon: any;
  style:any;
  color: string;
  backgroundColor: string;
  size: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  icon,
  color,
  size,
  style,
  backgroundColor
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, styles.button, {backgroundColor: backgroundColor}, pressed && styles.pressed]}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
