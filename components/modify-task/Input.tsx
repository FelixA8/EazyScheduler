import { StyleProp, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";

interface InputProps {
  label: string;
  style: {};
  textInputConfig: {};
  invalid: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  style,
  textInputConfig,
  invalid,
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {invalid ? `${label} is empty` : label}
      </Text>
      <TextInput
        cursorColor={"white"}
        selectionColor={"white"}
        style={[styles.input]}
        {...textInputConfig}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  invalidLabel: {
    color: "red",
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: "white",
    margin: 4,
  },
  input: {
    backgroundColor: Colors.primary500,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: Colors.primary100,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
