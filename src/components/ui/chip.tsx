import { useNativeTheme } from "@/utils/theme";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  active: boolean;
  icon?: React.ReactNode;
  label: string;
  onPress: () => void;
};
export default function Chip({ active, icon, label, onPress }: Props) {
  const { colors } = useNativeTheme();

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: active ? colors.primary : "transparent",
        },
      ]}
      onPress={onPress}
    >
      {icon && icon}
      <Text
        style={[
          styles.label,
          { color: active ? colors.text : colors.placeholder },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    height: 48,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
  },
});
