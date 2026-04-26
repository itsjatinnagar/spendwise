import { Text as NativeText, StyleSheet, TextProps } from "react-native";

function Root({ style, ...props }: TextProps) {
  return <NativeText style={[styles.body, style]} {...props} />;
}

function Caption({ style, ...props }: TextProps) {
  return <NativeText style={[styles.caption, style]} {...props} />;
}

function Label({ style, ...props }: TextProps) {
  return <NativeText style={[styles.label, style]} {...props} />;
}

function Title({ style, ...props }: TextProps) {
  return <NativeText style={[styles.title, style]} {...props} />;
}

const styles = StyleSheet.create({
  body: {
    color: "#000000",
    fontSize: 16,
    fontWeight: 400,
  },
  label: {
    color: "#000000",
    fontSize: 14,
    fontWeight: 600,
  },
  title: {
    color: "#000000",
    fontSize: 32,
    fontWeight: 800,
  },
  caption: {
    color: "#000000",
    fontSize: 14,
    fontWeight: 400,
  },
});

const Text = Object.assign(Root, { Caption, Label, Title });
export default Text;
