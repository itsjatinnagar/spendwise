import { Theme } from "@react-navigation/native";
import { ColorValue, TextStyle } from "react-native";

declare module "@react-navigation/native" {
  export type NativeTheme = Theme & {
    colors: {
      foreground: ColorValue;
      surface: ColorValue;
      placeholder: ColorValue;
      danger: ColorValue;
      dangerForeground: ColorValue;
      success: ColorValue;
      successForeground: ColorValue;
      transfer: ColorValue;
      transferForeground: ColorValue;
    };
    fonts: {
      headline: TextStyle;
      title: TextStyle;
    };
  };
}
