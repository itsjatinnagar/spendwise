import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type PickerItem<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  items: PickerItem<T>[];
  value?: T;
  onChange: (value: T) => void;
};
export default function Picker<T>({ items, onChange, value }: Props<T>) {
  const { colors } = useTheme();
  const ref = useRef<View | null>(null);
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<LayoutChangeEvent | null>(null);
  const [panel, setPanel] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const screen = Dimensions.get("window");

  const selectedItem = items.find((item) => item.value === value);

  useEffect(() => {
    if (!open) return;

    if (ref.current) {
      ref.current.measureInWindow((_, absY, width, h) => {
        const topUnder = absY + h;
        const fitsBelow = topUnder <= screen.height;
        const top = fitsBelow ? topUnder : 8;
        const left = 20;

        setPanel({ top, left, width });
      });
    } else if (layout) {
      const { height, width, y } = layout.nativeEvent.layout;
      const left = 8;
      const top = y + height;
      setPanel({ top, left, width });
    }
  }, [open, screen]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderItem = ({ item }: { item: PickerItem<T>; index: number }) => {
    const isSelected = value === item.value;
    const handlePress = () => {
      onChange(item.value);
      handleClose();
    };

    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.pickerItem,
          (isSelected || pressed) && { backgroundColor: "#0000001F" },
        ]}
        accessibilityRole="button"
        accessibilityLabel={item.label}
      >
        <Text style={{ fontSize: 16 }}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <View>
      <Pressable
        ref={ref}
        onPress={handleOpen}
        onLayout={setLayout}
        style={[styles.trigger, { backgroundColor: colors.background }]}
      >
        <Text
          style={[
            { fontSize: 16 },
            selectedItem
              ? { color: colors.text }
              : { color: colors.notification },
          ]}
        >
          {selectedItem ? selectedItem.label : "Select an option"}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={16}
          color={colors.text}
        />
      </Pressable>

      <Modal
        visible={open}
        animationType="fade"
        onRequestClose={handleClose}
        transparent
      >
        <Pressable
          style={styles.backdrop}
          onPress={handleClose}
          accessible={false}
        />
        {panel && (
          <View style={styles.overlay} pointerEvents="box-none">
            <View
              style={[
                styles.panel,
                { backgroundColor: colors.background },
                {
                  width: panel.width,
                  top: panel.top,
                  left: panel.left,
                },
              ]}
              accessibilityLabel="dropdown"
            >
              <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.value)}
                ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
              />
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: 48,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  backdrop: {
    position: "absolute",
    inset: 0,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    top: 8,
  },
  panel: {
    padding: 10,
    maxHeight: 320,
    borderRadius: 20,
    position: "absolute",
  },
  pickerItem: {
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 10,
    justifyContent: "center",
  },
});
