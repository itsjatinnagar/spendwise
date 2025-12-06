import { useNativeTheme } from "@/utils/theme";
import { StyleSheet, Text, TextProps } from "react-native";

export default function Label({ children, style, ...props }: TextProps) {
  const { colors } = useNativeTheme();

  style = [styles.text, { color: colors.text }, style];

  return (
    <Text style={style} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});
